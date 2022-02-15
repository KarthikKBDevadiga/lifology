import React from "react";

const NextButton = ({ enabled, onClick }) => {
  return (
    <button
    className="absolute z-10 items-center justify-center w-8 h-8 p-0 -translate-y-1/2 bg-transparent border-0 cursor-pointer disabled:cursor-default outline-0 touch-manipulation top-1/2 fill-orange-800 disabled:opacity-30 right-6"
    onClick={onClick}
    disabled={!enabled}
  >
    <svg className="w-full h-full" viewBox="0 0 238.003 238.003">
      <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
    </svg>
  </button>
  )
}

export default NextButton