const Enquiry = require('../models/Enquiry');

// @desc    Submit a new enquiry (contact form)
// @route   POST /api/enquiries
// @access  Public
const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }
    if (message.trim().length < 20) {
      return res.status(400).json({ message: 'Message must be at least 20 characters.' });
    }

    const enquiry = await Enquiry.create({ name, email, phone, subject, message });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully. We will get back to you within 2 hours.',
      enquiry: {
        _id: enquiry._id,
        name: enquiry.name,
        email: enquiry.email,
        subject: enquiry.subject,
        createdAt: enquiry.createdAt,
      },
    });
  } catch (error) {
    // Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    console.error('Enquiry create error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// @desc    Get all enquiries (admin only)
// @route   GET /api/enquiries
// @access  Private/Admin
const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    res.json({ success: true, count: enquiries.length, enquiries });
  } catch (error) {
    console.error('Get enquiries error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc    Update enquiry status (admin only)
// @route   PUT /api/enquiries/:id/status
// @access  Private/Admin
const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found.' });
    res.json({ success: true, enquiry });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { createEnquiry, getEnquiries, updateEnquiryStatus };
