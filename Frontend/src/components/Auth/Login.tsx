import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom'; 
import axios from 'axios';
import { login } from '../../features/userSlice/authSlice';
import toast, { Toaster } from 'react-hot-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
  
    if (trimmedEmail === '' || trimmedPassword === '') {
      return toast.error("Please fill in all required fields");
    }
  
    if (trimmedPassword.length < 8) {
      return toast.error("Password must be at least 8 characters long");
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email: trimmedEmail, password: trimmedPassword });
      dispatch(login(response.data));
      toast.success("Logged In Successfully!");
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Login failed:', error);
      toast.error("Login failed. Please try again."); 
    }
  };
  

  return (
    <div>
      <section className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-[#dfa674] rounded-2xl flex max-w-3xl p-5 items-center">
      <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl max-h-[600px]"
            src="https://images.unsplash.com/photo-1552010099-5dc86fcfaa38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmcmVzaHxlbnwwfDF8fHwxNzEyMTU4MDk0fDA&ixlib=rb-4.0.3&q=80&w=1080"
            alt="registration form image"
          />
        </div>
        <div className="md:w-1/2 px-8">
          <h2 className="font-bold text-3xl text-[#002D74] mb-4">LOGIN</h2>
          <p className="text-sm text-[#002D74] mb-6">
          
          </p>

          <form onSubmit={(e) => handleLogin(e)} className="flex flex-col gap-4">
           
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              value={email}
              type="text"
              className="p-2 rounded-xl border focus:outline-none focus:border-[#002D74]"
              placeholder="Email"
            />
          
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              name="password"
              className="p-2 rounded-xl border focus:outline-none focus:border-[#002D74]"
              placeholder="Password"
            />
            
            <button
              className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
              type="submit"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-gray-100">
            <hr className="border-gray-300" />
            <p className="text-center text-sm mt-3">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#002D74] cursor-pointer font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
       
      </div>
    </section>
    <Toaster position="top-right" containerClassName="p-8 m-8" />
    </div>
  );
};

export default Login;
