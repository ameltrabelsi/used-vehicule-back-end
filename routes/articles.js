const express = require('express');
const { getArticle, getAllAriticle, createArticle, updateArticle, deleteArticle } = require('../controllers/article');
const checkAuth = require('../middlewares/check-auth');
const multer = require('../middlewares/multer');
const router = express.Router();

router.get('/:id', getArticle),
router.get('/', getAllAriticle),
router.post('/', checkAuth, multer, createArticle),
router.put('/:id', checkAuth, updateArticle),
router.delete('/',checkAuth, deleteArticle)

module.exports = router;
