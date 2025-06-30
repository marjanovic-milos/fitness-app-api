const express = require("express");
const { signup, login, getMe } = require("../controllers/authController");

const { protect } = require("../middleware/auth");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.use(protect);

router.get("/getMe", getMe);

module.exports = router;
