import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Loader2, Briefcase, FileText, Calendar, Sparkles } from "lucide-react";

const InterviewformPage = () => {
    const navigate = useNavigate();
    const { fetchquestion, setQuestion, setFormData, formData } = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    function changeHandler(e) {
        setFormData((prevForm) => {
            return {
                ...prevForm,
                [e.target.name]: e.target.value
            }
        })
    }

    async function submitHandler(e) {
        e.preventDefault();
        //navigate to the interviewPage
        let role = formData.role;
        let description = formData.description;
        let years = formData.years;
        try {
            setLoading(true);
            const res = await fetchquestion(role, description, years);
            setQuestion(res.questions);
            navigate('/interviewpage');
        }
        catch (error) {
            //
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.05\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

            
            {/* Gradient Orb Effects */ }
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
                <div className="w-full max-w-2xl">
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                            Tell Us About Your Job Profile
                        </h1>
                        <p className="text-slate-400 text-lg">
                            Let's customize your AI interview experience
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                        <form onSubmit={submitHandler} className="space-y-6">
                            {/* Job Role Field */}
                            <div className="group">
                                <label htmlFor="role" className="flex items-center gap-2 text-slate-300 font-semibold mb-3">
                                    <Briefcase className="w-5 h-5 text-blue-400" />
                                    Job Role
                                </label>
                                <div className="relative">
                                    <input 
                                        onChange={changeHandler}
                                        type="text" 
                                        id="role"
                                        value={formData.role} 
                                        name="role" 
                                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 group-hover:border-slate-500"
                                        placeholder="e.g., Full Stack Developer, Data Scientist"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                </div>
                            </div>

                            {/* Job Description Field */}
                            <div className="group">
                                <label htmlFor="description" className="flex items-center gap-2 text-slate-300 font-semibold mb-3">
                                    <FileText className="w-5 h-5 text-purple-400" />
                                    Job Description
                                </label>
                                <div className="relative">
                                    <input 
                                        onChange={changeHandler}
                                        type="text"
                                        id="description"
                                        value={formData.description} 
                                        name="description" 
                                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-200 group-hover:border-slate-500"
                                        placeholder="e.g., React, Node.js, Python, AWS, MongoDB"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                </div>
                            </div>

                            {/* Years of Experience Field */}
                            <div className="group">
                                <label htmlFor="years" className="flex items-center gap-2 text-slate-300 font-semibold mb-3">
                                    <Calendar className="w-5 h-5 text-green-400" />
                                    Years of Experience/Type NA if not
                                </label>
                                <div className="relative">
                                    <input 
                                        onChange={changeHandler}
                                        type="text" 
                                        id="years"
                                        name="years" 
                                        value={formData.years} 
                                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all duration-200 group-hover:border-slate-500"
                                        placeholder="e.g., 3 years, Fresher, N/A"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button 
                                    disabled={loading}
                                    type="submit"
                                    className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/25 disabled:transform-none disabled:shadow-none"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative flex items-center justify-center gap-2">
                                        {loading ? (
                                            <div className="flex items-center gap-2">
                                                <span className="text-white">Preparing</span>
                                                <Loader2 className="text-white animate-spin w-5 h-5" />
                                            </div>
                                        ) : (
                                            "Submit"
                                        )}
                                    </div>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Footer Note */}
                    <div className="text-center mt-6">
                        <p className="text-slate-500 text-sm">
                            🤖 Our AI will generate personalized questions based on your profile
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default InterviewformPage;