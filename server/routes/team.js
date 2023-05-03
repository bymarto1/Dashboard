// initialize
const express = require('express');
const router = express.Router();

// controller
const {
    getAllStaffTasks,
    createStaffTask, 
    deleteStaffTask, 
    } = require('../controllers/team');

// controller
router.route('/all').get(getAllStaffTasks)
router.route('/staff').post(createStaffTask);
router.route('/staff/:id').delete(deleteStaffTask);


module.exports = router;
