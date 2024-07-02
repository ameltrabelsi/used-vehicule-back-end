const express = require('express');

const { getBrand, getAllBrand, updateBrand, deleteBrand, createBrand } = require("../controllers/brand");
const checkAuth = require("../middlewares/check-auth");
const checkIsAdmin = require("../middlewares/checkIsAdmin");
const router = express.Router();


router.get('/:id', getBrand);
router.get('/', getAllBrand );
router.post('/:id', checkAuth,checkIsAdmin, createBrand);
router.put('/:id', checkAuth,checkIsAdmin, updateBrand);
router.delete('/:id', checkAuth,checkIsAdmin, deleteBrand);

module.exports = router;