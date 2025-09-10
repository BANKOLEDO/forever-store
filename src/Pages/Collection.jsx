import { useContext, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../Components/Title";
import ProductItem from "../Components/ProductItem";
import CustomSelect from "../Components/CustomSelect";

// =======================
// Levenshtein Distance Helper
// =======================
const levenshteinDistance = (str1, str2) => {
  const distanceMatrix = Array.from({ length: str1.length + 1 }, () =>
    Array(str2.length + 1).fill(0)
  );

  for (let i = 0; i <= str1.length; i++) distanceMatrix[i][0] = i;
  for (let j = 0; j <= str2.length; j++) distanceMatrix[0][j] = j;

  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        distanceMatrix[i][j] = distanceMatrix[i - 1][j - 1];
      } else {
        distanceMatrix[i][j] =
          1 +
          Math.min(
            distanceMatrix[i - 1][j],     // deletion
            distanceMatrix[i][j - 1],     // insertion
            distanceMatrix[i - 1][j - 1]  // substitution
          );
      }
    }
  }

  return distanceMatrix[str1.length][str2.length];
};

// =======================
// Fuzzy Search Suggestion
// =======================
const getClosestMatch = (search, products) => {
  if (!search || products.length === 0) return null;
  const term = search.toLowerCase().trim();

  let closest = null;
  let minDistance = Infinity;

  for (const product of products) {
    const nameWords = product.name.toLowerCase().split(" ");

    // Compare search against each word in the product name
    for (const word of nameWords) {
      const distance = levenshteinDistance(term, word);
      if (distance < minDistance) {
        minDistance = distance;
        closest = product.name;
      }
    }
  }

  // Only suggest if reasonably close
  return minDistance <= Math.floor(term.length / 2) ? closest : null;
};

// =======================
// Simulate Fetch
// =======================
const fetchProducts = async (products) =>
  new Promise((resolve) => setTimeout(() => resolve(products), 300));

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(products),
    enabled: !!products,
  });

  // =======================
  // Filter + Sort
  // =======================
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((item) =>
        showSearch && search
          ? item.name.toLowerCase().includes(search.toLowerCase().trim())
          : true
      )
      .filter((item) => (category.length ? category.includes(item.category) : true))
      .filter((item) =>
        subCategory.length ? subCategory.includes(item.subCategory) : true
      )
      .sort((a, b) => {
        if (sortType === "low-high") return a.price - b.price;
        if (sortType === "high-low") return b.price - a.price;
        return 0;
      });
  }, [allProducts, search, showSearch, category, subCategory, sortType]);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  const closestMatch = getClosestMatch(search, allProducts);

  return (
    <div className="flex flex-col md:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Sidebar */}
      <div className="min-w-52">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt=""
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Men", "Women", "Kids"].map((cat) => (
              <label key={cat} className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={cat}
                  onChange={toggleCategory}
                  checked={category.includes(cat)}
                />
                {cat.toUpperCase()}
              </label>
            ))}
          </div>
        </div>

        {/* Sub Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
              <label key={sub} className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={sub}
                  onChange={toggleSubCategory}
                  checked={subCategory.includes(sub)}
                />
                {sub.toUpperCase()}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="flex-1">
        <div className="relative py-1 flex px-2 justify-between text-xs sm:text-xl lg:text-2xl mb-4">
          <Title style={"text-xs md:text-lg"} text1={"ALL"} text2={"COLLECTIONS"} />
          <CustomSelect value={sortType} onChange={setSortType} />
        </div>

        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <img
              src={assets.search_icon}
              alt="no results"
              className="w-8 mb-3 opacity-60"
            />
            <p className="text-sm font-medium">No products found</p>
            {search && (
              <p className="text-xs text-gray-400 mt-1">
                We couldn’t find anything for <span className="font-semibold">{search}</span>
              </p>
            )}
            {closestMatch && (
              <p className="text-xs text-gray-400 mt-1">
                Did you mean: <span className="font-semibold">{closestMatch}</span>?
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6">
            {filteredProducts.map((product) => (
              <ProductItem
                key={product._id}
                id={product._id}
                image={product.image}
                name={product.name}
                price={product.price}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
