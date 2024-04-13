import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Userlisting from "../components/Userlisting";
import { useSelector, useDispatch } from "react-redux";
import { setCards } from "../redux/card/cardSlice";
import { Link } from "react-router-dom";

const PreHome = () => {
  const { cards } = useSelector((state) => state.card);
  const dispatch = useDispatch();
  const [count,setCount] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`http://localhost:3000/api/users?page=${page}`);
      const data = await res.json();
      console.log(data);
      dispatch(setCards(data));
    };
    fetchUsers();
  }, [page,count]);
  const handleLeft = () => {
    if (count === 1) {
      return;
    } else {
      setCount(count - 1);
      setPage(count - 1);
    }
  };

  const handleRight = () => {
    setCount(count + 1);
    setPage(count + 1);
    console.log(count + 1);
  };
  return (
    <div>
      <div className="border-b mt-5">
        <h1 className="text-4xl font-semibold p-3 text-slate-700 ">Users</h1>
      </div>
      <div className="md:absolute right-6 top-6 p-3 ">
        <Link to={"/createUser"}>
          <button className="bg-slate-700 p-2 text-white rounded-md w-26 m-2 hover:bg-slate-400">
            Create User
          </button>
        </Link>
        <Link className="" to={"/search"}>
          <button className="bg-slate-700 text-white p-2 rounded-md w-26 m-2 hover:bg-slate-400">
            Search
          </button>
        </Link>
        <Link to={"/viewTeams"}>
          <button className="bg-slate-700 text-white p-2 rounded-md w-26 m-2 hover:bg-slate-400">
            View Teams
          </button>
        </Link>
      </div>
      <div className="flex justify-center md:items-center items-end">
        <FaArrowLeft  className="text-3xl mx-auto hover:cursor-pointer  " onClick={handleLeft}/>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 p-2 m-2 w-2/3">
          {cards.length > 0 &&
            cards.map((user) => {
              return (
                <Link to={`/user/${user._id}`} key={user._id}>
                  <Userlisting user={user} />
                </Link>
              );
            })}
        </div>
        <FaArrowRight className="text-3xl mx-auto hover:cursor-pointer" onClick={handleRight} />
      </div>
    </div>
  );
};

export default PreHome;
