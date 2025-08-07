const Filter = ({ filters, setFilters }) => {
    const genders = ['Men', 'Women'];
    const prices = [
      { label: 'Below $50', value: 'below50' },
      { label: '$50 - $100', value: '50to100' },
      { label: '$100-$150', value: '100to150' },
      { label: '$150-$200', value: '150to200' },
      { label: 'Above $250', value: 'above250' },
    ];
  
    const handleCheckboxChange = (type, value) => {
      setFilters(prev => {
        const alreadySelected = prev[type].includes(value);
        const updatedValues = alreadySelected
          ? prev[type].filter(item => item !== value)
          : [...prev[type], value];
        return { ...prev, [type]: updatedValues };
      });
    };
  
    return (
      <div className="w-full mb-6">
      <div className="bg-white p-4 space-y-4">
        {/* Title - matches Eddie Bauer style */}
        <h3 className="text-lg font-bold uppercase tracking-wider">Filters</h3>
        
        {/* Gender Section - now as dropdown */}
        <div>
          <h4 className="text-sm font-semibold uppercase mb-2">Gender</h4>
          <select
            className="block w-full p-2 border border-gray-300 rounded-md text-sm"
            onChange={(e) => handleCheckboxChange('gender', e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>Select Gender</option>
            {genders.map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>
        </div>
    
        {/* Price Section - dropdown */}
        <div>
          <h4 className="text-sm font-semibold uppercase mb-2">Price</h4>
          <select
            className="block w-full p-2 border border-gray-300 rounded-md text-sm"
            onChange={(e) => handleCheckboxChange('price', e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>Select Price Range</option>
            {prices.map(price => (
              <option key={price.value} value={price.value}>{price.label}</option>
            ))}
          </select>
        </div>
    
       
      </div>
    </div>
    );
  };
  
  export default Filter;
  