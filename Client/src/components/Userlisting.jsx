import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMembers } from "../redux/members/memberSlice";

const Userlisting = ({ user }) => {
  const { members } = useSelector((state) => state.member);
  const dispatch = useDispatch();
  const { createTeam } = useSelector((state) => state.team);
  const addUser = () => {
    dispatch(setMembers(members.concat(user._id)));
  };
  const removeUser = () => {
    dispatch(setMembers(members.filter((id) => id !== user._id)));
  };
  return (
    <div
      className={`flex items-center flex-col gap-2 shadow-xl p-3 m-3 rounded-lg transition duration-300 hover:scale-110 w-50 delay-50 ${
        members.includes(user._id) ? `dark:bg-gray-500` : ""
      }`}
    >
      <div className="p-5">
        <img
          src={user.avatar}
          alt="No Image Available"
          className="w-20 h-20 transition duration-300 hover:scale-125 bg-slate-200 rounded-full "
        />
      </div>
      <div className="flex flex-col gap-2 text-center p-3 m-3">
        <div className="flex items-center gap-1 justify-center">
          <span className="text-lg font-semibold text-slate-700 h-10">
            {user.first_name}{" "}
          </span>
          <span className="text-lg font-semibold text-slate-700 h-10">
            {user.last_name}
          </span>
        </div>
        <div className="flex items-center gap-4 flex-col">
          <p className="text-slate-700 p-2 m-2 h-10 text-center">
            {user.domain}
          </p>
          {createTeam && (
            <div>
              {members.includes(user._id) ? (
                <button
                  className="bg-red-500 text-white p-3 rounded-lg hover:opacity-50 active:opacity-70 w-24 text-center"
                  id="removeBtn"
                  onClick={removeUser}
                >
                  Remove
                </button>
              ) : (
                <button
                  className="bg-blue-500 text-white p-3 rounded-lg hover:opacity-50 active:opacity-70 w-24 text-center"
                  onClick={addUser}
                >
                  Add
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Userlisting;
