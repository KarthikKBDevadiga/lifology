import React from "react";

const PreviousButton = ({ enabled, onClick }) => {
  return (
    <button
    className="absolute z-10 items-center justify-center w-8 h-8 p-0 -translate-y-1/2 bg-transparent border-0 cursor-pointer disabled:cursor-default outline-0 touch-manipulation top-1/2 fill-orange-800 disabled:opacity-30 left-6"
    onClick={onClick}
    disabled={!enabled}
  >
    <svg className="w-full h-full" viewBox="137.718 -1.001 366.563 644">
      <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
    </svg>
  </button>
  )
}

export default PreviousButton