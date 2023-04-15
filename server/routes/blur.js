// initialize
const express = require('express');
const router = express.Router();

const {
    createListingTask,
    getAllListingTasks,
    deleteListingTask,
} = require('../controllers/blur');

// controller
router.route('/listing').get(getAllListingTasks).post(createListingTask);
router.route('/listing/:id').delete(deleteListingTask);



module.exports = router;
