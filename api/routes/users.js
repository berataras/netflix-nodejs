const router = require('express').Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken')

router.put('/:id', verifyToken, userController.update);
router.delete('/:id', verifyToken, userController.delete);

module.exports = router;
