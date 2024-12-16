import React from "react";

const Loader = () => {
  return (
    <div className="h-screen bg-gray-300">
      <div className="flex h-full justify-center items-center">
        <span className="text-teal-400">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
