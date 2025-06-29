const catchAsync = require("../middleware/async");
const { recepies } = require("../utils/recepiesApi");

exports.createMeal = catchAsync(async (req, res, next) => {
  const response = await recepies({
    minCarbs: 10,
    maxCarbs: 100,
    minProtein: 10,
    maxProtein: 100,
  });

  console.log("Response from recepies API:", response);
  res.status(201).json({
    status: "success",
    data: response,
  });
});
