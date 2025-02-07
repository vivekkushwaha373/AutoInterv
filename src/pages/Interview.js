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
import {Volume2} from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Interview = () => {
    const location = useLocation();
    const { Question, setQuestion} = useContext(AppContext);
    let [webCamEnabled, setwebCamEnabled] = useState(false);
    let [start, setStart] = useState(false);
    const [inputvalue, setInputValue] = useState('');
    // let Question = Questions();
    const Answer = useRef(new Array(Question?.length).fill({ answer: '' }));
    const [currentSlide, setCurrentSlide] = useState(0);
    let preventFirst = useRef(true);
    let divRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [disabled, isSetDisabled] = useState(false);
    // let isRecording = useRef(false);

    const { formData, InterviewSubmission } = useContext(AppContext);
    const { transcript, browserSupportsSpeechRecognition, resetTranscript, listening } = useSpeechRecognition();
   
    useEffect(() => {
        if (location.pathname == '/interviewpage' && Question.length==0)
        {
            navigate('/interformpage');
        }
    },[])

    useEffect(() => {
        if (preventFirst.current) {
            preventFirst.current = false;
        }
        else {
            divRef.current.textContent = Answer?.current[currentSlide]?.answer || '';
            if(!disabled)
            textToSpeech(Question[currentSlide].question);
        }

    }, [currentSlide])

    
    
    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

  
  
    function startSpeechToText(){
        // isRecording.current = true;
        SpeechRecognition.startListening({ continuous: true, language:'en-IN'});
    }
    
    function stopSpeechToText() {
        // isRecording.current = false;
        SpeechRecognition.stopListening();
    }
    
    
    


    // useEffect(() => {
       
       
    //     results.map((result) => {
    //         Answer.current[currentSlide] = {answer: result.transcript};
            
    //         // setUserAnswer(result.transcript);
    //    })
    // }, [results])

    // useEffect(() => 
    //     if (userAnswer) {
    //         Answer.current[currentSlide] = { answer: userAnswer };
    //     }
    // }, [userAnswer]);
   
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
        Answer.current[currentSlide] = {answer: divRef?.current?.textContent};
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        stopSpeechToText();
        // divRef.current.textContent = '';
        setCurrentSlide((prev) => (prev + 1) % Question.length);
        
        resetTranscript();
    };

    const prevSlide = async () => {
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        stopSpeechToText();
        setCurrentSlide((prev) => (prev - 1 + Question.length) % Question.length);
       
    };

    async function submitInterview() {
        Answer.current[currentSlide] = { answer: divRef?.current?.textContent };
        stopSpeechToText();
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
        if(start!=true)
        textToSpeech(Question[currentSlide].question);
    }
    const prompt = "Ask me 5 interview questions related to job role:" + formData.role + " job description:" + formData.description + " years of experience: " + formData.years + "and sure to ask the next after the replying the previous question you have to give answer in json format {job description: string format , myquestion: string format , userAnswer: string format , isCorrect: in bool format }"
    return (

        <div className='w-full sm:flex sm:flex-row flex-col p-4 gap-x-8 mx-auto'>
            {start == false ? <div className='sm:w-3/5 w-full'>
                <p className='font-bold text-2xl  font-serif'>Let's get Started</p>
                <div className='flex flex-col gap-3 mt-7 '>
                    <p className='font-semibold'>Job Role/Job Position:{formData.role}</p>
                    <p className='font-semibold'>Job Description/Teck Stack:{formData.description}</p>
                    <p className='font-semibold'>Years of Experience:{formData.years}</p>
                </div>

                <div className='bg-yellow-200 border-4 border-yellow-600 rounded-lg my-4 p-3'>
                    <IoBulbOutline />
                    <p className='mt-2'>Introduction</p>
                    <p className='mt-2 outline-4 outline-yellow-900 text-wrap'>
                        Enable Video Web Cam Microphone to Start the your AI Generated Mock interview. It has
                        it has 5 questions which you can answer and at the last you will get the report on the basis
                        of your answer. Note: We never record your video, Web cam assess you can disable at any time
                        if you want.
                    </p>
                   
                </div>
            </div> :
                <div className='sm:w-3/5 w-full p-4 outline-dotted rounded-lg relative'>
                    
                    <p className='text-center font-bold text-lg'>Question :{currentSlide+1}</p>
                    <p className='font-bold text-left mt-4 text-2xl'> {Question[currentSlide]?.question}</p>
                    {
                        disabled ?
                            <IoVolumeMuteOutline className='cursor-pointer text-[30px] ' onClick={() => {
                                isSetDisabled(!disabled)
                                textToSpeech(Question[currentSlide].question)
                            }} /> : <IoVolumeHighOutline className='cursor-pointer text-[30px]' onClick={() => {
                                cancleTextToSpeech();
                                isSetDisabled(!disabled)
                            }} />
                    }
                   
                    <button onClick={nextSlide} >
                        <FcNext className='absolute right-0 top-[48%] w-10 h-10' />
                    </button>

                    <div ref={divRef} contentEditable suppressContentEditableWarning={true} onInput={(e) => setInputValue(e.currentTarget.textContent)} className='w-full h-[230px] overflow-scroll font-medium font-serif border-slate-400 border-2 rounded-md p-3 '>
                        
                        {transcript}
                    </div>
                   
                    <button onClick={prevSlide} >
                        <FcPrevious className='absolute left-0 top-[48%] w-10 h-10' />
                    </button>
                    <div className=' border-blue-400 border-2 rounded-lg p-2 bg-blue-200 space-y-5 sm:absolute bottom-9 left-1 right-1 '>
                        <IoBulbOutline />
                        <p>Note:</p>
                        <p className='text-xs md:text-sm lg:text-lg'>Click on "Start Recording" when you want to answer the question. At the end of the interview we will
                            give you the feedback along with correct answer for each of question and your answer to compare it. Swipe left or right to move on
                            desired questions.
                        </p>
                    </div>

                </div>
            }

            <div className='sm:w-2/5 w-full text-center outline rounded-3xl p-5'>
                {webCamEnabled ? <Webcam
                    className=' w-72 h-72 mx-auto border rounded-sm'
                    mirrored={true}
                ></Webcam> :
                    <GrWebcam className=' w-72 h-72 mx-auto border rounded-sm'></GrWebcam>
                }
                {!webCamEnabled ? <button className='p-2 text-white  bg-black rounded-lg px-4 ' onClick={handler}>Open Camera</button> : <button className='p-2 text-white  bg-black rounded-lg px-4 ' onClick={handler}>Close Camera</button>}
                <br />
                <button className='p-2 text-white mt-2  bg-black rounded-lg px-4' disabled={!start}  onClick={listening ? stopSpeechToText : startSpeechToText}>
                    {listening ? <h2><IoMicOutline className='mx-auto' /> <span>Recording...</span> </h2> : <h2> Start Recording</h2>}
                </button>
                <br />
                
                <div className='mt-40 flex flex-wrap justify-center items-center gap-3'>
                    <button className='p-2 text-white bg-blue-500 rounded-lg px-4  mr-2' onClick={startInterview}>{start == false ? <h1>Start your Interview</h1> : <h1>Close Interview</h1>}</button>

                    <button disabled={loading} className='p-2 text-white bg-blue-500 rounded-lg px-4 ' onClick={submitInterview}>
                        {
                            loading ? (<p className='flex'><span className='text-white'>Submitting  </span><Loader2 className='text-white animate-spin'></Loader2></p>) : ("Submit Interview")

                        }
                    </button>
                </div>
              
                {/* <button className='p-2 text-white bg-blue-500 rounded-lg px-4 mt-40' onClick={()=>console.log("hii",Answer.current)} >Showanswer</button> */}
            </div>




        </div>
    )
}

export default Interview


