import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewTeams = () => {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    const fetchTeams = async () => {
        const res = await fetch("http://localhost:3000/api/team");
        const data = await res.json();
        console.log(data);
        setTeams(data);
        
    }
    fetchTeams();
  }, []);
  return (
    <>
      <h1 className="text-4xl font-semibold p-3 text-slate-700 border-b mt-5">
        List of Teams
      </h1>
      <div className="flex items-center justify-around flex-wrap p-5 m-2">
        {teams.map((team) => (
          <Link
            to={`/team/${team._id}`}
            key={team._id}
            className="relative flex flex-col gap-5 m-3 p-5 shadow-xl rounded-md w-1/4 bg-slate-400 hover:bg-slate-200 delay-50 duration-150 hover:scale-105"
          >
            <div key={team._id} >
              <h1 className="text-2xl font-semibold">{team.name}</h1>
              <p className="text-lg">{team.members.length} Members</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-50 transition-opacity">
              <p className="text-white">View Team Info</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ViewTeams;
