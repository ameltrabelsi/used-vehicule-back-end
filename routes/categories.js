const express = require('express');
const { getAllCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/category');
const checkAuth = require('../middlewares/check-auth');
const checkIsAdmin = require('../middlewares/checkIsAdmin');
const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.post('/', checkAuth, checkIsAdmin, createCategory)
router.put('/:id', checkAuth, checkIsAdmin, updateCategory)
router.delete('/:id', checkAuth, checkIsAdmin, deleteCategory)

module.exports = router;