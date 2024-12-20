import React, { useEffect, useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import cl from "classnames";
import { toast } from "react-toastify";

const Pagination = ({ posts, setCurrent, itemsPerPage, style }) => {
  const [currentPage, SetCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(
    Math.ceil((posts?.length || 0) / itemsPerPage)
  );

  const handleNext = () => {
    if (currentPage < totalPage) {
      SetCurrentPage(currentPage + 1);
    } else {
      toast("You are at last page");
    }
  };
  const handlePrevious = () => {
    if (currentPage > 1) {
      SetCurrentPage(currentPage - 1);
    } else {
      toast("You are at Start page");
    }
  };
  useEffect(() => {
    setTotalPage(Math.ceil((posts?.length || 0) / itemsPerPage));
    const startInx = (currentPage - 1) * itemsPerPage;
    const endInx = currentPage * itemsPerPage;
    let slicedPosts = posts?.slice(startInx, endInx);
    setCurrent(slicedPosts);
  }, [currentPage, posts]);
  return (
    <div className={cl(style, "bg-slate-300 sticky bottom-0 w-full")}>
      <div className="pagination__wrapper px-3 py-3 md:px-4 ">
        <div className="flex items-center justify-between">
          <div className="flex">
            <p className="font-semibold text-sm flex gap-1">
              <span>
                {(currentPage - 1) * itemsPerPage}-
                {currentPage * itemsPerPage > posts?.length
                  ? posts?.length
                  : currentPage * itemsPerPage}
              </span>
              OF
              <span>{posts?.length}</span>
            </p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="select__wrapper flex items-center gap-2 font-semibold text-sm">
              <SelectBoxModal
                totalPages={totalPage}
                currentPage={currentPage}
                onPageChange={SetCurrentPage}
              />
              <span>Of 0{totalPage} Pages</span>
            </div>
            <div className="btns__group flex items-center justify-between gap-2">
              <button
                className="bg-slate-400 p-1 rounded"
                onClick={handlePrevious}
              >
                <MdNavigateBefore fontSize={"1.4rem"} />
              </button>
              <button className="bg-slate-400 p-1 rounded" onClick={handleNext}>
                <MdNavigateNext fontSize={"1.4rem"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SelectBoxModal = ({ totalPages = 1, currentPage, onPageChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePageSelect = (page) => {
    onPageChange(page); // Update the current page
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div
      className="relative"
      onMouseLeave={() => {
        setIsModalOpen(false);
      }}
    >
      {/* Trigger Button */}
      <button
        onClick={() => setIsModalOpen((prev) => !prev)}
        className="bg-gray-200 text-gray-800 border border-gray-400 rounded px-4 py-2"
      >
        Page {currentPage < 10 ? `0${currentPage}` : currentPage}
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed bottom-10 right-[2rem] w-fit bg-slate-400 rounded-md border-b border-gray-300 shadow-md z-50">
          <div className="p-4">
            <h2 className="text-lg font-medium mb-4 pop">Select a Page</h2>
            <ul className="grid grid-cols-5 gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <li key={i}>
                  <button
                    onClick={() => handlePageSelect(i + 1)}
                    className={`w-full px-4 py-2 rounded text-center pop ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {i + 1 < 10 ? `0${i + 1}` : i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;
