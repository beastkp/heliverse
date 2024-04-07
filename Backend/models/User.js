const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
  id: {
    type: Number,
  },
  first_name: {
    type: String,
    required: [true, "Please provide first_name"],
  },
  last_name: {
    type: String,
    required: [true, "Please provide last_name"],
  },
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  gender: {
    type: String,
    required: [true, "Please provide gender"],
  },
  avatar: {
    type: String,
    required: [true, "Please provide avatar"],
  },
  domain: {
    type: String,
    required: [true, "Please provide domain"],
  },
  available: {
    type: Boolean,
    default: true,
  },
});

const User = mongoose.model("User", Userschema);

module.exports = User;
