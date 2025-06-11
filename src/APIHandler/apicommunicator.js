import axios from 'axios';
import toast from 'react-hot-toast';


export const changeprofile = async(firstname,lastname,email)=>{
    try {
        const res = await axios.post('/changeprofile', { firstname, lastname, email });
        if (res.status == 200)
        {
            toast.success(res.data?.message);
            return res.data;
        }
        // throw new Error(res.data.message||'An error occured');
    }
    catch (error) {
        toast.error(error.response?.data.message || 'An unexpected error Occured');
        throw new Error(error.response?.data.message || 'An unexpected error Occured');
    }
}

export const setMychat = async () => {
    try {
        const res = await axios.post('/setchat');
        if (res.status == 200) {
            // toast.success(res.data?.message);
            return res.data;
        }
        // throw new Error(res.data.message);
    }
    catch (error) {
        toast.error(error.response?.data.message || 'An unexpected error Occured');
        throw new Error(error.response?.data.message || 'An unexpected error Occured');   
    }
}



export const APIlogin = async (email, password) => {
    try
    {
        const res = await axios.post('/login', { email, password }, { withCredentials: true });
        if (res.status == 200) {
            toast.success(res.data?.message);
            return res.data;
        }
        
        // throw new Error(res.data.message);

    }
    catch (error) {
        toast.error(error.response?.data.message || 'An unexpected error Occured');
        throw new Error(error.response?.data.message || 'An unexpected error Occured');
    }
};

export const forget = async (email) => {
    try {
        const res = await axios.post('/forgetpassword', { email }, { withCredentials: true });
        if (res.status == 200) {
            toast.success(res.data?.message);
            return res;
        }

        // throw new Error(res.data.message||'An error occured');

    }
    catch (error) {
        toast.error(error.response?.data.message || 'An unexpected error Occured');
        throw new Error(error.response?.data.message || 'An unexpected error Occured');
    }
}


export const checkAuthStatus = async () => {
    try {
        const res = await axios.get('/auth', { withCredentials: true });

        if (res.status == 200) {
            // toast.success(res.data?.message);
            return res;    
        }
        // throw new Error(res.data.message || 'An error occured');
    }
    catch (error) {
        toast.error(error.response?.data.message || 'An unexpected error Occured');
        throw new Error(error.response?.data.message || 'An unexpected error Occured');
    }
    
}

export const verifyOTP = async (signUpform) => {
    try {
        const res = await axios.post('/signup', 
            signUpform, { withCredentials: true }
        );
        if (res.status == 200) {
            toast.success(res.data?.message);
            return res.data;
        }
        // throw new Error(res.data.message);
    }
    catch (error) {
        toast.error(error.response?.data.message || 'An unexpected error Occured');
        throw new Error(error.response?.data.message || 'An unexpected error Occured');
    }
}

export const sentOTP = async (email) => {
    try {
        const res = await axios.post('/sendotp', {
            email
        }, { withCredentials: true });
        console.error(res);
        if (res.status == 200) {
            toast.success(res.data?.message);
            return res.data;
        }
        // throw new Error(res.data.message);
    }
    catch (error) {
        toast.error(error.response?.data.message || 'An unexpected error Occured');
        throw new Error(error.response?.data.message || 'An unexpected error Occured');
    }
}

//pending
export const userLogout = async () => {
    try {
        const res = await axios.post('/logout', {}, { withCredentials: true });
        if (res.status == 200) {
            toast.success(res.data?.message);
            return res;
        }
        // throw new Error(res.data.message||'An error Occured');
    }
    catch (error) {
        toast.error(error.response?.data.message || 'An unexpected error Occured');
        throw new Error(error.response?.data.message ||'An unexpected error Occured');
    }
} 

export const reset = async (token, password, confirmpassword) => {
    try {
        const res = await axios.post('/resetpassword', {
            token,
            password,
            confirmpassword
        }, { withCredentials: true })
        if (res.status == 200) {
            toast.success(res.data?.message);
            return res;
        }
        // throw new Error(res.data.message || 'An error Occured');
    }
    catch (error) {
        toast.error(error.response?.data.message || 'An unexpected error Occured');
        throw new Error(error.response?.data.message ||'An unexpceted error occured')
    }
}

export const changemypass = async (oldpass,newpass,confirmpass) => {
    try {
        const res = await axios.post('/changepassword', {
            oldpass,
            newpass,
            confirmpass
        }, { withCredentials: true })
        if (res.status == 200) {
            toast.success(res.data?.message);
            return res;
        }
        // throw new Error(res.data.message || 'An error Occured');
    }  
    catch (error) {
        toast.error(error.response?.data.message || 'An unexpected error Occured');
        throw new Error(error.response?.data.message || 'An unexpected error Occured');
    }
}

export const clearchat = async () => {
    try {
        const res = await axios.delete('/deletechat', { withCredentials: true });
        if (res.status == 200) {
            toast.success(res.data?.message);
            return res.data
        }
        // throw new Error(res.data.message || 'An error Occured');
    }
    catch (error) {
        toast.error(error.response?.data.message || 'An unexpected error Occured');
        throw new Error(error.response?.data.message || 'An unexpected error Occured');
    }
}

export const sendRequest = async (message) => {
    try {
        const res = await axios.post('/new', { message }, { withCredentials: true });
        if (res.status == 200) {
            toast.success(res.data?.message);
            return res.data;
        }
        // throw new Error(res.data.message || 'An error Occured');
    }
    catch (error) {
        toast.error(error.response?.data.message || 'An unexpected error Occured');
        throw new Error(error.response?.data.message || 'An unexpected error Occured');
    }
}

export const getQuestion = async (role,description,years) => {
    
    try {
        const res = await axios.post('/getquestion', {
            role,
            description,
            years
        }, { withCredentials: true })
        if (res.status == 200) {
            toast.success(res.data?.message);
            return res.data;
        }
        // throw new Error(res.data.message || 'An error Occured');
        
    }
    catch (error) {
        toast.error('This model is overloaded. Please try again later' || error.response?.data.message);
        throw new Error(error.response?.data.message || 'An unexpected error Occured');
    }
}

export const finalInterviewSubmission = async (role, description, years, Question, Answer) => {
    try {
        const res = await axios.post('/interviewSubmission', {
            role, description, years, Question, Answer
        }, { withCredentials: true })
        if (res.status == 200)
        {
            toast.success(res.data?.message);
            return res.data;
        }
        // throw new Error(res.data.message || 'An error Occured');
    }
    catch (error) {
        toast.error(error.response?.data.message || 'An unexpected error Occured');
        throw new Error(error.response?.data.message || 'An unexpected error Occured'); 
    }
}

export const fetchMyInterview = async () => {
    try {
        const res = await axios.get('/getinterview', { withCredentials: true })
        if (res.status == 200) {
            toast.success(res.data?.message);
            return res.data;
        }
        // throw new Error(res.data.message || 'An error Occured');
    }
    catch (error) {
        toast.error(error.response?.data.message || 'An unexpected error Occured');
        throw new Error(error.response?.data.message || 'An unexpected error Occured');
    }
}

export const deletemyfeedback = async (id) => {
    try {
        const res = await axios.delete('/deletefeedback', {
            data: { id },
        }, { withCredentials: true });
        if (res.status == 200) {
            
            return res.data;
        }
        // throw new Error(res.data.message || 'An error Occured');
    }
    catch (error) {
        toast.error(error.response?.data.message || 'An unexpected error Occured');
        throw new Error(error.response?.data.message || 'An unexpected error Occured');
    }
}