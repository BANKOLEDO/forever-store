import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, user } = useContext(ShopContext);

  return (
    <>
      {/* Navbar fixed at top */}
      <div className="fixed top-0 left-0 w-full bg-white z-50 shadow-md">
        <div className="flex gap-4 items-center justify-between py-5 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] font-medium">
          {/* Logo */}
          <Link to="/">
            <img src={assets.logo} alt="logo" className="w-36" />
          </Link>

          {/* Nav links (hidden on small screens) */}
          <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
            {[
              { name: "HOME", path: "/" },
              { name: "COLLECTION", path: "/collection" },
              { name: "ABOUT", path: "/about" },
              { name: "CONTACT", path: "/contact" },
            ].map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="flex flex-col items-center gap-1 group relative"
              >
                <p className="transition-colors duration-300 group-hover:text-black">{link.name}</p>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            ))}
          </ul>

          {/* Icons (search, profile, cart, menu) */}
          <div className="flex items-center gap-6">
            {/* Search */}
            <Link to="/collection">
              <img
                onClick={() => setShowSearch(true)}
                src={assets.search_icon}
                alt="search"
                className="w-5 cursor-pointer"
              />
            </Link>

            {/* Profile */}
            <div className="group relative">
              {user ? (
                <p className="cursor-pointer">{user.name}</p>
              ) : (
                <Link to="/login">
                  <img src={assets.profile_icon} alt="profile" className="w-5 cursor-pointer" />
                </Link>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <img src={assets.cart_icon} alt="cart" className="w-5 min-w-5" />
              <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                {getCartCount()}
              </p>
            </Link>

            {/* Mobile menu toggle */}
            <img
              src={assets.menu_icon}
              alt="menu"
              className="w-5 cursor-pointer sm:hidden"
              onClick={() => setVisible(true)}
            />
          </div>
        </div>
      </div>

      {/* Spacer to push content below navbar */}
      <div className="h-[80px]" />

      {/* Fullscreen mobile menu */}
      {visible && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col text-gray-600 ease-in duration-300">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} alt="back" className="h-4 rotate-180" />
            <p className="font-semibold">Back</p>
          </div>

          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/">HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/collection">COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/about">ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/contact">CONTACT</NavLink>
        </div>
      )}
    </>
  );
};

export default Navbar;
