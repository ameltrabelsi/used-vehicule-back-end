const jwt = require('jsonwebtoken');

const User = require('../models/User');

module.exports = async function (req, res, next) {


    if (req.user.role === "admin") {
        next();
    } else {
        return res.status(401).json({ error: "Unauthorized ! Only admins can access this endpoint." });
    }
}