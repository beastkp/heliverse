const User = require("../models/User");

const filterUsers = async (req, res) => {
  let { page, pageSize, ...rest } = req.query;
  page = parseInt(req.query.page) | 1;
  pageSize = parseInt(req.query.pageSize) || 12;
  try {
    const users = await User.find(rest)
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { filterUsers };
