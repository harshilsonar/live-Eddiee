import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Filter from '../components/Filter';

const Topseller = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
    const [filters, setFilters] = useState({ gender: [], price: [] });
        const [sortOrder, setSortOrder] = useState("");
    
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';  // Fetch the search query from URL

  // Fetching the products
  const fetchProduct = () => {
    setLoading(true);
    setError(null);
    axios
      .get('https://mock-eddie.onrender.com/Topselling')
      .then((response) => {
        const updated = response.data.map((item) => ({
          ...item,
          selectedImage: item.mainImage,
        }));
        setProduct(updated);
        setLoading(false);
      })
      .catch(() => {
        setError('Something went wrong');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // Filtering products based on the search query
  const filterByPrice = (priceRange, actualPrice) => {
    if (priceRange === 'below50') return actualPrice < 50;
    if (priceRange === '50to100') return actualPrice >= 50 && actualPrice <= 100;
    if (priceRange === '100to150') return actualPrice > 100 && actualPrice <= 150;
    if (priceRange === '150to200') return actualPrice > 150 && actualPrice <= 200;
    if (priceRange === 'above250') return actualPrice > 250;
    return true;
  };

  // Apply gender and price filters
  const filteredProducts = product
  .filter((item) => {
    const gender = item.title.includes("Women's") ? 'Women' : item.title.includes("Men's") ? 'Men' : '';
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGender = filters.gender?.length === 0 || filters.gender.includes(gender);
    const matchesPrice = filters.price?.length === 0 || filters.price.some(priceRange => filterByPrice(priceRange, item.priceSale));
    return matchesSearch && matchesGender && matchesPrice;
  })
  .sort((a, b) => {
    if (sortOrder === "asc") return a.priceSale - b.priceSale;
    if (sortOrder === "desc") return b.priceSale - a.priceSale;
    return 0;
  });

  // Handling the swatch click to change image
  const handleSwatchClick = (index, swatchUrl) => {
    const updated = [...product];
    updated[index].selectedImage = swatchUrl;
    setProduct(updated);
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-600 py-10">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-25">
    <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Topselling</h1>
    
    <div className="flex flex-col sm:flex-row gap-4 mb-4 sm:mb-6">
      {/* Filters section - will appear above products on mobile */}
      <div className="sm:hidden w-full">
        <Filter filters={filters} setFilters={setFilters} mobile />
      </div>
      
      {/* Sort dropdown */}
      <div className="w-full sm:w-auto ml-auto">
        <select
          className="border border-gray-300 rounded px-3 py-1 w-full sm:w-auto"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
    </div>
    
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Filters - hidden on mobile (shown above) */}
      <div className="hidden sm:block w-full lg:w-1/4">
        <Filter filters={filters} setFilters={setFilters} />
      </div>
      
      {/* Products grid */}
      <div className="w-full lg:w-3/4">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {filteredProducts.map((item, index) => (
            <div key={item.id} className="bg-white border rounded-lg p-3 sm:p-4 shadow text-center hover:shadow-md transition-shadow">
              <Link to={`/product/Topselling/${item.id}`}>
                <img 
                  src={item.selectedImage} 
                  alt={item.title} 
                  className="w-full h-[150px] sm:h-[200px] object-contain mx-auto" 
                />
              </Link>
              <div className="flex justify-center flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3">
                {item.swatches.map((swatch, i) => (
                  <img
                    key={i}
                    src={swatch}
                    alt={`swatch-${i}`}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-gray-300 cursor-pointer hover:border-gray-500"
                    onClick={() => handleSwatchClick(index, swatch)}
                  />
                ))}
              </div>
              {item.tags?.[0] && <div className="text-xs text-red-600 mt-1 sm:mt-2">{item.tags[0]}</div>}
              <h2 className="mt-1 text-sm font-medium text-gray-800 line-clamp-1">{item.title}</h2>
              <div className="text-sm mt-1">
                {item.priceOriginal !== item.priceSale && (
                  <span className="line-through text-gray-400 mr-1">${item.priceOriginal}</span>
                )}
                <span className="text-green-700 font-semibold">${item.priceSale}</span>
              </div>
              {item.rating > 0 && (
                <div className="text-sm text-yellow-500 mt-1">
                  {'★'.repeat(Math.floor(item.rating))}{'☆'.repeat(5 - Math.floor(item.rating))}
                  <span className="text-gray-500 ml-1">({item.ratingCount})</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Topseller;
