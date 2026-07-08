const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, resourceController.createResource);
router.get('/', authMiddleware, resourceController.getUserResources);

module.exports = router;
