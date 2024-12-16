import React from "react";

const Chip = ({ title, color = "crimson" }) => {
  return (
    <div className="chip">
      <div className="flex justify-center items-center">
        <div className={`rounded-full px-2 py-1`} style={{ background: color }}>
          <p className="font-semibold text-sm text-slate-50">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default Chip;
