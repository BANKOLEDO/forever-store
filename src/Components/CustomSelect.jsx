import { useState } from "react";
import { ChevronDown } from "lucide-react";
import PropTypes from "prop-types"; // <-- import PropTypes

const CustomSelect = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const options = [
    { value: "relevant", label: "Sort by: Relevant" },
    { value: "low-high", label: "Sort by: Low to High" },
    { value: "high-low", label: "Sort by: High to Low" },
  ];

  const handleSelect = (val) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <div className="relative inline-block w-31">
      {/* Select Box */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between border border-gray-300 px-4 py-2 rounded-md bg-white cursor-pointer focus:ring-2 focus:ring-black"
      >
        <span className="text-sm">
          {options.find((o) => o.value === value)?.label}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown Options */}
      {open && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                value === opt.value ? "bg-gray-50 font-medium" : ""
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Add PropTypes validation
CustomSelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomSelect;
