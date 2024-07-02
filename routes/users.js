const { getUsers, register, login } = require("../controllers/user");
const checkAuth = require('../middlewares/check-auth');
const checkIsAdmin = require('../middlewares/checkIsAdmin');

const router = require("express").Router();

router.get("/", checkAuth, checkIsAdmin, getUsers);
router.post("/register", register);
router.post("/login", login);

module.exports = router;