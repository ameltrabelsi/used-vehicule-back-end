const express = require('express');
const { getCategorie, createCategorie, updateCategorie } = require('../controllers/categorie');
const router = express.Router();

router.get('/', getCategorie);
router.post('/', createCategorie)
router.put('/', updateCategorie)
module.exports = router;