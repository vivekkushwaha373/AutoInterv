import React, { useContext, useEffect, useRef, useState } from 'react'

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// import from react-webcam
import { GrWebcam } from "react-icons/gr";
import { IoVolumeMuteOutline } from "react-icons/io5"
import { IoVolumeHighOutline } from "react-icons/io5";
import { FcNext } from "react-icons/fc";
import Webcam from 'react-webcam';
import { AppContext } from '../context/AppContext';
import { IoBulbOutline } from "react-icons/io5";
import { FcPrevious } from "react-icons/fc";
// import Questions from '../Questions';
import { IoMicOutline } from "react-icons/io5";
import { Volume2 } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Interview = () => {
    const location = useLocation();
    const { Question, setQuestion } = useContext(AppContext);
    let [webCamEnabled, setwebCamEnabled] = useState(false);
    let [start, setStart] = useState(false);
    const [inputvalue, setInputValue] = useState('');
    const Answer = useRef(new Array(Question?.length).fill({ answer: '' }));
    const [currentSlide, setCurrentSlide] = useState(0);
    let preventFirst = useRef(true);
    let divRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [disabled, isSetDisabled] = useState(false);

    const { formData, InterviewSubmission } = useContext(AppContext);
    const { transcript, browserSupportsSpeechRecognition, resetTranscript, listening } = useSpeechRecognition();

    useEffect(() => {
        if (location.pathname == '/interviewpage' && Question.length == 0) {
            navigate('/interformpage');
        }
    }, [])

    useEffect(() => {
        if (preventFirst.current) {
            preventFirst.current = false;
        }
        else {
            divRef.current.textContent = Answer?.current[currentSlide]?.answer || '';
            if (!disabled)
                textToSpeech(Question[currentSlide].question);
        }

    }, [currentSlide])



    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }



    function startSpeechToText() {
        // isRecording.current = true;
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    }

    function stopSpeechToText() {
        // isRecording.current = false;
        SpeechRecognition.stopListening();
    }

    const cancleTextToSpeech = () => {
        window.speechSynthesis.cancel();
    }

    const textToSpeech = (text) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech)
        }
        else {
            alert('Sorry Browser does not support speech');
        }
    }



    const nextSlide = async () => {
        Answer.current[currentSlide] = { answer: divRef?.current?.textContent };

        stopSpeechToText();
        cancleTextToSpeech();
        setCurrentSlide((prev) => (prev + 1) % Question.length);

        resetTranscript();
    };

    const prevSlide = async () => {
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        stopSpeechToText();
        cancleTextToSpeech();
        setCurrentSlide((prev) => (prev - 1 + Question.length) % Question.length);

    };
    function stopCameraAndMic() {
        const videoEl = document.querySelector('video');
        if (videoEl && videoEl.srcObject) {
            videoEl.srcObject.getTracks().forEach(track => track.stop()); // 👈 stop camera/mic
            videoEl.srcObject = null; // 🧹 clear the stream
        }
      }
    async function submitInterview() {
       stopCameraAndMic();


        Answer.current[currentSlide] = { answer: divRef?.current?.textContent };
        // stopSpeechToText();
        cancleTextToSpeech();
        let role = formData.role;
        let description = formData.description;
        let years = formData.years;

        try {
            setLoading(true);
            await InterviewSubmission(role, description, years, Question, Answer.current);
            navigate('/feedbackpage');
            setQuestion([]);
        }
        catch (error) {
            //
        } finally {
            setLoading(false);
        }
    }


    function handler() {
        setwebCamEnabled((val) => !val);
    }
    function startInterview() {
        setStart((val) => !val);
        if (start != true)
            textToSpeech(Question[currentSlide].question);
    }
    const prompt = "Ask me 5 interview questions related to job role:" + formData.role + " job description:" + formData.description + " years of experience: " + formData.years + "and sure to ask the next after the replying the previous question you have to give answer in json format {job description: string format , myquestion: string format , userAnswer: string format , isCorrect: in bool format }"
    return (

        <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white'>
            <div className='container mx-auto px-6 py-8'>
                {start == false ?
                    <div className='grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto'>
                        {/* Left Side - Job Details & Instructions */}
                        <div>
                            {/* Header Section */}
                            <div className='text-center lg:text-left mb-12'>
                                <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4'>
                                    Let's Get Started
                                </h1>
                                <p className='text-slate-300 text-lg'>Prepare for success with our AI-powered interview platform</p>
                            </div>

                            {/* Job Details Card */}
                            <div className='bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-8 shadow-2xl'>
                                <h2 className='text-2xl font-semibold text-white mb-6 flex items-center'>
                                    <div className='w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-4'></div>
                                    Interview Details
                                </h2>
                                <div className='space-y-4'>
                                    <div className='bg-slate-700/30 rounded-xl p-4 border border-slate-600'>
                                        <h3 className='text-blue-400 font-medium text-sm uppercase tracking-wide mb-2'>Job Role</h3>
                                        <p className='text-white font-semibold text-lg'>{formData.role}</p>
                                    </div>
                                    <div className='bg-slate-700/30 rounded-xl p-4 border border-slate-600'>
                                        <h3 className='text-purple-400 font-medium text-sm uppercase tracking-wide mb-2'>Tech Stack</h3>
                                        <p className='text-white font-semibold text-lg'>{formData.description}</p>
                                    </div>
                                    <div className='bg-slate-700/30 rounded-xl p-4 border border-slate-600'>
                                        <h3 className='text-pink-400 font-medium text-sm uppercase tracking-wide mb-2'>Experience</h3>
                                        <p className='text-white font-semibold text-lg'>{formData.years} Years</p>
                                    </div>
                                </div>
                            </div>

                            {/* Instructions Card */}
                            <div className='bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-8 shadow-xl'>
                                <div className='flex items-start space-x-4'>
                                    <div className='bg-amber-500/20 rounded-full p-3 flex-shrink-0'>
                                        <IoBulbOutline className='text-amber-400 text-2xl' />
                                    </div>
                                    <div>
                                        <h3 className='text-xl font-semibold text-amber-300 mb-3'>How to Start</h3>
                                        <ol className='text-amber-100/90 leading-relaxed space-y-2 list-decimal list-inside'>
                                            <li>Enable your webcam using the button on the right</li>
                                            <li>Click "Start Your Interview" to begin</li>
                                            <li>Use "Start Recording" to capture your voice responses</li>
                                            <li>Navigate between 5 questions using arrow buttons</li>
                                            <li>Submit when complete for detailed feedback</li>
                                        </ol>
                                        <div className='mt-4 p-3 bg-amber-500/10 rounded-lg border-l-4 border-amber-500'>
                                            <p className='text-amber-200 text-sm'>
                                                <strong>Privacy:</strong> Your video is never recorded or stored.
                                                Camera can be disabled anytime.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Camera & Controls */}
                        <div className='flex flex-col'>
                            <div className='bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl h-full flex flex-col justify-center'>
                                <h2 className='text-2xl font-semibold text-white mb-6 text-center'>Setup Your Interview</h2>

                                {/* Camera Section */}
                                <div className='text-center mb-8'>
                                    <h3 className='text-lg font-medium text-slate-300 mb-4'>Webcam Preview</h3>
                                    <div className='relative mx-auto w-full max-w-md'>
                                        {webCamEnabled ?
                                            <Webcam
                                                className='w-full h-72 object-cover border-2 border-slate-600 rounded-xl shadow-lg'
                                                mirrored={true}
                                            /> :
                                            <div className='w-full h-72 bg-slate-700/50 border-2 border-slate-600 rounded-xl flex flex-col items-center justify-center'>
                                                <GrWebcam className='w-20 h-20 text-slate-400 mb-4' />
                                                <p className='text-slate-400 text-sm'>Camera Disabled</p>
                                            </div>
                                        }
                                    </div>
                                </div>

                                {/* Control Buttons */}
                                <div className='space-y-4'>
                                    <button
                                        className={`w-full px-6 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg ${webCamEnabled
                                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                                : 'bg-green-500 hover:bg-green-600 text-white'
                                            }`}
                                        onClick={handler}
                                    >
                                        {!webCamEnabled ? '📹 Enable Webcam' : '🚫 Disable Webcam'}
                                    </button>

                                    <button
                                        className='w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg'
                                        onClick={startInterview}
                                    >
                                        🚀 Start Your Interview
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    /* Interview Active View */
                    <div className='grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
                        {/* Question Panel */}
                        <div className='lg:col-span-2'>
                            <div className='bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl relative overflow-hidden'>
                                {/* Decorative Elements */}
                                <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full -translate-y-16 translate-x-16'></div>
                                <div className='absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500/10 to-purple-600/10 rounded-full translate-y-12 -translate-x-12'></div>

                                {/* Question Header */}
                                <div className='flex justify-between items-center mb-8 relative z-10'>
                                    <div className='flex items-center space-x-4'>
                                        <div className='bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg px-4 py-2'>
                                            <span className='text-white font-bold'>Question {currentSlide + 1} / {Question.length}</span>
                                        </div>
                                        <button
                                            onClick={() => {
                                                if (disabled) {
                                                    isSetDisabled(!disabled);
                                                    textToSpeech(Question[currentSlide].question);
                                                } else {
                                                    cancleTextToSpeech();
                                                    isSetDisabled(!disabled);
                                                }
                                            }}
                                            className='bg-slate-700 hover:bg-slate-600 p-3 rounded-full transition-all duration-200'
                                        >
                                            {disabled ?
                                                <IoVolumeMuteOutline className='text-red-400 text-xl' /> :
                                                <IoVolumeHighOutline className='text-green-400 text-xl' />
                                            }
                                        </button>
                                    </div>

                                    {/* Navigation Buttons */}
                                    <div className='flex space-x-2'>
                                        <button
                                            onClick={prevSlide}
                                            className='bg-slate-700 hover:bg-slate-600 p-2 rounded-full transition-all duration-200'
                                        >
                                            <FcPrevious className='w-6 h-6' />
                                        </button>
                                        <button
                                            onClick={nextSlide}
                                            className='bg-slate-700 hover:bg-slate-600 p-2 rounded-full transition-all duration-200'
                                        >
                                            <FcNext className='w-6 h-6' />
                                        </button>
                                    </div>
                                </div>

                                {/* Question Text */}
                                <div className='mb-8 relative z-10'>
                                    <h2 className='text-2xl md:text-3xl font-bold text-white leading-relaxed'>
                                        {Question[currentSlide]?.question}
                                    </h2>
                                </div>

                                {/* Answer Input */}
                                <div className='mb-8 relative z-10'>
                                    <label className='block text-slate-300 font-medium mb-3'>Your Answer:</label>
                                    <div
                                        ref={divRef}
                                        contentEditable
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => setInputValue(e.currentTarget.textContent)}
                                        className='w-full h-48 bg-slate-900/50 border border-slate-600 rounded-xl p-4 text-white font-medium resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent overflow-auto backdrop-blur-sm'
                                        placeholder='Start speaking or type your answer here...'
                                    >
                                        {transcript}
                                    </div>
                                </div>

                                {/* Instructions */}
                                <div className='bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 relative z-10'>
                                    <div className='flex items-start space-x-3'>
                                        <IoBulbOutline className='text-blue-400 text-xl flex-shrink-0 mt-1' />
                                        <div>
                                            <h4 className='text-blue-300 font-semibold mb-2'>Interview Tips</h4>
                                            <p className='text-blue-100/80 text-sm leading-relaxed'>
                                                Click "Start Recording" to begin voice input. Navigate between questions using the arrow buttons.
                                                You'll receive comprehensive feedback comparing your answers with ideal responses at the end.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Camera & Controls Panel */}
                        <div className='lg:col-span-1'>
                            <div className='bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 shadow-2xl'>
                                {/* Camera Section */}
                                <div className='text-center mb-8'>
                                    <h3 className='text-lg font-semibold text-white mb-4'>Video Feed</h3>
                                    <div className='relative mx-auto w-full max-w-sm'>
                                        {webCamEnabled ?
                                            <Webcam
                                                className='w-full h-64 object-cover border-2 border-slate-600 rounded-xl shadow-lg'
                                                mirrored={true}
                                            /> :
                                            <div className='w-full h-64 bg-slate-700/50 border-2 border-slate-600 rounded-xl flex items-center justify-center'>
                                                <GrWebcam className='w-16 h-16 text-slate-400' />
                                            </div>
                                        }
                                    </div>
                                    <button
                                        className={`mt-4 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${webCamEnabled
                                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                                : 'bg-green-500 hover:bg-green-600 text-white'
                                            }`}
                                        onClick={handler}
                                    >
                                        {!webCamEnabled ? 'Enable Camera' : 'Disable Camera'}
                                    </button>
                                </div>

                                {/* Recording Controls */}
                                <div className='text-center mb-8'>
                                    <h4 className='text-white font-medium mb-4'>🎤 Voice Recording</h4>
                                    <button
                                        className={`w-full px-6 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg ${listening
                                                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse border-2 border-red-300'
                                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                                            }`}
                                        disabled={!start}
                                        onClick={listening ? stopSpeechToText : startSpeechToText}
                                    >
                                        {listening ? (
                                            <div className='flex items-center justify-center space-x-2'>
                                                <IoMicOutline className='text-xl animate-pulse' />
                                                <span>🔴 Recording... (Click to Stop)</span>
                                            </div>
                                        ) : (
                                            <div className='flex items-center justify-center space-x-2'>
                                                <IoMicOutline className='text-xl' />
                                                <span>🎙️ Start Recording Voice</span>
                                            </div>
                                        )}
                                    </button>
                                    {!start && (
                                        <p className='text-slate-400 text-sm mt-2'>Start interview first to enable recording</p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className='space-y-4'>
                                    <button
                                        className='w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg'
                                        onClick={startInterview}
                                    >
                                        {start == false ? '▶️ Start Interview' : '⏹️ End Interview'}
                                    </button>

                                    <button
                                        disabled={loading}
                                        className='w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg disabled:cursor-not-allowed'
                                        onClick={submitInterview}
                                    >
                                        {loading ? (
                                            <div className='flex items-center justify-center space-x-2'>
                                                <Loader2 className='w-5 h-5 animate-spin' />
                                                <span>Submitting...</span>
                                            </div>
                                        ) : (
                                            '✅ Submit Interview'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Interview