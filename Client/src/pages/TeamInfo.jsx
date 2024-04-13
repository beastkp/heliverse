import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCards } from "../redux/card/cardSlice";
import Userlisting from "../components/Userlisting";
const TeamInfo = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const { cards } = useSelector((state) => state.card);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const teamId = params.id;
      const res = await fetch(`http://localhost:3000/api/team/${teamId}`);
      const data = await res.json();
      // console.log(data.members);
      setTeamMembers(data.members);
    };
    fetchTeamMembers();
  }, [params.id]);

  useEffect(() => {
    const fetchUsers = async () => {
      teamMembers.forEach(async (member) => {
        const res = await fetch(`http://localhost:3000/api/users/${member}`);
        const data = await res.json();
        if (res.status === 200) {
          setUsers((prevUsers) => [...prevUsers, data]);
        }
      });
    };
    fetchUsers();
  }, [teamMembers]);

  useEffect(() => {
    dispatch(setCards(users));
  }, [users]);

  const handleUserInfo = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`);
      const data = await res.json();
      Navigate(`/user/${data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold p-3 text-slate-700 border-b mt-5">
        Team Info
      </h1>
      <div className="grid md:grid-cols-3 p-2 m-2 ">
        {cards.map((card) => (
          <div
            key={card._id}
            className="shadow-lg rounded-md bg-slate-200 p-3 m-2"
          >
            <Userlisting user={card} />
            <button
              className="p-2 bg-slate-700 text-white hover:bg-slate-900 "
              onClick={() => handleUserInfo(card._id)}
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamInfo;
