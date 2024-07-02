const router = require("express").Router();
const { register, login, getAllUser } = require("../controller/userController");
const { checkAuth } = require("../services/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/getAllUser", checkAuth, getAllUser);

module.exports = router;
