import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

const SearchInputWithSuggestions = ({
  searchQuery,
  setSearchQuery,
  searchSuggestions,
  onSearch,
  onLocationSelect,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
    setShowSuggestions(query.length > 0);
  };

  const handleLocationClick = (location) => {
    onLocationSelect(location);
    setSearchQuery(''); // Clear search query after selection
    setShowSuggestions(false);
  };

  return (
    <div className="relative flex-1 max-w-md w-full">
      <Input
        icon="Search"
        type="text"
        placeholder="Search for a city..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        onFocus={() => setShowSuggestions(searchQuery.length > 0)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
      />
      
      <AnimatePresence>
        {showSuggestions && searchSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full glass-effect rounded-lg overflow-hidden z-10"
          >
            {searchSuggestions.map((location, index) => (
              <Button
                key={`${location.city}-${location.country}-${index}`}
                onClick={() => handleLocationClick(location)}
                className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0 justify-start"
              >
<div className="flex items-center justify-between w-full">
                  <span className="text-stone-800 font-medium">{location.city}</span>
                  <span className="text-stone-600 text-sm">{location.country}</span>
                </div>
              </Button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchInputWithSuggestions;