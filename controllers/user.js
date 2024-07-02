const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidator, loginValidator } = require("../Utilities/Validator");

const getUsers = async (req,res) =>{
    try {
        const users = await User.find().select('-password');
        return res.json(users);
    } catch (error) {
        console.log(error);
        return res.json(error);
      }
};


const register = async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const validationResult = registerValidator.validate(req.body, {
        abortEarly: false,
      });
      if (validationResult.error) {
        return res.json(validationResult.error);
      }
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res
          .status(401)
          .json({ error: "An account with this email already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
     
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      res.json({
        message: "Account successfully created"
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

  const login = async (req, res) => {
    try {
        const validationResult = loginValidator.validate(req.body, { abortEarly: false });
        if (validationResult.error) {
            res.status(400).json(validationResult);
        } else {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                res.status(401).json({
                  error: 'Wrong email and/or password'
                });
                return;
            }
            const passwordsMatch = await bcrypt.compare(password, user.password)
            if (!passwordsMatch) {
                res.status(401).json({
                    error: 'Wrong email and/or password'
                });
                return;
            }
            user.password = undefined;
            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn:"1d"});
            res.status(200).json({
                message: `Welcome ${user.firstName}`,
                user,
                token
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

  module.exports = {getUsers, register, login}