const User = require("../models/User");

const filterUsers = async (req, res) => {
  let { page, pageSize, ...rest } = req.query;
  page = parseInt(req.query.page) | 1;
  pageSize = parseInt(req.query.pageSize) || 12;
  try {
    const lowercaseRest = Object.keys(rest).reduce((acc, key) => {
      if (key === "first_name") {
        acc[key] = { $regex: new RegExp(rest[key], "i") }; // Case-insensitive regex
      } else {
        acc[key] = rest[key];
      }
      return acc;
    }, {});
    const users = await User.find(lowercaseRest)
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
module.exports = { filterUsers };
