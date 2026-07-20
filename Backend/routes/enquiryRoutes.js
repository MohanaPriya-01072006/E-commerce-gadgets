const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
} = require('../controllers/enquiryController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

// Public — anyone can submit a contact/enquiry form
router.post('/', createEnquiry);

// Admin only — view all enquiries, update status
router.get('/', protect, admin, getEnquiries);
router.put('/:id/status', protect, admin, updateEnquiryStatus);

module.exports = router;
