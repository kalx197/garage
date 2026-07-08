const express = require('express');
const router = express.Router();
const toolController = require('../controllers/toolController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/', toolController.getAllTools); // Anyone can see the catalog
router.post('/', verifyToken, isAdmin, toolController.addTool); // Only Admins can add tools

module.exports = router;
