import React, { useEffect, useState } from 'react'
import { SlArrowRight } from "react-icons/sl";
import { FaMountain } from "react-icons/fa";
import { IoBag } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { GiHummingbird } from "react-icons/gi";
import { Link, Scripts, useNavigate } from 'react-router-dom';
import { auth, provider } from '../services/firabase';
import GoogleButton from 'react-google-button';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { IoMdClose } from "react-icons/io";




function Navbar() {

  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
      alert('Login successful!');
      setOpenDrawer(false);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  const handleGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      console.log(res);
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };


  const handleSearch = (e) => {
    const query = e.target.value;
    if (query) {
      // URL mein search query ko add karenge
      navigate(`/${window.location.pathname.split('/')[1]}?search=${query}`);
    } else {
      // Agar search empty ho, toh search ko reset karenge
      navigate(`/${window.location.pathname.split('/')[1]}`);
    }
  }


  // Handle menu toggle
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? '' : 'hidden';
  };

  // Close menu when clicking on links (optional)
  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);



  return (
    <div className="w-full">
      <div className="w-full">
        {/* Top Notification Bar */}
        <div className="fixed top-0 left-0 w-full bg-gray-800 text-white text-xs sm:text-sm flex flex-col sm:flex-row justify-between items-center px-2 sm:px-4 md:px-6 py-1 sm:py-2 z-50">
          {/* Left: Logo + Text - Hidden on smaller screens */}
          <div className="hidden sm:flex items-center gap-2 whitespace-nowrap">
            <FaMountain className="text-base lg:text-lg" />
            <span className="hidden md:inline">Earn Rewards On Purchases</span>
          </div>

          {/* Center: Offer Text */}
          <div className="flex-1 text-center whitespace-nowrap overflow-hidden py-1 sm:py-0">
            <span className="font-medium text-xs sm:text-sm">
              40% OFF PANTS & SHORTS
              <span className="ml-2 md:ml-4 inline-flex items-center gap-1 cursor-pointer font-normal text-xs sm:text-sm">
                VIEW ALL <span className="hidden sm:inline">OFFERS</span> <SlArrowRight className="text-xs" />
              </span>
            </span>
          </div>

          {/* Right: Links */}
          <div className="relative flex items-center gap-2 md:gap-4 whitespace-nowrap justify-end p-1 sm:p-2 md:p-4">
            {/* Stores - Hidden on very small screens */}
            <span className="hidden sm:flex items-center gap-1 cursor-pointer text-xs md:text-sm">
              <FaLocationDot /> Stores
            </span>

            {/* Sign In / Sign Up */}
            <span className="flex items-center gap-1 text-xs md:text-sm">
              <CgProfile className="text-sm md:text-base" />
              <Link to="/signup" className="">Sign In</Link>
              <span className="mx-1">/</span>
              <span onClick={() => setOpenDrawer(true)} className="cursor-pointer hover:underline">
                Sign Up
              </span>
            </span>

            {/* Right Drawer */}
            {openDrawer && (
              <div className="absolute top-8 sm:top-10 md:top-12 right-0 w-64 sm:w-72 md:w-80 bg-white shadow-lg p-3 md:p-4 z-50 border rounded">
                <div className="flex justify-between items-center mb-2 md:mb-3">
                  <h2 className="font-semibold text-xs md:text-sm text-black">Don't Have an Account?</h2>
                  <button onClick={() => setOpenDrawer(false)} className="text-base md:text-lg font-bold text-black">
                    ✕
                  </button>
                </div>

                <p className="text-xs mb-2 text-gray-600">Earn an instant 500 points</p>
                <Link to={"/signup"}>
                  <button className="w-full bg-black text-white text-xs md:text-sm py-1.5 md:py-2 mb-3 md:mb-4 hover:bg-gray-800">
                    CREATE A NEW ACCOUNT
                  </button>
                </Link>

                <h3 className="font-medium text-xs md:text-sm mb-2">Sign In to Your Account</h3>
                <form onSubmit={handleLogin} className="space-y-1 md:space-y-2 text-danger">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full border text-black border-black px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded"
                    required
                  />
                  <br />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full border text-black border-black px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded"
                    required
                  />
                  <p className="text-xs text-blue-600 cursor-pointer">
                    Forgot Your Password?
                  </p>
                  <button type="submit" className="w-full bg-gray-700 text-white text-xs md:text-sm py-1.5 md:py-2 hover:bg-gray-800">
                    SIGN IN
                  </button>
                  <div className="w-full">
                    <GoogleButton onClick={handleGoogle} />
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Navbar */}
        <div className="fixed top-[35px] left-0 w-full bg-white z-40 shadow border-b mt-4 sm:mt-6 md:mt-8">
          <div className="grid grid-cols-3 items-center px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 gap-2 md:gap-4">
            {/* Left: Search */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Hide search input on smaller screens, show icon only */}
              <div className="hidden sm:flex items-center w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={handleSearch}
                  className="border-b border-gray-400 focus:outline-none w-full max-w-[160px] md:max-w-[200px] lg:max-w-[240px] py-1 px-2 text-xs md:text-sm"
                />
                <FaSearch className="text-gray-600 text-xs md:text-sm" />
              </div>

              {/* Show search icon only on small screens */}
              <div className="sm:hidden flex items-center">
                <FaSearch className="text-gray-600 text-base" />
              </div>
            </div>

            {/* Center: Logo */}
            <div className="flex justify-center">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-wide">
                <Link to="/" className="flex items-center gap-1 md:gap-2">
                  EDDIEBAUER <GiHummingbird className="text-base sm:text-lg md:text-xl" />
                </Link>
              </h1>
            </div>

            {/* Right: Shopping Bag */}
            <div className="flex justify-end">
              <div className="text-xs sm:text-sm text-gray-700 flex flex-col items-center">
                <Link to={'/Cart'} className="flex flex-col items-center">
                  <IoBag className="text-lg md:text-xl" />
                  <span className="text-xs">Bag</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu - Can be toggled */}
          {/* <div className="sm:hidden flex justify-center pb-1">
            <button className="text-xs border border-gray-300 px-2 py-1 rounded">
              Menu <span className="ml-1">▼</span>
            </button>
          </div> */}
        </div>
      </div>



      {/* Bottom Nav Links */}

      {/* <!-- NEW --> */}
      {/* <!-- Navbar --> */}

      <div className="fixed top-[105px] left-0 w-full bg-white z-40 border-b shadow mt-8">
        <div className="hidden md:flex justify-center gap-6 text-sm font-semibold py-2">
          {/* <!-- NEW --> */}
          <div class="group relative">
            <span class="cursor-pointer text-blue-900">NEW!
              <span class="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-sky-500/75 transition-all duration-300 group-hover:w-full"></span>
            </span>
            <div class="absolute hidden group-hover:block bg-white s top-full mt-2 p-10  z-10 d-flex" style={{ marginLeft: "-400px", width: "1560px", height: "400px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", width: "400px", marginLeft: "105px" }}>
                <div style={{ width: "250px", borderRight: "1px solid grey" }}>
                  <h4 class="font-bold mb-2">FEATURED</h4>
                  <ul class="space-y-1 text-sm">
                    <li class="hover:underline">Mother's Day Gifts</li>
                    <li class="hover:underline">Hiking</li>
                    <li class="hover:underline">Travel</li>
                    <li class="hover:underline">Spring Jackets</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-bold mb-2" style={{ paddingLeft: "50px", width: "250px" }}>SHOP BY CATEGORY</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "50px", width: "160px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Women</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Men</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Outwear</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Gear & Home</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Shoes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- WOMEN --> */}
          <div class="group relative">
            <span class="cursor-pointer">WOMEN
              <span class="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-sky-500/75 transition-all duration-300 group-hover:w-full"></span>
            </span>
            <div class="absolute hidden group-hover:block bg-white s top-full mt-2 p-10  z-10 d-flex" style={{ marginLeft: "-500px", width: "1605px", height: "500px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", width: "400px", marginLeft: "105px" }}>
                <div style={{ width: "800px", borderRight: "1px solid black" }}>
                  <h4 class="font-bold mb-2" style={{ marginLeft: "100px", width: "150px", }}>FEATURED</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "100px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Shop All Women's</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>New Arrivals</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>First Ascent</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Sale</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Women's Petite</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Women's Tall</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Women's Plus</li>
                  </ul>

                  <h4 class="font-bold mb-2" style={{ marginLeft: "100px", width: "150px", marginTop: "90px" }}>BUY MORE & SAVE</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "100px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Tops up to 30% off</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Socks up to 40% off</li>

                  </ul>
                </div>

                <div>
                  <h4 class="font-bold mb-2" style={{ paddingLeft: "50px", width: "180px" }}>TOPS</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "50px", width: "160px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Actwear Tops</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Shirts</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Tank Tops</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>T-Shirt</li>
                  </ul>

                  <h4 class="font-bold mb-2" style={{ marginLeft: "90px", marginTop: "180px" }}>FLEECE</h4>

                </div>

                <div>
                  <h4 class="font-bold mb-2" style={{ marginLeft: "90px" }}>BOTTOMS</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "90px", width: "110px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Capris</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Jeans</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Joggers</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Leggings </li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Lined Bottoms</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Pants</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Shorts</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Skirts & Skorts</li>
                  </ul>

                  <h4 class="font-bold mb-2" style={{ marginLeft: "90px", marginTop: "55px" }}>SWIMWEAR</h4>
                </div>

                <div>
                  <h4 class="font-bold mb-2" style={{ paddingLeft: "60px" }}>OUTERWEAR</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "60px", width: "160px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Insulated</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>jackets</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Pants</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Parkas</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Rainwear</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Softshell & Wind jackets</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Vests</li>

                    <h4 class="font-bold mb-2" style={{ marginLeft: "90px", marginTop: "85px" }}>DRESSES</h4>

                  </ul>
                </div>

                <div>
                  <h4 class="font-bold mb-2" style={{ paddingLeft: "60px", width: "250px" }}>ACCESSORIES</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "60px", width: "120px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Belts</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Gloves</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Hats</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Scarves</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Scoks</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Sunglasses</li>
                  </ul>

                  <h4 class="font-bold mb-2" style={{ marginLeft: "90px", marginTop: "110px" }}>SHOES</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "90px", width: "110px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Boots</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Hiking </li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Sandals</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Slippers</li>
                  </ul>
                </div>

              </div>
            </div>
          </div>

          {/* <!-- MEN --> */}
          <div class="group relative">
            <span class="cursor-pointer">MEN
              <span class="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-sky-500/75 transition-all duration-300 group-hover:w-full"></span>
            </span>
            <div class="absolute hidden group-hover:block bg-white s top-full mt-2 p-10  z-10 d-flex" style={{ marginLeft: "-500px", width: "1520px", height: "450px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", width: "400px", marginLeft: "105px" }}>
                <div style={{ width: "800px", borderRight: "1px solid black" }}>
                  <h4 class="font-bold mb-2" style={{ marginLeft: "100px", width: "150px", }}>FEATURED</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "100px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Shop All Men's</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>New Arrivals</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>First Ascent</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Sale</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Men's Tall</li>
                  </ul>

                  <h4 class="font-bold mb-2" style={{ marginLeft: "100px", width: "150px", marginTop: "100px" }}>BUY MORE & SAVE</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "100px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Tops up to 30% off</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Socks up to 40% off</li>

                  </ul>
                </div>

                <div>
                  <h4 class="font-bold mb-2" style={{ paddingLeft: "50px", width: "180px" }}>TOPS</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "50px", width: "160px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Actwear Tops</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Polos </li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Shirts</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Shirt Jacket</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Sweatshirts & Hoodies</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>T-Shirt</li>
                  </ul>

                  <h4 class="font-bold mb-2" style={{ marginLeft: "90px", marginTop: "70px" }}>FLEECE</h4>

                </div>

                <div>
                  <h4 class="font-bold mb-2" style={{ marginLeft: "90px" }}>BOTTOMS</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "90px", width: "110px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Jeans</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Pants </li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Shorts</li>
                  </ul>

                  <h4 class="font-bold mb-2" style={{ marginLeft: "90px", marginTop: "150px" }}>SHOES</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "90px", width: "110px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Boots</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Hiking </li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Sandals</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Slippers</li>
                  </ul>

                </div>

                <div>
                  <h4 class="font-bold mb-2" style={{ paddingLeft: "20px" }}>OUTERWEAR</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "20px", width: "160px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Insulated</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>jackets</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Pants</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Parkas</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Rainwear</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Softshell & Wind jackets</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Vests</li>
                  </ul>
                </div>

                <div>
                  <h4 class="font-bold mb-2" style={{ paddingLeft: "20px", width: "250px" }}>ACCESSORIES</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "20px", width: "120px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Belts</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Boxers</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Gloves</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Hats</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Scarves</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Scoks</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Sunglasses</li>
                  </ul>
                </div>

              </div>
            </div>
          </div>

          {/* <!-- OUTERWEAR --> */}
          <div class="group relative">
            <span class="cursor-pointer">OUTERWEAR
              <span class="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-sky-500/75 transition-all duration-300 group-hover:w-full"></span>
            </span>
            <div class="absolute hidden group-hover:block bg-white s top-full mt-2 p-10  z-10 d-flex" style={{ marginLeft: "-600px", width: "1560px", height: "400px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", width: "400px", marginLeft: "105px" }}>
                <div style={{ width: "600px", borderRight: "1px solid black" }}>
                  <h4 class="font-bold mb-2" style={{ marginLeft: "100px", width: "150px", }}>FEATURED</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "100px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Rainwear</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Shop all Outwear</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>New Arrivals </li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Sale</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Outerwear Care Guide</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>First Ascent</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Women's Petite</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Women's Tall</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Women's Plus</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Men's Tall</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-bold mb-2" style={{ marginLeft: "50px" }}>WOMEN</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "50px", width: "160px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Insulated</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>jackets</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Pants</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Parkas</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Rainwear</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Softshell & Wind jackets</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Vests</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-bold mb-2" style={{ marginLeft: "100px" }}>MEN</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "100px", width: "160px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Insulated</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>jackets</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Pants</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Parkas</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Rainwear</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Shirt Jackets</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Softshell & Wind jackets</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Vests</li>
                  </ul>
                </div>



              </div>
            </div>
          </div>

          {/* <!-- GEAR & HOME --> */}
          <div class="group relative">
            <span class="cursor-pointer">GEAR & HOME
              <span class="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-sky-500/75 transition-all duration-300 group-hover:w-full"></span>
            </span>
            <div class="absolute hidden group-hover:block bg-white s top-full mt-2 p-10  z-10 d-flex" style={{ marginLeft: "-800px", width: "1650px", height: "400px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", width: "400px", marginLeft: "105px" }}>
                <div style={{ width: "800px", borderRight: "1px solid black" }}>
                  <h4 class="font-bold mb-2" style={{ marginLeft: "100px", width: "150px", }}>FEATURED</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "100px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Shop All Gear & Home</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>New Arrivals</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>First Ascent</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Sale</li>
                  </ul>

                  <h4 class="font-bold mb-2" style={{ marginLeft: "100px", width: "150px", marginTop: "100px" }}>Special Collection</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "100px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Stanely</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Travelon</li>

                  </ul>
                </div>

                <div>
                  <h4 class="font-bold mb-2" style={{ paddingLeft: "50px", width: "180px" }}>PACKS & LUGGAGE</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "50px", }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Backpacks</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Crossbody bags</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Duffle & Luggage</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Tote Bags</li>
                  </ul>
                </div>

                <div>
                  <h4 class="font-bold mb-2" style={{ marginLeft: "90px" }}>CAMPING</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "90px", width: "110px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Chairs</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Sleeping Bags</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Tents</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Slippers</li>
                  </ul>
                </div>

                <div>
                  <h4 class="font-bold mb-2" style={{ paddingLeft: "20px", width: "200px" }}>OUTDOOR ACCESSORIES</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "20px", width: "100px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Drinkware</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Games</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Lighting</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Sunglasses</li>
                  </ul>
                </div>

                <div>
                  <h4 class="font-bold mb-2" style={{ paddingLeft: "20px", width: "250px" }}>HOME</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "20px", width: "120px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Bedding</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Blankets & Throws</li>
                  </ul>
                </div>

              </div>
            </div>
          </div>

          {/* <!-- SHOES --> */}
          <div class="group relative">
            <span class="cursor-pointer">SHOES
              <span class="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-sky-500/75 transition-all duration-300 group-hover:w-full"></span>
            </span>
            <div class="absolute hidden group-hover:block bg-white s top-full mt-2 p-10  z-10 d-flex" style={{ marginLeft: "-900px", width: "1620px", height: "400px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", width: "400px", marginLeft: "105px" }}>
                <div style={{ width: "600px", borderRight: "1px solid black" }}>
                  <h4 class="font-bold mb-2" style={{ marginLeft: "100px", width: "150px", }}>FEATURED</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "100px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Shop All Shoes</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>New Arrivals</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Sales</li>

                  </ul>
                </div>
                <div>
                  <h4 class="font-bold mb-2" style={{ marginLeft: "166px" }}>WOMEN</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "166px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Boots</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Hiking</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Sandals</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Slippers</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-bold mb-2" style={{ marginLeft: "100px" }}>MEN</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "100px", width: "120px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Boots</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Hiking</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Sandals</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Slippers</li>
                  </ul>
                </div>



              </div>
            </div>
          </div>

          {/* <!-- SALE --> */}
          <div class="group relative">
            <span class="cursor-pointer">SALE
              <span class="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-sky-500/75 transition-all duration-300 group-hover:w-full"></span>
            </span>
            <div class="absolute hidden group-hover:block bg-white s top-full mt-2 p-10  z-10 d-flex" style={{ marginLeft: "-900px", width: "1550px", height: "390px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", width: "400px", marginLeft: "105px" }}>
                <div style={{ width: "600px", borderRight: "1px solid black" }}>
                  <h4 class="font-bold mb-2" style={{ marginLeft: "100px", width: "150px", }}>BUY MORE & SAVE</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "100px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Tops up to 30% off</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Socks up to 40% off</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-bold mb-2" style={{ marginLeft: "166px" }}>WOMEN</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "166px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Accessories</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Bottom</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Outwears</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Shoes</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Tops</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-bold mb-2" style={{ marginLeft: "100px" }}>MEN</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "100px", width: "120px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Accessories</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Bottom</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Outwears</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Shoes</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Tops</li>
                  </ul>
                </div>

                <div>
                  <h4 class="font-bold mb-2" style={{ marginLeft: "90px", width: "100px" }}>GEAR & HOME</h4>
                </div>

              </div>
            </div>
          </div>

          {/* <!-- CLEARANCE --> */}
          <div class="group relative">
            <span class="cursor-pointer text-red-600">CLEARANCE
              <span class="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-sky-500/75 transition-all duration-300 group-hover:w-full"></span>
            </span>
            <div class="absolute hidden group-hover:block bg-white s top-full mt-2 p-10  z-10 d-flex" style={{ marginLeft: "-935px", width: "1525px", height: "540px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", width: "400px", marginLeft: "105px" }}>
                <div>
                  <h4 class="font-bold mb-2" style={{ marginLeft: "166px" }}>WOMEN</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "166px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Accessories</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Bottom</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Flannel</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Fleece </li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Leggings </li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Sweaters </li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Swimwear </li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Outwears</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Pants</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Shirts</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Shoes</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>shorts</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Sweatshirts</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Hoodies</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Tops</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>T-shirts</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-bold mb-2" style={{ marginLeft: "100px" }}>MEN</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "100px", width: "120px" }}>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Accessories</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Bottom</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Flannel</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Fleece </li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Graphic T-shirts</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Outwears</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Pants</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Shirts</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Shoes</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>shorts</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Sweatshirts</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Hoodies</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>Tops</li>
                    <li class="hover:underline" style={{ marginTop: "10px" }}>T-shirts</li>
                  </ul>
                </div>

                <div>
                  <h4 class="font-bold mb-2" style={{ marginLeft: "90px" }}>GEAR & HOME</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "100px", width: "100px" }}>
                    <li class="hover:underline" style={{ marginTop: "15px" }}>Accessories</li>
                    <li class="hover:underline" style={{ marginTop: "15px" }}>Backpack</li>

                  </ul>
                </div>

              </div>
            </div>
          </div>

          {/* <!-- KIDS --> */}
          <div class="group relative">
            <span class="relative cursor-pointer group">
              KIDS
              <span class="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-sky-500/75 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </div>

          {/* <!-- ABOUT US --> */}
          <div class="group relative">
            <span class="relative cursor-pointer group">
              ABOUT US
              <span class="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-sky-500/75 transition-all duration-300 group-hover:w-full"></span>
            </span>
            <div class="absolute hidden group-hover:block bg-white s top-full mt-2 p-10  z-10 d-flex" style={{ marginLeft: "-1100px", width: "1520px", height: "390px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", width: "400px", marginLeft: "200px" }}>
                <div>
                  <h4 class="font-bold mb-2 ">WHO ARE WE</h4>

                  <ul class="space-y-1 text-sm" >
                    <li class="hover:underline" style={{ marginTop: "15px" }}>Awards & press</li>
                    <li class="hover:underline" style={{ marginTop: "15px" }}>Our story</li>
                    <li class="hover:underline" style={{ marginTop: "15px" }}>Sustainability</li>
                    <li class="hover:underline" style={{ marginTop: "15px" }}>Careers</li>

                  </ul>
                </div>

                <div>
                  <h4 class="font-bold mb-2">BLOG</h4>

                  <ul class="space-y-1 text-sm">
                    <li class="hover:underline" style={{ marginTop: "15px" }}>View All Posts</li>
                    <li class="hover:underline" style={{ marginTop: "15px" }}>Camp & Hike</li>
                    <li class="hover:underline" style={{ marginTop: "15px" }}>Expedition</li>
                    <li class="hover:underline" style={{ marginTop: "15px" }}>Food </li>
                    <li class="hover:underline" style={{ marginTop: "15px" }}>Gear</li>
                    <li class="hover:underline" style={{ marginTop: "15px" }}>Reacent Videos</li>
                    <li class="hover:underline" style={{ marginTop: "15px" }}>Wellness</li>
                  </ul>
                </div>



              </div>
            </div>
          </div>
        </div>






        <div className="md:hidden flex items-center justify-between px-3 py-2">
        <button 
          className="text-blue-900" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

        {/* Mobile Off-canvas Menu */}
        <div
        className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="relative h-full overflow-y-auto">
          <button
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
            onClick={toggleMenu}
            aria-label=""
          >
            <IoMdClose className="h-6 w-6" />
          </button>

            <div className="mt-15 space-y-6">
              {/* NEW */}
              <div>
                <h3 className="font-bold text-blue-900 border-b pb-2">NEW!</h3>
                <ul className="mt-2 space-y-2 pl-4">
                  <li className="py-1 hover:underline">Mother's Day Gifts</li>
                  <li className="py-1 hover:underline">Hiking</li>
                  <li className="py-1 hover:underline">Travel</li>
                  <li className="py-1 hover:underline">Spring Jackets</li>
                </ul>

                <h4 class="font-bold mt-3" >SHOP BY CATEGORY</h4>

                  <ul class="space-y-1 text-sm" style={{ marginLeft: "50px", width: "160px" }}>
                    <li className="py-1 hover:underline">Women</li>
                    <li className="py-1 hover:underline">Men</li>
                    <li className="py-1 hover:underline">Outwear</li>
                    <li className="py-1 hover:underline">Gear & Home</li>
                    <li className="py-1 hover:underline">Shoes</li>
                  </ul>
              </div>

              {/* WOMEN */}
              <div>
                <h3 className="font-bold border-b pb-2">WOMEN</h3>
                <div className="pl-4">
                  <h4 className="font-semibold mt-3">FEATURED</h4>
                  <ul className="space-y-1">
                    <li className="py-1 hover:underline">Shop All Women's</li>
                    <li className="py-1 hover:underline">New Arrivals</li>
                    <li className="py-1 hover:underline">First Ascent</li>
                    <li className="py-1 hover:underline">Sale</li>
                    <li className="py-1 hover:underline">Women's Petite</li>
                    <li className="py-1 hover:underline">Women's Tall</li>
                    <li className="py-1 hover:underline">Women's Plus</li>
                  </ul>

                  <h4 class="font-semibold mt-4">BUY MORE & SAVE</h4>

                  <ul class="space-y-1" >
                    <li className="py-1 hover:underline" >Tops up to 30% off</li>
                    <li className="py-1 hover:underline" >Socks up to 40% off</li>

                  </ul>

                  <h4 className="font-semibold mt-5">TOPS</h4>
                  <ul className="space-y-1">
                    <li className="py-1 hover:underline">Actwear Tops</li>
                    <li className="py-1 hover:underline">Shirts</li>
                    <li className="py-1 hover:underline">Tank Tops</li>
                    <li className="py-1 hover:underline">T-Shirt</li>
                  </ul>

                  <h4 class="font-semibold mt-6">FLEECE</h4>


                  <h4 class="font-semibold mt-7" >BOTTOMS</h4>

                  <ul class="space-y-1 text-sm" >
                    <li className="py-1 hover:underline">Capris</li>
                    <li className="py-1 hover:underline">Jeans</li>
                    <li className="py-1 hover:underline">Joggers</li>
                    <li className="py-1 hover:underline">Leggings </li>
                    <li className="py-1 hover:underline">Lined Bottoms</li>
                    <li className="py-1 hover:underline">Pants</li>
                    <li className="py-1 hover:underline">Shorts</li>
                    <li className="py-1 hover:underline">Skirts & Skorts</li>
                  </ul>

                  <h4 class="font-semibold  mt-8" >SWIMWEAR</h4>

                  <h4 class="font-semibold mt-9" >OUTERWEAR</h4>

                  <ul class="space-y-1 text-sm" >
                    <li className="py-1 hover:underline">Insulated</li>
                    <li className="py-1 hover:underline">jackets</li>
                    <li className="py-1 hover:underline">Pants</li>
                    <li className="py-1 hover:underline">Parkas</li>
                    <li className="py-1 hover:underline">Rainwear</li>
                    <li className="py-1 hover:underline">Softshell & Wind jackets</li>
                    <li className="py-1 hover:underline">Vests</li>

                    <h4 class="font-semibold mt-10" >DRESSES</h4>

                  </ul>

                  <h4 class="font-semibold mt-11" >ACCESSORIES</h4>

                  <ul class="space-y-1 text-sm" >
                    <li className="py-1 hover:underline">Belts</li>
                    <li className="py-1 hover:underline">Gloves</li>
                    <li className="py-1 hover:underline">Hats</li>
                    <li className="py-1 hover:underline">Scarves</li>
                    <li className="py-1 hover:underline">Scoks</li>
                    <li className="py-1 hover:underline">Sunglasses</li>
                  </ul>

                  <h4 class="font-semibold mt-12" >SHOES</h4>

                  <ul class="space-y-1 text-sm">
                    <li className="py-1 hover:underline">Boots</li>
                    <li className="py-1 hover:underline">Hiking </li>
                    <li className="py-1 hover:underline">Sandals</li>
                    <li className="py-1 hover:underline">Slippers</li>
                  </ul>
                  {/* Add all other women's categories similarly */}
                </div>
              </div>

              {/* MEN */}
              <div>
                <h3 className="font-bold border-b pb-2">MEN</h3>
                <div className="pl-4">
                  <h4 className="font-semibold mt-3">FEATURED</h4>
                  <ul className="space-y-1">
                    <li className="py-1 hover:underline">Shop All Men's</li>
                    <li className="py-1 hover:underline">New Arrivals</li>
                    <li className="py-1 hover:underline">First Ascent</li>
                    <li className="py-1 hover:underline">Sale</li>
                    <li className="py-1 hover:underline">Men's Tall</li>
                  </ul>

                  <h4 className="font-semibold mt-4">TOPS</h4>
                  <ul className="space-y-1">
                    <li className="py-1 hover:underline">Actwear Tops</li>
                    <li className="py-1 hover:underline">Polos</li>
                    <li className="py-1 hover:underline">Shirts</li>
                    <li className="py-1 hover:underline">T-Shirt</li>
                  </ul>


                  <h4 className="font-semibold mt-5">BUY MORE & SAVE</h4>
                  <ul className="space-y-1">
                    <li className="py-1 hover:underline" >Tops up to 30% off</li>
                    <li className="py-1 hover:underline" >Socks up to 40% off</li>
                  </ul>
                  {/* Add all other men's categories similarly */}
                  <h4 className="font-bold mt-6">FLEECE</h4>


                  <h4 className="font-bold mt-7">BOTTOMS</h4>

                  <ul class="space-y-1 text-sm" >
                    <li className="py-1 hover:underline" >Jeans</li>
                    <li className="py-1 hover:underline" >Pants </li>
                    <li className="py-1 hover:underline" >Shorts</li>
                  </ul>

                  <h4 className="font-bold mt-8">SHOES</h4>

                  <ul class="space-y-1 text-sm" >
                    <li className="py-1 hover:underline" >Boots</li>
                    <li className="py-1 hover:underline" >Hiking </li>
                    <li className="py-1 hover:underline" >Sandals</li>
                    <li className="py-1 hover:underline" >Slippers</li>
                  </ul>


                  <h4 class="font-bold mt-9" >OUTERWEAR</h4>

                  <ul class="space-y-1 text-sm" >
                    <li className="py-1 hover:underline" >Insulated</li>
                    <li className="py-1 hover:underline" >jackets</li>
                    <li className="py-1 hover:underline" >Pants</li>
                    <li className="py-1 hover:underline" >Parkas</li>
                    <li className="py-1 hover:underline" >Rainwear</li>
                    <li className="py-1 hover:underline" >Softshell & Wind jackets</li>
                    <li className="py-1 hover:underline" >Vests</li>
                  </ul>

                  <h4 class="font-bold mt-10">ACCESSORIES</h4>

                  <ul class="space-y-1 text-sm" >
                    <li className="py-1 hover:underline" >Belts</li>
                    <li className="py-1 hover:underline" >Boxers</li>
                    <li className="py-1 hover:underline" >Gloves</li>
                    <li className="py-1 hover:underline" >Hats</li>
                    <li className="py-1 hover:underline" >Scarves</li>
                    <li className="py-1 hover:underline" >Scoks</li>
                    <li className="py-1 hover:underline" >Sunglasses</li>
                  </ul>
                </div>

              </div>

              {/* OUTERWEAR */}
              <div>
                <h3 className="font-bold border-b pb-2">OUTERWEAR</h3>
                <div className="pl-4">
                  <h4 className="font-semibold mt-3">FEATURED</h4>
                  <ul className="space-y-1">
                    <li className="py-1 hover:underline">Rainwear</li>
                    <li className="py-1 hover:underline">Shop all Outwear</li>
                    <li className="py-1 hover:underline">New Arrivals</li>
                    <li className="py-1 hover:underline" >Sale</li>
                    <li className="py-1 hover:underline" >Outerwear Care Guide</li>
                    <li className="py-1 hover:underline" >First Ascent</li>
                    <li className="py-1 hover:underline" >Women's Petite</li>
                    <li className="py-1 hover:underline" >Women's Tall</li>
                    <li className="py-1 hover:underline" >Women's Plus</li>
                    <li className="py-1hover:underline" >Men's Tall</li>
                  </ul>

                  <h4 className="font-semibold mt-4">WOMEN</h4>
                  <ul className="space-y-1">
                    <li className="py-1 hover:underline">Insulated</li>
                    <li className="py-1 hover:underline">Jackets</li>
                    <li className="py-1 hover:underline">Pants</li>
                    <li className="py-1 hover:underline" >Parkas</li>
                    <li className="py-1 hover:underline" >Rainwear</li>
                    <li className="py-1 hover:underline" >Softshell & Wind jackets</li>
                    <li className="py-1 hover:underline" >Vests</li>
                  </ul>

                  <h4 className="font-semibold mt-5" >MEN</h4>

                  <ul class="space-y-1 text-sm" >
                    <li className="py-1 hover:underline" >Insulated</li>
                    <li className="py-1 hover:underline" >jackets</li>
                    <li className="py-1 hover:underline">Pants</li>
                    <li className="py-1 hover:underline" >Parkas</li>
                    <li className="py-1 hover:underline">Rainwear</li>
                    <li className="py-1 hover:underline" >Shirt Jackets</li>
                    <li className="py-1 hover:underline" >Softshell & Wind jackets</li>
                    <li className="py-1 hover:underline" >Vests</li>
                  </ul>
                  {/* Add all other outerwear categories similarly */}
                </div>
              </div>

              {/* GEAR & HOME */}
              <div>
                <h3 className="font-bold border-b pb-2">GEAR & HOME</h3>
                <div className="pl-4">
                  <h4 className="font-semibold mt-3">FEATURED</h4>
                  <ul className="space-y-1">
                    <li className="py-1 hover:underline">Shop All Gear & Home</li>
                    <li className="py-1 hover:underline">New Arrivals</li>
                    <li className="py-1 hover:underline" >First Ascent</li>
                    <li className="py-1 hover:underline" >Sale</li>
                  </ul>


                  <h4 class="font-bold mt-4" >Special Collection</h4>

                  <ul class="space-y-1 text-sm" >
                    <li className="py-1 hover:underline" >Stanely</li>
                    <li className="py-1 hover:underline" >Travelon</li>

                  </ul>

                  <h4 className="font-semibold mt-5">PACKS & LUGGAGE</h4>
                  <ul className="space-y-1">
                    <li className="py-1 hover:underline">Backpacks</li>
                    <li className="py-1 hover:underline">Crossbody bags</li>
                    <li className="py-1 hover:underline" >Duffle & Luggage</li>
                    <li className="py-1 hover:underline" >Tote Bags</li>
                  </ul>

                  <h4 class="font-bold mt-6" >CAMPING</h4>

                  <ul class="space-y-1 text-sm">
                    <li className="py-1 hover:underline" >Chairs</li>
                    <li className="py-1 hover:underline" >Sleeping Bags</li>
                    <li className="py-1 hover:underline" >Tents</li>
                    <li className="py-1 hover:underline">Slippers</li>
                  </ul>

                  <h4 class="font-bold mt-7" >OUTDOOR ACCESSORIES</h4>

                  <ul class="space-y-1 text-sm" >
                    <li className="py-1 hover:underline" >Drinkware</li>
                    <li className="py-1 hover:underline" >Games</li>
                    <li className="py-1 hover:underline" >Lighting</li>
                    <li className="py-1 hover:underline" >Sunglasses</li>
                  </ul>

                  <h4 class="font-bold mt-8" >HOME</h4>

                  <ul class="space-y-1 text-sm" >
                    <li className="py-1 hover:underline" >Bedding</li>
                    <li className="py-1 hover:underline" >Blankets & Throws</li>
                  </ul>
                  {/* Add all other gear & home categories similarly */}
                </div>
              </div>

              {/* SHOES */}
              <div>
                <h3 className="font-bold border-b pb-2">SHOES</h3>
                <div className="pl-4">
                  <h4 className="font-semibold mt-3">FEATURED</h4>
                  <ul className="space-y-1">
                    <li className="py-1 hover:underline">Shop All Shoes</li>
                    <li className="py-1 hover:underline">New Arrivals</li>
                    <li class=" py-1 hover:underline" style={{ marginTop: "10px" }}>Sales</li>

                  </ul>

                  <h4 class="font-bold mt-4" >WOMEN</h4>

                  <ul class="space-y-1 " >
                    <li class=" py-1hover:underline" >Boots</li>
                    <li class=" py-1 hover:underline" >Hiking</li>
                    <li class=" py-1 hover:underline">Sandals</li>
                    <li class=" py-1 hover:underline">Slippers</li>
                  </ul>


                  <h4 class="font-bold mt-5" >MEN</h4>

                  <ul class="space-y-1 text-sm" >
                    <li class="py-1 hover:underline" >Boots</li>
                    <li class="py-1 hover:underline">Hiking</li>
                    <li class=" py-1 hover:underline" >Sandals</li>
                    <li class=" py-1 hover:underline" >Slippers</li>
                  </ul>
                  {/* Add all other shoes categories similarly */}
                </div>
              </div>

              {/* SALE */}
              <div>
                <h3 className="font-bold border-b pb-2 text-red-600">SALE</h3>
                <div className="pl-4">
                  <h4 className="font-semibold mt-3">BUY MORE & SAVE</h4>
                  <ul className="space-y-1">
                    <li className="py-1 hover:underline">Tops up to 30% off</li>
                    <li className="py-1 hover:underline">Socks up to 40% off</li>
                  </ul>

                  <h4 className="font-semibold mt-4">WOMEN</h4>
                  <ul className="space-y-1">
                    <li class=" py-1 hover:underline" >Accessories</li>
                    <li class="  py-1 hover:underline" >Bottom</li>
                    <li class="  py-1 hover:underline" >Outwears</li>
                    <li class="  py-1 hover:underline" >Shoes</li>
                    <li class="  py-1hover:underline" >Tops</li>
                  </ul>


                  <h4 class="font-bold mt-5">MEN</h4>

                  <ul class="space-y-1 text-sm" >
                    <li class=" py-1 hover:underline" >Accessories</li>
                    <li class=" py-1 hover:underline" >Bottom</li>
                    <li class=" py-1 hover:underline" >Outwears</li>
                    <li class=" py-1hover:underline" >Shoes</li>
                    <li class=" py-1 hover:underline" >Tops</li>
                  </ul>

                  <h4 class="font-bold mt-5" >GEAR & HOME</h4>
                  {/* Add all other sale categories similarly */}
                </div>
              </div>

              {/* CLEARANCE */}
              <div>
                <h3 className="font-bold border-b pb-2 text-red-600">CLEARANCE</h3>
                <div className="pl-4">

                  <h4 className="font-semibold mt-3">WOMEN</h4>
                  <ul className="space-y-1">
                    <li className="py-1 hover:underline">Accessories</li>
                    <li className="py-1 hover:underline">Bottom</li>
                    <li className="py-1 hover:underline">Flannel</li>
                    <li className="py-1 hover:underline">Fleece </li>
                    <li className="py-1 hover:underline">Leggings </li>
                    <li className="py-1 hover:underline">Sweaters </li>
                    <li className="py-1 hover:underline">Swimwear </li>
                    <li className="py-1 hover:underline">Outwears</li>
                    <li className="py-1 hover:underline">Pants</li>
                    <li className="py-1 hover:underline">Shirts</li>
                    <li className="py-1 hover:underline">Shoes</li>
                    <li className="py-1 hover:underline">shorts</li>
                    <li className="py-1 hover:underline">Sweatshirts</li>
                    <li className="py-1 hover:underline">Hoodies</li>
                    <li className="py-1 hover:underline">Tops</li>
                    <li className="py-1 hover:underline">T-shirts</li>
                    {/* Add all clearance items */}
                  </ul>
                  <h4 class="font-bold mt-4" >MEN</h4>

                  <ul class="space-y-1 text-sm">
                    <li className="py-1 hover:underline">Accessories</li>
                    <li className="py-1 hover:underline">Bottom</li>
                    <li className="py-1 hover:underline">Flannel</li>
                    <li className="py-1 hover:underline">Fleece </li>
                    <li className="py-1 hover:underline">Graphic T-shirts</li>
                    <li className="py-1 hover:underline">Outwears</li>
                    <li className="py-1 hover:underline">Pants</li>
                    <li className="py-1 hover:underline">Shirts</li>
                    <li className="py-1 hover:underline">Shoes</li>
                    <li className="py-1 hover:underline">shorts</li>
                    <li className="py-1 hover:underline">Sweatshirts</li>
                    <li className="py-1 hover:underline">Hoodies</li>
                    <li className="py-1 hover:underline">Tops</li>
                    <li className="py-1 hover:underline">T-shirts</li>
                  </ul>

                  <h4 class="font-bold mt-5" >GEAR & HOME</h4>

                  <ul class="space-y-1 text-sm" >
                    <li className="py-1 hover:underline">Accessories</li>
                    <li className="py-1 hover:underline">Backpack</li>

                  </ul>
                </div>
              </div>

              {/* KIDS */}
              <div>
                <h3 className="font-bold border-b pb-2">KIDS</h3>
              </div>

              {/* ABOUT US */}
              <div>
                <h3 className="font-bold border-b pb-2">ABOUT US</h3>
                <div className="pl-4">
                  <h4 className="font-semibold mt-3">WHO ARE WE</h4>
                  <ul className="space-y-1">
                    <li className="py-1 hover:underline">Awards & press</li>
                    <li className="py-1 hover:underline">Our story</li>
                  </ul>

                  <h4 className="font-semibold mt-4">BLOG</h4>
                  <ul className="space-y-1">
                    <li className="py-1 hover:underline">View All Posts</li>
                    <li className="py-1 hover:underline">Camp & Hike</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>











      </div>
    </div>


  );

}



export default Navbar

