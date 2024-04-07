import React from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Team = () => {
    const Navigate = useNavigate();
    const {members} = useSelector((state) => state.member);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const teamName = document.getElementById("teamName").value;
    if (teamName === "") {
      alert("Please Enter Team Name");
    }
    const res = await fetch("http://localhost:3000/api/team", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: teamName,
        members: members
      }),
    })
    const data = await res.json();
    console.log(data);
    Navigate(`/viewTeams`)
  };
  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <div className="md:w-1/3">
        <form action="" className="flex flex-col gap-7" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-lg text-left">Enter Team Name: </label>
            <input
              type="text"
              className="border rounded-lg p-2 focus:outline-none"
              placeholder="Team Name"
              id="teamName"
            />
          </div>
          <button className="bg-green-700 text-white p-3 rounded-lg hover:opacity-50 active:opacity-70 hover:bg-green-500">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Team;
