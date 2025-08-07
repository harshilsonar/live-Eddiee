import React from 'react'
import { FaFacebookF } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div className="pt--40">
    {/* Your main content here */}
  
    <footer className="bg-gray-100 text-gray-700 text-sm ">
      {/* Top 3 Sections */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 border-b">
        {/* Store Locator */}
        <div className="flex items-start gap-4">
          <span className="text-2xl">📍</span>
          <div>
            <h4 className="font-bold">STORE LOCATOR</h4>
            <p>Find one of over 250 Eddie Bauer stores in North America.</p>
          </div>
        </div>
        {/* Adventure Rewards */}
        <div className="flex items-start gap-4">
          <span className="text-2xl">🏕️</span>
          <div>
            <h4 className="font-bold">ADVENTURE REWARDS</h4>
            <p>Sign up today, earn an instant 500 points</p>
          </div>
        </div>
        {/* Vision Statement */}
        <div className="flex items-start gap-4">
          <span className="text-2xl">🕊️</span>
          <div>
            <h4 className="font-bold">VISION STATEMENT</h4>
            <p>
              To inspire, enable, and empower everyone to experience the outdoors
              and live <em>their</em> adventure.
            </p>
          </div>
        </div>
      </div>
  
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 border-b">
        {/* Help */}
        <div>
          <h4 className="font-bold mb-3">HELP</h4>
          <ul className="space-y-2">
            <li className="transition transform hover:scale-105 duration-200 ease-in-out cursor-pointer">Customer Service</li>
            <li className="transition transform hover:scale-105 duration-200 ease-in-out cursor-pointer">Track Your Order</li>
            <li className="transition transform hover:scale-105 duration-200 ease-in-out cursor-pointer">Return Policy</li>
            <li className="transition transform hover:scale-105 duration-200 ease-in-out cursor-pointer">Start A Return</li>
            <li className="transition transform hover:scale-105 duration-200 ease-in-out cursor-pointer">Shipping</li>
            <li className="transition transform hover:scale-105 duration-200 ease-in-out cursor-pointer">Payment Options</li>
            <li className="transition transform hover:scale-105 duration-200 ease-in-out cursor-pointer">Contact Us</li>
          </ul>
        </div>
  
        {/* Shopping */}
        <div>
          <h4 className="font-bold mb-3">SHOPPING</h4>
          <ul className="space-y-2">
            <li className="transition transform hover:scale-105 duration-200 ease-in-out cursor-pointer">Sign In / Register</li>
            <li className="transition transform hover:scale-105 duration-200 ease-in-out cursor-pointer">Adventure Rewards</li>
            <li className="transition transform hover:scale-105 duration-200 ease-in-out cursor-pointer">Buy Gift Cards</li>
            <li className="transition transform hover:scale-105 duration-200 ease-in-out cursor-pointer">Promos And Coupons</li>
            <li className="transition transform hover:scale-105 duration-200 ease-in-out cursor-pointer">Find Your Fit</li>
            <li className="transition transform hover:scale-105 duration-200 ease-in-out cursor-pointer">Price Match Policy</li>
          </ul>
        </div>
  
        {/* Credit Card */}
        <div>
          <h4 className="font-bold mb-3">EB CREDIT CARD</h4>
          <ul className="space-y-2">
            <li className="transition transform hover:scale-105 duration-200 ease-in-out cursor-pointer">Learn More</li>
          </ul>
               
               <div>
          <h4 className="font-bold mt-3">VISIT A STORE</h4>
          <p  className="transition transform hover:scale-105 duration-200 ease-in-out cursor-pointer">Store Locator</p>
          </div>
        </div>
  
        {/* About */}
        <div>
          <h4 className="font-bold mb-3">ABOUT US</h4>
          <ul className="space-y-2">
            <li className="transition transform hover:scale-105 duration-200 ease-in-out cursor-pointer">Our Story</li>
            <li className="transition transform hover:scale-105 duration-200 ease-in-out cursor-pointer">Careers</li>
            <li className="transition transform hover:scale-105 duration-200 ease-in-out cursor-pointer">Affiliate Program</li>
            <li className="transition transform hover:scale-105 duration-200 ease-in-out cursor-pointer">Land Acknowledgement</li>
            <li className="font-semibold transition transform hover:scale-105 duration-200 ease-in-out cursor-pointer">Privacy Policy</li>
            <li className="transition transform hover:scale-105 duration-200 ease-in-out cursor-pointer">Your Privacy Choices</li>
            <li className="transition transform hover:scale-105 duration-200 ease-in-out cursor-pointer">CA Supply Chains Act</li>
            <li className="transition transform hover:scale-105 duration-200 ease-in-out cursor-pointer">Notice At Collection</li>
            <li className="transition transform hover:scale-105 duration-200 ease-in-out cursor-pointer">Do Not Contact Me</li>
            <li className="transition transform hover:scale-105 duration-200 ease-in-out cursor-pointer">Accessibility Statement</li>
            <li className="transition transform hover:scale-105 duration-200 ease-in-out cursor-pointer">Forced Labor Report</li>
          </ul>
        </div>
  
        {/* Visit a Store */}
       
  
        {/* Sign Up & Socials */}
        <div className="ms-3">
          <h4 className="font-bold mb-3">BE THE FIRST TO KNOW</h4>
          <p className="mb-2">Earn rewards and be the first to hear about sales and special offers.</p>
       <Link to={'signup'} >  <button className="px-6 py-2 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition">
            SIGN UP
          </button></Link>
          <div className="flex space-x-3 text-xl mt-6">
            <FaFacebookF />
            <FaYoutube />
            <FaInstagram />
            <FaPinterestP />
            <FaTwitter />
          </div>
        </div>
      </div>
  
      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 text-xs text-gray-600">
        <div className="flex items-center gap-2 ms-30">
          <img src="https://flagcdn.com/us.svg" alt="US" className="w-5 h-3" />
          <img src="https://flagcdn.com/ca.svg" alt="Canada" className="w-5 h-3" />
        </div>
        <div>Session ID #685 434 177</div>
        <div className="space-x-4">
          <a href="#">Terms of Use</a>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </footer>
  </div>
  
  
  )
}
