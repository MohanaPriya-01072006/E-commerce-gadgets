const express = require('express');
const router = express.Router();
const {
  createApplication,
  getApplications,
  updateApplicationStatus,
} = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');
const { admin }   = require('../middleware/adminMiddleware');

// Public — anyone can submit an application
router.post('/', createApplication);

// Admin only — view all applications, update status
router.get('/',           protect, admin, getApplications);
router.put('/:id/status', protect, admin, updateApplicationStatus);

module.exports = router;
