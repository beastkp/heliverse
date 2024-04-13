import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { setCards } from "../redux/card/cardSlice";
import { useDispatch } from "react-redux";

const Search = () => {
  const { cards } = useSelector((state) => state.card);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch  = useDispatch();

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/query/users?first_name=${searchQuery}`
        );
        const data = await res.json();
        console.log(data);
        dispatch(setCards(data));
      } catch (error) {
        console.log(error);
      }
    }
    fetchSearch();
  }, [searchQuery]);
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div className="w-full flex items-center gap-2 shadow-lg rounded-md p-2 bg-slate-200">
      <input
        type="text"
        placeholder="Search here"
        className="w-full bg-slate-200 active:border-none focus:outline-none"
        value={searchQuery}
        onChange={handleChange}
      />
      <FaSearch className="hover:cursor-pointer"/>
    </div>
  );
};

export default Search;
