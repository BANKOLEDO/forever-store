import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden border rounded-lg p-4 shadow-sm h-full flex flex-col">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-full object-cover mb-2 rounded hover:scale-110 transition ease-in-out duration-500"
        />
        <p className="h-20 py-2  text-sm line-clamp-2">{name}</p>
        <p className="mt-auto text-sm font-medium">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

ProductItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.arrayOf(PropTypes.string),
  price: PropTypes.number,
};

export default ProductItem;
