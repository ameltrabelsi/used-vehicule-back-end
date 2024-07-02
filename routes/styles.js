const express = require('express');
const { getAllStyles, getStyle, createStyle, updateStyle, deleteStyle } = require('../controllers/style');
const checkAuth = require('../middlewares/check-auth');
const checkIsAdmin = require('../middlewares/checkIsAdmin');
const router = express.Router();

router.get('/', getAllStyles);
router.get('/:id', getStyle);
router.post('/:id', checkAuth, checkIsAdmin, createStyle);
router.put('/:id', checkAuth, checkIsAdmin, updateStyle);
router.delete('/:id', checkAuth, checkIsAdmin, deleteStyle);

module.exports= router;

