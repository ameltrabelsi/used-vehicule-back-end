const { getUsers, register, login } = require("../controllers/user");

const router = require("express").Router();

router.get("/", getUsers);
router.post("/", register);
router.post("/login", login);

module.exports = router;