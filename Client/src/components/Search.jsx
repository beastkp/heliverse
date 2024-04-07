import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div className="w-full flex items-center gap-2 shadow-lg rounded-md p-2 bg-slate-200">
      <input
        type="text"
        placeholder="Search here"
        className="w-full bg-slate-200 active:border-none focus:outline-none"
      />
      <FaSearch />
    </div>
  );
};

export default Search;
