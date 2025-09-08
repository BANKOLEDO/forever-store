import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../Components/RelatedProducts";
import { CheckCircle, Truck, RefreshCcw } from "lucide-react";
import { mockReviews } from "../assets/reviews";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productsData, setProductsData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  const fetchProductsData = () => {
    products.forEach((product) => {
      if (product._id === productId) {
        setProductsData(product);
        setImage(product.image[0]);
      }
    });
  };

  useEffect(() => {
    fetchProductsData();
  }, [productId, products]);

  return productsData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* ---------------------- Product Data ---------------------- */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* ---------------------- Product images ---------------------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* Thumbnail list */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productsData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                alt="product"
                onClick={() => setImage(item)}
                className="cursor-pointer w-[24%] sm:w-full sm:mb-3 flex-shrink-0 object-cover"
              />
            ))}
          </div>

          {/* Main image */}
          <div className="w-full sm:w-[80%]">
            <img
              src={image}
              alt="product"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* ---------------------- Product details ---------------------- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productsData.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2 text-sm text-gray-600">(122)</p>
          </div>

          {/* Price */}
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productsData.price}
          </p>

          {/* Short description */}
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productsData.description}
          </p>

          {/* Sizes */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productsData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`w-8 h-8 border bg-gray-100 flex items-center justify-center cursor-pointer
                  ${item === size ? "border-orange-500" : ""}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={() => addToCart(productsData._id, size)}
            className="bg-black text-white py-3 px-8 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />

          {/* Extra info */}
          <div className="flex flex-col gap-3 mt-5 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              <p>100% Original product</p>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-blue-600" />
              <p>Free delivery on orders above $49</p>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCcw size={16} className="text-orange-600" />
              <p>Easy return & exchange policy within 7 days</p>
            </div>
          </div>

        </div>
      </div>

      {/* ---------------------- Tabs (Description / Reviews) ---------------------- */}
      <div className="mt-10">
        {/* Tabs header */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-5 py-3 text-sm border-b-2 ${
              activeTab === "description"
                ? "border-black font-medium"
                : "border-transparent text-gray-500"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-5 py-3 text-sm border-b-2 ${
              activeTab === "reviews"
                ? "border-black font-medium"
                : "border-transparent text-gray-500"
            }`}
          >
            Reviews (122)
          </button>
        </div>

        {/* Tabs content */}
        <div className="border px-6 py-6 text-sm text-gray-600">
          {activeTab === "description" && (
            <div className="flex flex-col gap-4">
              <p>
                {productsData.description ||
                  "This product is crafted with attention to detail, offering a perfect balance of comfort, durability, and style. Designed for everyday wear, it adapts seamlessly to different occasions."}
              </p>
              <p>
                Explore our collection for more options that match your taste.
                Every item comes with a quality guarantee and easy return policy.
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="flex flex-col gap-6 max-h-[400px] overflow-y-auto pr-2">
              {mockReviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star, i) => (
                      <img
                        key={i}
                        src={i < review.rating ? assets.star_icon : assets.star_dull_icon}
                        alt="star"
                        className="w-3"  
                      />
                    ))}
                    <span className="ml-2 text-xs text-gray-500">by {review.name}</span>
                </div>
                <p className="mt-2 text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>

      {/* ---------------------- Related Products ---------------------- */}
      <RelatedProducts
        category={productsData.category}
        subCategory={productsData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
