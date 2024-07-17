const express = require('express');
const { getArticle, getAllArticle, createArticle, updateArticle, deleteArticle } = require('../controllers/article');
const checkAuth = require('../middlewares/check-auth');
const multer = require('../middlewares/multer');
const router = express.Router();

router.get('/:id', getArticle),
router.get('/', getAllArticle),
router.post('/', checkAuth, multer, createArticle),
router.put('/:id', checkAuth, updateArticle),
router.delete('/:id',checkAuth, deleteArticle)

module.exports = router;
