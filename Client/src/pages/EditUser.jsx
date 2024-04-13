import React, { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { app } from "../firebase";
import { useNavigate,useParams } from "react-router-dom";

const EditUser = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [formdata, setFormdata] = useState({});
  useEffect(() => {
      const getchUserInfo = async ()=>{
        const res = await fetch(`http://localhost:3000/api/users/${params.id}`);
        const data = await res.json();
        setFormdata(data);
      }
      getchUserInfo();
  },[]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/users/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
        withCredentials: true,
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        console.log("User Updated Successfully");
        navigate("/viewTeams");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageSubmit = () => {
    console.log(file.name);
    storeImage(file)
      .then((url) => {
        setImageUrl(url);
        setFormdata({ ...formdata, avatar: url });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const timestamp = new Date().getTime().toString(); // Convert timestamp to string
      const fileName = timestamp + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
            console.log(downloadURL);
          });
        }
      );
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "domain") {
      setFormdata({ ...formdata, domain: e.target.value });
    }
    if (e.target.id === "gender") {
      setFormdata({ ...formdata, gender: e.target.value });
    }
    if (e.target.id === "availability") {
      setFormdata({ ...formdata, [e.target.id]: e.target.checked });
    }
    if (e.target.id === "firstName") {
      setFormdata({ ...formdata, first_name: e.target.value });
    }
    if (e.target.id === "lastName") {
      setFormdata({ ...formdata, last_name: e.target.value });
    }
    if (e.target.id === "email") {
      setFormdata({ ...formdata, email: e.target.value });
    }
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center p-5 m-5 border-b-2 gap-3">
          <img
            src={imageUrl}
            alt="No Profile Image"
            className=" bg-slate-300 m-2 rounded-full w-20 h-20"
          />
          <input
            type="file"
            className="p-3 border border-gray-300 w-full rounded"
            id="images"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            className="p-3 text-green-700 border border-green-700 hover:shadow-lg"
            type="button"
            onClick={handleImageSubmit}
          >
            Upload
          </button>
        </div>
        <div className="flex">
          <div className="flex flex-col gap-2 m-5 p-5">
            <label className="text-start">Enter First Name: </label>
            <input
              className="shadow-lg rounded-lg  p-2 m-2"
              type="text"
              placeholder="Enter First Name"
              id="firstName"
              value={formdata.first_name}
              onChange={handleChange}
            />
            <label className="text-start">Enter Last Name: </label>
            <input
              type="text"
              className="shadow-lg rounded-lg p-2 m-2"
              placeholder="Enter Last Name"
              id="lastName"
              value={formdata.last_name}
              onChange={handleChange}
            />
            <label className="text-start">Enter Email: </label>
            <input
              type="text"
              className="shadow-lg rounded-lg p-2 m-2"
              placeholder="Enter Email"
              id="email"
              value={formdata.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2 m-5 p-5">
            <label className="text-start">Enter Domain: </label>
            <input
              type="text"
              className="shadow-lg rounded-lg p-2 m-2"
              placeholder="Enter Domain"
              id="domain"
              value={formdata.domain}
              onChange={handleChange}
            />
            <label className="text-start">Enter Gender: </label>
            <input
              type="text"
              className="shadow-lg rounded-lg  p-2 m-2"
              placeholder="Enter Gender"
              id="gender"
              value={formdata.gender}
              onChange={handleChange}
            />
            <div className="flex gap-2">
              <label className="text-start">Available: </label>
              <input
                type="checkbox"
                className="shadow-lg rounded-lg w-5"
                id="available"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center md:w-1/3 mx-auto">
          <button className="bg-green-700 text-white p-3 rounded-lg hover:opacity-50 active:opacity-70 hover:bg-green-500 md:w-32 w-24 m-2 mx-auto">
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
