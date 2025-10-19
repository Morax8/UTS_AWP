import React, { useState, useEffect, useRef } from "react";

// --- Komponen Ikon SVG ---
const ChevronDownIcon = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);
const SortIcon = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4h13M3 8h9M3 12h9m-9 4h13m0-4v8m0 0l-4-4m4 4l4-4"
    />
  </svg>
);

function CustomDropdown({ options, selected, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Menutup dropdown saat klik di luar komponen
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleSelect = (value) => {
    onSelect(value);
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === selected);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-gray-100 border-2 border-transparent rounded-lg flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white focus:border-yellow-400"
      >
        <span className="flex items-center">
          <SortIcon />
          <span className="ml-3 text-gray-700">
            {selectedOption ? selectedOption.label : "Urutkan Berdasarkan"}
          </span>
        </span>
        <ChevronDownIcon />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 origin-top-right transition-all duration-200 ease-out transform opacity-100 scale-100">
          <div className="py-1">
            {options.map((option) => (
              <a
                key={option.value}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelect(option.value);
                }}
                className={`block px-4 py-2 text-sm ${
                  selected === option.value
                    ? "font-semibold bg-yellow-50 text-yellow-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {option.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomDropdown;
