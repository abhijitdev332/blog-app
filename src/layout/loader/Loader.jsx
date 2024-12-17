import React from "react";
import "ldrs/grid";

const Loader = () => {
  return (
    <div className="h-screen bg-gray-300">
      <div className="flex h-full justify-center items-center">
        <span>
          <l-grid size="60" speed="1.5" color="black"></l-grid>
        </span>
      </div>
    </div>
  );
};

export default Loader;
