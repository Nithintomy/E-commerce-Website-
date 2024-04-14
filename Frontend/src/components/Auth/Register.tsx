import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

import { signup } from '../../features/userSlice/authSlice';

function Register() {
  const [userName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confimPassword, setConfirmPassword] = useState("");
  const isStrongPassword = (password: string): boolean => {
    return password.length >= 8;
  };
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTutorName = userName.trim();
    const trimmedsTutorEmail = email.trim();
    const trimmedPhone = mobile.trim();
    const trimmedpassword = password.trim();

    if (
      trimmedTutorName === "" ||
      trimmedsTutorEmail === "" ||
      trimmedPhone === "" ||
      trimmedpassword === ""
    ) {
      toast.error("Require All fields");
      return;
    }

    if (!isStrongPassword(password)) {
      toast.error("password Must be atleast 8 characters");
      return;
    }

    if (password !== confimPassword) {
      toast.error("Password Not Match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { userName, email, password, mobile });
      dispatch(signup(response.data.user));
      toast.success("User Created SuccessFuly");
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    
    } catch (error:any) {
      if (error.response && error.response.data && error.response.data.message) {
      
        setErrorMessage(error.response.data.message);
      } else {
        console.error('Signup failed:', error);
      }
    }
  };
 

  return (
    <section className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-[#dfa674] rounded-2xl flex max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8">
          <h2 className="font-bold text-3xl text-[#002D74] mb-4">Register</h2>
          <p className="text-sm text-[#002D74] mb-6">
            Create a new account to access all features.
          </p>
          <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
            <input
              id="name"
              type="text"
              name="fullname"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
              className="p-2 rounded-xl border focus:outline-none focus:border-[#002D74]"
 
            />
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
              onChange={(e) => setMobile(e.target.value)}
              id="phone"
              name="phone"
              value={mobile}
              type="text"
              placeholder='Mobile Number'
              className="p-2 rounded-xl border focus:outline-none focus:border-[#002D74]"
     
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              name="password"
              className="p-2 rounded-xl border focus:outline-none focus:border-[#002D74]"
              placeholder="Confirm Password"
            />
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="password"
              type="password"
              name="confirmPassword"
              value={confimPassword}
              placeholder="••••••••"
              className="p-2 rounded-xl border focus:outline-none focus:border-[#002D74]"
    
            />

            <button
              className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
              type="submit"
            >
              Register
            </button>
          </form>

          <div className="mt-6 text-gray-100">
            <hr className="border-gray-300" />
            <p className="text-center text-sm mt-3">
              Already have an account?{" "}
              <Link to={'/login'} className="text-[#002D74] cursor-pointer font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl max-h-[600px]"
            src="https://images.unsplash.com/photo-1552010099-5dc86fcfaa38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmcmVzaHxlbnwwfDF8fHwxNzEyMTU4MDk0fDA&ixlib=rb-4.0.3&q=80&w=1080"
            alt="registration form image"
          />
        </div>
      </div>
      <Toaster position="top-right" containerClassName="p-8 m-8" />
    </section>

       
 
  );
};

export default Register;
