import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [product, setproduct] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  const fetchProduct = () => {
    setloading(true);
    seterror(null);
    axios.get(`https://mock-eddie.onrender.com/Best-seller`)
      .then((response) => {
        setproduct(response.data); // ✅ correct use
        setloading(false);
      })
      .catch(() => {
        seterror('Something went wrong');
        setloading(false);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="relative z-0">
    {/* First Banner */}
    <div className="relative w-full" style={{ marginTop: '150px', maxWidth: '100%' }}>
      <img
        src="https://assets.eddiebauer.com/m/592f8f4de44ff406/original/250501_hp_flash-sale_V1.jpg"
        alt=""
        className="w-full object-cover"
      />
      <div className="absolute inset-0 flex justify-center items-center mt-10 md:mt-20 lg:mt-44">
        <Link to="/topseller"> 
          <button className="px-4 py-1 md:px-6 md:py-2 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition text-sm md:text-base">
            SHOP NOW
          </button>
        </Link>
      </div>
    </div>
  
    {/* Headline and Grid */}
    <div className="flex flex-col items-center justify-center mt-6 md:mt-10 px-4">
      <h1 className="text-xl md:text-2xl font-bold mb-4 text-center">Shop Warm-Weather Must-Haves</h1>
  
      {/* Static Images Row - Made responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 w-full max-w-6xl">
        {/* Jackets */}
        <div className="relative w-full h-64 md:h-80">
          <img
            src="https://assets.eddiebauer.com/transform/a8/0958f884-62a0-48ca-a7a4-5a36e1975621/250430_hp_jackets_V1"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute top-48 md:top-60 left-2 text-white font-semibold px-2 py-1 rounded">
            Lightweight Outerwear
          </div>
          <Link to="/jacket">
            <div className="absolute bottom-2 left-2 text-white font-medium px-2 py-1 rounded hover:underline cursor-pointer">
              Shop Jackets
            </div>
          </Link>
        </div>
  
        {/* Dresses */}
        <div className="relative w-full h-64 md:h-80">
          <img
            src="https://assets.eddiebauer.com/transform/a8/b4e0c20d-9189-4c3f-995b-2e15f065382c/250423_hp_dresses_V1"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute top-48 md:top-60 left-2 text-white font-semibold px-2 py-1 rounded">
            One & Done Favourite Dresses
          </div>
          <Link to="/dresses">
            <div className="absolute bottom-2 left-2 text-white font-medium px-2 py-1 rounded hover:underline cursor-pointer">
              Shop Dresses
            </div>
          </Link>
        </div>
      </div>
    </div>
  
    {/* Shop Men/Women Section */}
    <div className="relative w-full mt-6 md:mt-10">
      <img
        src="https://assets.eddiebauer.com/m/145ef45cffc35b8f/original/250430_hp_bottoms-promo_V2.jpg"
        alt=""
        className="w-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-3 sm:gap-4 mt-20 sm:mt-32 md:mt-[100px] lg:mt-[200px] sm:ms-10 md:ms-[80px] lg:ms-[120px]">
        <Link to="/shopmen">
          <button className="px-4 py-1 md:px-6 md:py-2 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition text-sm md:text-base">
            Shop Men
          </button>
        </Link>   
        <Link to="/shopwomen">
          <button className="px-4 py-1 md:px-6 md:py-2 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition text-sm md:text-base">
            Shop Women
          </button>
        </Link>   
      </div>
    </div>
  
    {/* Second Static Section */}
    <div className="flex flex-col items-center justify-center mt-6 md:mt-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 w-full max-w-6xl">
        {/* Beach */}
        <div className="relative w-full h-64 md:h-80">
          <img
            src="https://assets.eddiebauer.com/transform/a8/18f9faa1-2b90-4620-a3f6-766f97e96ec0/250430_hp_beach_V1"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute top-48 md:top-60 left-2 text-white font-semibold px-2 py-1 rounded">
            Summer Essentials
          </div>
          <Link to="/swim">
            <div className="absolute bottom-2 left-2 text-white font-medium px-2 py-1 rounded hover:underline cursor-pointer">
              Shop Swim & Beach Gear
            </div>
          </Link>
        </div>
  
        {/* Tees */}
        <div className="relative w-full h-64 md:h-80">
          <img
            src="https://assets.eddiebauer.com/transform/a8/bd3f8f45-f6fc-40e5-a6d3-aa79dfdce0bd/250430_hp_t-shirts_V1"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute top-48 md:top-60 left-2 text-white font-semibold px-2 py-1 rounded">
            Must-Have Tees
          </div>
          <Link to="/tshirts">
            <div className="absolute bottom-2 left-2 text-white font-medium px-2 py-1 rounded hover:underline cursor-pointer">
              SHOP T-Shirts
            </div>
          </Link>
        </div>
      </div>
    </div>
  
    {/* Dynamic Product Grid */}
    <div className="mt-10 md:mt-16 px-4 md:px-6">
      <h2 className="text-xl md:text-2xl font-bold text-start mb-4 md:mb-6">Best Sellers</h2>
  
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
          {product.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden p-3 md:p-4"
            >
              <Link to={`/product/Best-seller/${item.id}`}>
                <img
                  src={item.mainImage}
                  alt={item.title}
                  className="w-full h-48 md:h-64 object-cover rounded-lg"
                />
              </Link>
             
              <div className="mt-3 md:mt-4 space-y-1 md:space-y-2">
                <h2 className="font-semibold text-gray-800 text-sm md:text-base">{item.title}</h2>
                <p className="text-lg md:text-xl text-gray-10">
                  ${item.price.toFixed(2)}
                </p>
                <p className="text-xs md:text-sm text-red-600">{item.offer}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  
    
  </div>
  );
};

export default Home;
