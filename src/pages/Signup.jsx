import React, { useState } from 'react';
import { createUserWithEmailAndPassword,  signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firabase';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("User registered successfully");
      navigate('/');

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setMobile("");
      setMonth("");
      setDay("");
    } catch (error) {
      alert(error.message);
    }
  };

 

  //  Logout (move this inside the component)
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row mt-16 sm:mt-20">
    {/* Signup Form */}
    <div className="w-full lg:w-2/3 p-6 sm:p-8 md:p-12 lg:p-16 bg-white">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Create A New Account</h2>
  
      <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
        {/* First & Last Name */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-3">
          <input 
            type="text" 
            placeholder="First Name *" 
            className="border px-3 sm:px-4 py-2 w-full rounded text-sm sm:text-base"
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            required 
            
          />
          <input 
            type="text" 
            placeholder="Last Name *" 
            className="border px-3 sm:px-4 py-2 w-full rounded text-sm sm:text-base"
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            required 
          />
        </div>
  
        {/* Email & Password */}
        <input 
          type="email" 
          placeholder="Email *" 
          className="border px-3 sm:px-4 py-2 w-full rounded text-sm sm:text-base"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password *" 
          className="border px-3 sm:px-4 py-2 w-full rounded text-sm sm:text-base"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
  
        {/* Password rules */}
        <div className="text-xs sm:text-sm text-gray-600">
          <ul className="list-disc ml-4 sm:ml-5 mt-1 sm:mt-2 space-y-1">
            <li>8-40 characters</li>
            <li>1+ uppercase letter</li>
            <li>1+ lowercase letter</li>
            <li>1+ number</li>
            <li>1+ special character</li>
            <li>No spaces</li>
          </ul>
        </div>
  
        {/* DOB & Mobile */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <input 
            type="text" 
            placeholder="MM" 
            className="border px-3 sm:px-4 py-2 w-full rounded text-sm sm:text-base"
            value={month} 
            onChange={(e) => setMonth(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="DD" 
            className="border px-3 sm:px-4 py-2 w-full rounded text-sm sm:text-base"
            value={day} 
            onChange={(e) => setDay(e.target.value)} 
          />
        </div>
  
        <input 
          type="text" 
          placeholder="Mobile Number (Optional)" 
          className="border px-3 sm:px-4 py-2 w-full rounded text-sm sm:text-base"
          value={mobile} 
          onChange={(e) => setMobile(e.target.value)} 
        />
  
        <div className="text-xs sm:text-sm text-gray-600">
          Opt in to text messages for 500 bonus points!
        </div>
  
        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button 
            type="submit" 
            className="bg-gray-500 text-white px-4 sm:px-6 py-2 rounded hover:bg-gray-600 text-sm sm:text-base"
          >
            CREATE ACCOUNT
          </button>
  
          {/* Log Out Button */}
          <button
            onClick={handleLogout}
            type="button"
            className="bg-red-400 text-white px-4 sm:px-6 py-2 rounded hover:bg-red-500 text-sm sm:text-base"
          >
            LOG OUT
          </button>
        </div>
  
        <p className="text-xs text-gray-500 mt-3 sm:mt-4">
          By clicking "Create Account," you agree to our Terms of Use and Privacy Policy.
        </p>
      </form>
    </div>
  
    {/* Right: Benefits */}
    <div className="w-full lg:w-1/3 bg-cover bg-center p-6 sm:p-8 text-white bg-[#2d3e50] flex items-center">
      <div>
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Adventure Rewards</h3>
        <ul className="list-disc ml-4 sm:ml-5 space-y-1 sm:space-y-2 text-xs sm:text-sm">
          <li>Earn an instant 500 points</li>
          <li>Earn points on every purchase</li>
          <li>Quarterly Certificates</li>
          <li>Free Shipping Benefits</li>
          <li>Early access to products & promos</li>
          <li>Birthday Gift</li>
          <li>Receipts & Easy Returns</li>
        </ul>
      </div>
    </div>
  </div>
  );
};

export default Signup;
