const catchAsync = require("../middleware/async");
const User = require("../models/User");

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  return res.status(200).json({ user });
});
