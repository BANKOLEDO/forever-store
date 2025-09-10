import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  const [visible, setVisible] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const location = useLocation();

  // Load history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("searchHistory");
    if (stored) {
      setSearchHistory(JSON.parse(stored));
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Control visibility
  useEffect(() => {
    setVisible(location.pathname.includes("collection"));
  }, [location, showSearch]);

  const handleClose = () => {
    if (search.trim()) {
      setSearchHistory((prev) => [
        search,
        ...prev.filter((item) => item !== search), // avoid duplicates
      ]);
    }
    setSearch("");
    setShowSearch(false);
  };

  const handleClearAll = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  return visible && showSearch ? (
    <div className="border-t border-b bg-gray-50 text-center py-4">
      {/* Input */}
      <div className="inline-flex items-center justify-between border border-gray-300 rounded-md w-3/4 sm:w-1/2 px-4 py-2 bg-white shadow-sm">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none text-sm bg-transparent"
        />
        <img src={assets.search_icon} alt="search" className="w-4 ml-2" />
      </div>
      <img
        src={assets.cross_icon}
        alt="close"
        className="w-3 ml-2 inline cursor-pointer"
        onClick={handleClose}
      />

      {/* History */}
      {searchHistory.length > 0 && (
        <div className="mt-4 px-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-gray-600">
              Recent Searches
            </p>
            <button
              onClick={handleClearAll}
              className="text-xs text-red-500 hover:underline"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((item, idx) => (
              <span
                key={idx}
                onClick={() => setSearch(item)}
                className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700 cursor-pointer hover:bg-gray-200 transition"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  ) : null;
};

export default SearchBar;
