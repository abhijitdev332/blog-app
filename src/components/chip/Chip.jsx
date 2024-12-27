import React from "react";
import { Link } from "react-router-dom";

const Chip = ({ title, color = "#11194f" }) => {
  return (
    <div className="chip">
      <div
        className={`rounded-full px-2 shadow-md shadow-[${color}]`}
        style={{ background: color }}
      >
        <span className="text-sm text-nowrap font-medium leading-loose text-slate-50 capitalize">
          <Link to={`/post/search/${title}`} className="robo">
            {title}
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Chip;
