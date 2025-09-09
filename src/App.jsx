import { Route, Routes } from 'react-router-dom';
import './App.css';
import ScrollToTop from './Components/ScrollToTop';
import Home from './Pages/Home';
import Collection from './Pages/Collection';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import PlaceOrder from './Pages/PlaceOrder';
import Orders from './Pages/Orders';
import NotFound from './Pages/NotFound';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ScrollToTopButton from './Components/ScrollToTopButton';
import SearchBar from './Components/SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

console.log(toast);

function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <SearchBar />

      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />

        {/* 👇 Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <ScrollToTopButton /> 
    </div>
  );
}

export default App;
