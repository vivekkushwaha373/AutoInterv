import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useLocation } from "react-router-dom";
import OtpPage from "./pages/OtpPage";
import ChatRoom from "./pages/ChatRoom";
import InterviewFormPage from './pages/InterviewFormpage';
import Interview from "./pages/Interview";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Feedbackpage from "./pages/Feedbackpage";
import ChangePassword from "./pages/ChangePassword";
import Dashboard from "./pages/Dashboard";
import InterviewPage from "./pages/InterviewPage";


function App() {
  const location = useLocation();
  
  return (
    <div className="w-full h-screen bg-slate-900 ">
      <div>
        {!(location.pathname=='/otp')&&<Navbar></Navbar>}
        
      </div>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        <Route path='/signup' element={<SignupPage></SignupPage>}></Route>
        <Route path='/otp' element={<OtpPage></OtpPage>}></Route>
        <Route path='/chatroom' element={<ChatRoom></ChatRoom>}></Route>
        <Route path='/interformpage' element={<InterviewFormPage></InterviewFormPage>}></Route>
        <Route path='/interviewpage' element={<Interview></Interview>}></Route>
        <Route path='/forgotpassword' element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path='/resetpassword/:token' element={<ResetPassword></ResetPassword>}></Route>
        <Route path='/feedbackpage' element={<Feedbackpage></Feedbackpage>}></Route>
        <Route path='/changepassword' element={<ChangePassword></ChangePassword>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/interviewdashboard' element={<InterviewPage></InterviewPage>}></Route>
      </Routes>
        
        
    </div>
  );
}

export default App;
