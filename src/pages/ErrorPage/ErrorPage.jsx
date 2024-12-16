import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="wrapper h-screen">
      <div className="lg:container lg:mx-auto flex justify-center items-center h-full">
        <div className="card bg-green-100 p-10 rounded-md flex flex-col items-center">
          <div
            style={{
              width: "100%",
              height: "60%",
              paddingBottom: "120%",
              position: "relative",
            }}
          >
            <iframe
              src="https://giphy.com/embed/l4KhKRcaYb43LVqq4"
              width="100%"
              height="100%"
              style={{ position: "absolute" }}
              frameBorder="0"
              className="giphy-embed rounded-md"
              allowFullScreen
            ></iframe>
          </div>

          <p className="py-4">Something Went wrong!!</p>
          <button className="bg-indigo-400 p-3 rounded-md text-lg font-semibold text-slate-50 text-center">
            <Link to={"/"} replace={true}>
              Go back
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
