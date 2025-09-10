import PropTypes from "prop-types";

const Marquee = ({ items, speed = 15 }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-black text-white py-2 mt-2">
      <div
        className="flex animate-marquee"
        style={{
          display: "inline-flex",
        }}
      >
        {[...items, ...items].map((item, index) => (
          <span
            key={index}
            className="mx-8 text-sm font-medium text-white"
          >
            {item}
          </span>
        ))}
      </div>

      <style>{`
        .animate-marquee {
          animation: marquee ${speed}s linear infinite;
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
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  speed: PropTypes.number, // in seconds
};

export default Marquee;
