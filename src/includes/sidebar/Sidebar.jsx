import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__wrapper lg:container lg:mx-auto">
        <div className="flex">
          <div className="logo">Logo</div>
          <ul className="flex flex-col gap-3">
            <li>
              <Link>Dashbroad</Link>
            </li>
            <li>
              <Link>Posts</Link>
            </li>
            <li>
              <Link>Users</Link>
            </li>
            <li>
              <Link>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
