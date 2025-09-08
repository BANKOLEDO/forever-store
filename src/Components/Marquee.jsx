import PropTypes from "prop-types";

const Marquee = ({ items }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-black text-white py-2 mt-2">
      <div className="inline-block animate-marquee">
        {items.map((item, index) => (
          <span key={index} className="mx-8 text-sm font-medium text-white">
            {item}
          </span>
        ))}
        {/* Duplicate items to make the loop seamless */}
        {items.map((item, index) => (
          <span key={`dup-${index}`} className="mx-8 text-sm font-medium text-white">
            {item}
          </span>
        ))}
      </div>

      <style>{`
        .animate-marquee {
          display: inline-block;
          padding-left: 100%;
          animation: marquee 15s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

Marquee.propTypes = {
  items: PropTypes.string,
};

export default Marquee;
