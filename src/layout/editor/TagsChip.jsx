import React from "react";
import { IoClose } from "react-icons/io5";
const TagsChip = ({ input, handleDelete }) => {
  return (
    <span className="bg-slate-400 flex gap-1 items-center px-2 py-1 rounded">
      <span className="font-semibold robo">{input}</span>
      <span
        onClick={() => {
          handleDelete(input);
        }}
      >
        <IoClose fontSize={"1.2rem"} />
      </span>
    </span>
  );
};

export default TagsChip;
