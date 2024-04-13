import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAvailable, setDomain, setGender } from "../redux/user/userSlice";
import { setCards } from "../redux/card/cardSlice";
import Userlisting from "./Userlisting";
import { setCreateTeam } from "../redux/team/teamSlice";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Filters = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const { domain, gender, available } = useSelector((state) => state.user);
  const { createTeam } = useSelector((state) => state.team);
  const { cards } = useSelector((state) => state.card);
  const { members } = useSelector((state) => state.member);
  const [count, setCount] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    console.log("This is params", urlParams);
    const userDomain = urlParams.get("domain");
    const userGender = urlParams.get("gender");
    const userAvailability = urlParams.get("available");

    if (userDomain || userGender || userAvailability) {
      dispatch(setDomain(userDomain || ""));
      dispatch(setGender(userGender || ""));
      dispatch(setAvailable(userAvailability));
    }

    const fetchUsers = async () => {
      try {
        const searchQuery = urlParams.toString();
        console.log(urlParams);
        const res = await fetch(
          `http://localhost:3000/api/query/users?${searchQuery}&page=${page}`
        );
        const data = await res.json();
        if (data.length === 0) {
          setPage(page - 1);
        }
        dispatch(setCards(data));
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [location.search, page]);

  const handleChange = (e) => {
    if (e.target.id === "domainChange") {
      dispatch(setDomain(e.target.value));
      // console.log(e.target.value);
    }
    if (e.target.id === "genderChange") {
      dispatch(setGender(e.target.value));
      // console.log(e.target.value);
    }
    if (e.target.id === "availability") {
      dispatch(setAvailable(e.target.checked === "true" ? true : false));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("domain", domain);
    urlParams.set("gender", gender);
    urlParams.set("available", available);
    // urlParams.set("page", page);
    const searchQuery = urlParams.toString();
    Navigate(`/search?${searchQuery}`);
  };

  const handleClick = () => {
    dispatch(setCreateTeam());
  };
  const handleTeamSelection = () => {
    if (members.length > 0) {
      Navigate("/teamCreation");
    } else {
      alert("Please select atleast one user");
    }
  };

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
    <div className="flex flex-col md:flex-row gap-3 p-5 pl-0">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <h1 className="text-2xl font-semibold p-5">Filters</h1>
        <form
          action=""
          className="flex flex-col gap-5 border-b-2 p-4"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center gap-4 p-2">
            <label className="text-lg">Select Domain:</label>
            <select
              id="domainChange"
              className="border rounded-lg p-2"
              onChange={handleChange}
              // value={domain} // as state is updated the page reloads
            >
              <option value="">Select an option</option>
              <option value="Sales">Sales</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="Management">Management</option>
              <option value="UI Designing">UI Designing</option>
              <option value="Business Development">Business Development</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
          <div className="flex items-center gap-4 p-2">
            <label className="text-lg">Select Gender: </label>
            <select
              id="genderChange"
              className="border rounded-lg p-2"
              onChange={handleChange}
              // value={gender}
            >
              <option value="">Select an option</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Agender">Agender</option>
              <option value="Bigender">Bigender</option>
              <option value="Polygender">Polygender</option>
              <option value="Non-Binary">Non-Binary</option>
              <option value="Gender-Fluid">Gender-Fluid</option>
              <option value="Genderqueer">Genderqueer</option>
            </select>
          </div>
          <div className="flex items-center gap-4 p-2">
            <div className="flex gap-2">
              <span className="text-lg">Available: </span>
              <input
                type="checkbox"
                className="w-5"
                onChange={handleChange}
                id="availability"
              />
            </div>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-50 active:opacity-70">
            Search
          </button>
        </form>

        <div className="p-4">
          <button
            className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-50 active:opacity-70 w-full"
            onClick={handleClick}
          >
            Create a Team
          </button>
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-semibold p-3 text-slate-700 border-b mt-5">
          List of Users:{" "}
        </h1>
        <div className="flex justify-center items-center">
          <FaArrowLeft
            className="text-3xl mx-auto hover:cursor-pointer"
            onClick={handleLeft}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 p-2 m-2">
            {cards.map((card) => (
              <Userlisting key={card._id} user={card} />
            ))}
          </div>
          <FaArrowRight
            className="text-3xl mx-auto hover:cursor-pointer"
            onClick={handleRight}
          />
        </div>
      </div>
      <div>
        {createTeam && (
          <button
            className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-50 active:opacity-70 fixed bottom-10 right-10"
            onClick={handleTeamSelection}
          >
            Proceed
          </button>
        )}
      </div>
    </div>
  );
};
export default Filters;
