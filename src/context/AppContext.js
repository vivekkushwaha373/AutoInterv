import React, { createContext, useEffect, useState } from 'react'
import { APIlogin, verifyOTP, sentOTP, forget, reset, changemypass, sendRequest, deletemyfeedback, clearchat, setMychat, changeprofile, getQuestion, finalInterviewSubmission, fetchMyInterview } from '../APIHandler/apicommunicator'
import { checkAuthStatus,userLogout } from '../APIHandler/apicommunicator'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


// import {products} from '../data'


export const AppContext = createContext();




export default function AppContextProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState({firstname:"vivek",lastname:"kushwaha"});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [Entiremessage, setEntireMessage] = useState([]);
    const [interviewgiven, setinterviewgiven] = useState([]);
    const [Question, setQuestion] = useState([]);
    const [formData, setFormData] = useState({ role: "Full Stack Web Development", description: "React,Node.js", years: "4" });
    const [currfeedback, setcurrFeedback] = useState([]);
    

    async function deletefeedback(id) {
        try {
            const res = await deletemyfeedback(id);
            setinterviewgiven(res.data);
            navigate('/interviewdashboard');
        }
        catch (error) {
            const errormessage = error.response?.data?.message || error.message || 'Network error Occured';
            // toast.error(errormessage);
            throw new Error(errormessage);
        }
    }

    async function getMyInterview(){
        try {
            const res = await fetchMyInterview();
            setinterviewgiven(res.data);
            navigate('/interviewdashboard');
        }
        catch (error) {
            const errormessage = error.response?.data?.message || error.message || 'Network error Occured';
            // toast.error(errormessage);
            throw new Error(errormessage);
        }
    }


    async function InterviewSubmission(role,description,years,Question,Answer) {
        try {
            const res = await finalInterviewSubmission(role, description, years, Question, Answer);
            setcurrFeedback(res.question.feedback);
            return res;
        }
        catch (error) {
            const errormessage = error.response?.data?.message || error.message || 'Network error Occured';
            // toast.error(errormessage);
            throw new Error(errormessage);
        }
    }
    

    async function fetchquestion(role,description,years){
        try {
            const res = await getQuestion(role, description, years);
            return res.question;
        }
        catch (error) {
            const errormessage = error.response?.data?.message || error.message || 'Network error Occured';
            // toast.error(errormessage);
            throw new Error(errormessage);
        }
    }


    async function userprofile(firstname,lastname,email) {
        try {
            const res = await changeprofile(firstname, lastname, email);
            setUser(() => {
                return { firstname: res.user.firstname, lastname: res.user.lastname }
                
            })
            toast.success('User profile updated');
            return res;
        }
        catch (error) {
            const errormessage = error.response?.data?.message || error.message || 'Network error Occured';
            // toast.error(errormessage);
            throw new Error(errormessage);
        }
    }   

   


    async function deletemessage() {
        try {
            const res = await clearchat();
            setEntireMessage([]);
            return res;
        }
        catch (error) {
            const errormessage = error.response?.data?.message || error.message || 'Network error Occured';
            // toast.error(errormessage);
            throw new Error(errormessage);
        }
    }

    async function requestMessage(message) {
        try {
            const res = await sendRequest(message);
            return res;
            
        }
        catch (error) {
            const errormessage = error.response?.data?.message || error.message || 'Network error Occured';
            // toast.error(errormessage);
            throw new Error(errormessage);
        }
    }

    async function changepassword(oldpass,newpass,confirmpass) {
        try {
            const res = await changemypass(oldpass, newpass, confirmpass);
            toast.success('password changed successfully');
            // setIsLoggedIn(false);
            navigate('/dashboard');
            return res;
        }
        catch(error){
            const errormessage = error.response?.data?.message || error.message || 'Network error Occured';
            // toast.error(errormessage);
            throw new Error(errormessage);
        }
    }


    async function forgetpassword(email) {
        try {
            const res = await forget(email);
            toast.success('Email sent to reset password');
            return res;
        }
        catch (error) {
            const errormessage = error.response?.data?.message || error.message || 'Network error Occured';
            // toast.error(errormessage);
            throw new Error(errormessage);
        }
    }
    
    async function resetPassword(token,password,confirmpassword) {
        try {
            const res = await reset(token,password,confirmpassword);
            // toast.success('password is successfully reset');
            setIsLoggedIn(false);
            navigate('/login');
            return res;
        }
        catch (error) {
            const errormessage = error.response?.data?.message || error.message || 'Network error Occured';
            // toast.error(errormessage);
            setIsLoggedIn(false);
            throw new Error(errormessage);
           
        }
    }

    async function LogOut() {
        try {
            const res=await userLogout();
            // toast.success('User Logged out');
            setIsLoggedIn(false);
            navigate('/');
            return res;
        }
        catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Network error occurred';
            setError(errorMessage);
            // toast.error(errorMessage);
            setIsLoggedIn(false);
            throw new Error(errorMessage);
        }
    }
    

    async function AuthStatus() {
        try {
            const res = await checkAuthStatus();
            setUser(res.data.user);
            setIsLoggedIn(true);
            
            // navigate('/chatroom');
        }
        catch (error) {
            //leave this empty 
            console.error('Authentication failed:', error.message);
            const errorMessage = error.response?.data?.message || error.message || 'Network error occurred';
            setError(errorMessage);
            // toast.error(errorMessage);
            setIsLoggedIn(false);
            navigate('/');
            throw new Error(errorMessage);
        }
    }

    async function setChat() {
        try {
            const res = await setMychat();
            const payload = res.chat.map(({ role, content }) => {
                return {
                    role,
                    content
                }
            })
            setEntireMessage(payload);
        }
        catch (error) {
            const errormessage = error.response?.data?.message || error.message || 'Network error Occured';
            // toast.error(errormessage);
            throw new Error(errormessage);
        }
    }

    async function login(email,password) {
        setLoading(true);
        setError(null);
        try {

            const data = await APIlogin(email, password);
            // toast.success("User Logged In");
            // Assuming the API returns a token and user data
            const { user } = data;

            // Set user and authentication state
            setUser(user);
            setEntireMessage(user?.chats);
            setIsLoggedIn(true);
            navigate('/chatroom');
            // Store token in local storage
            // localStorage.setItem('authToken', token);
            return data;
        }
        catch (error) {
            console.error('Login failed:', error.message);
            const errorMessage = error.response?.data?.message || error.message || 'Network error occurred';
            setError(errorMessage);
            // toast.error(errorMessage);
            setIsLoggedIn(false);
            throw new Error(errorMessage);
        }
        finally {
            setLoading(false);
        }

    }
    async function signup(name,email,password) {
        try {
            
        }
        catch (err) {
        
        }

    }
    
    async function otpstatus(signUpform) {
        //otp verify wale api ko call karega
        setLoading(true);
        setError(null);
            
        // signUpform = [...signUpform, otp];
        
        try {
            const res = await verifyOTP(signUpform);
            // toast.success("OTP verified");
            navigate('/login');
        }
        catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Network error occurred';
            setError(errorMessage);
            // toast.error(errorMessage);
            navigate('/signup');
            throw new Error(errorMessage); 
            
        }
        finally {
            setLoading(false);
           
        }

    }
    
    async function otpsender(email) {
        //otp sent  wale api ko call krega
        setLoading(true);
        setError(null);
        try {
            const res = await sentOTP(email);
            // toast.success('OTP sent to your email'); 
            navigate('/otp');
            return res;
        }
        catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Network error occurred';
            setError(errorMessage);  
            // toast.error(errorMessage);  
            throw new Error(errorMessage);   
        }
        finally {
            setLoading(false);
        }
    }

    const logout= () => {
        setUser(null);
        isLoggedIn(false);
        localStorage.removeItem('authToken');
    };

    useEffect(async () => {
        try {
            await AuthStatus();
            await setChat();
            
        }
        catch (error) {
            
        }

    }, [])

    // useEffect(async () => {
    //     if (isLoggedIn == true) {
    //         try {
    //             await setChat();
                
    //         }
    //         catch (error) {
                
    //         }
    //     }
    //     else if (isLoggedIn == false) {
    //         setEntireMessage([]);
    //     }
    // },[isLoggedIn])


    const value = {
        user,
        isLoggedIn,
        signup,
        login,
        logout,
        otpstatus,
        otpsender,
        setEntireMessage,
        Entiremessage,
        loading,
        error,
        formData,
        setFormData,
        interviewgiven,
        AuthStatus,
        LogOut,
        forgetpassword,
        resetPassword,
        changepassword,
        requestMessage,
        deletemessage,
        userprofile,
        fetchquestion,
        setQuestion,
        setinterviewgiven,
        Question,
        InterviewSubmission,
        currfeedback,
        setcurrFeedback,
        getMyInterview,
        deletefeedback

    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

