import React, { useEffect,useState } from 'react'
import {useNavigate, useParams} from "react-router-dom";
import { setCards } from '../redux/card/cardSlice';
import {useSelector} from "react-redux";

const UserInfo = () => {
    const params = useParams();
    const Navigate = useNavigate();
    
    const [info,setInfo] = useState({});
    const {cards} = useSelector((state) => state.card);
    useEffect(() => {
        const fetchUserInfo = async () => {
            const res = await fetch(`http://localhost:3000/api/users/${params.id}`);
            const data = await res.json();
            setInfo(data);
        }
        fetchUserInfo();
    },[params.id])

    const handleDelete = async()=>{
        try {
            const userId = params.id;
            const res = await fetch(`http://localhost:3000/api/users/${userId}`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                },
            });
            const data = await res.json();
            if(res.status === 200){
                console.log("User Successfully Deleted");
                setCards(cards.filter(card=>card._id !== data._id));
                Navigate('/');
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = async ()=>{
      try {
        Navigate(`/editUser/${params.id}`);
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <div className="flex flex-col ">
      <h1 className="text-4xl font-semibold p-3 text-slate-700 border-b">
        User Info
      </h1>
      <div className="flex justify-center items-center p-5 m-5">
        <img
          src={info.avatar}
          alt="No Profile Image"
          className="w-32 rounded-full bg-slate-300"
        />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-semibold p-2">
          {info.first_name} {info.last_name}
        </h1>
        <h1 className="text-xl font-semibold p-2">Gender: {info.gender}</h1>
        <h1 className="text-xl font-semibold p-2">Email: {info.email}</h1>
        <h1 className="text-xl font-semibold p-2">Domain: {info.domain}</h1>
        {info.available ? (
          <h1 className="text-green-500 text-xl font-semibold p-2">
            Available
          </h1>
        ) : (
          <h1 className="text-red-500 text-xl font-semibold p-2">
            Not Available
          </h1>
        )}
      </div>
      <div className='flex justify-between items-center md:w-1/3 mx-auto'>
        <button className='bg-green-700 text-white p-3 rounded-lg hover:opacity-50 active:opacity-70 hover:bg-green-500 md:w-32 w-24 m-2' onClick={handleEdit}>Edit</button>
        <button className='bg-red-700 text-white p-3 rounded-lg hover:opacity-50 active:opacity-70 hover:bg-red-500 md:w-32 m-2 w-24' onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default UserInfo