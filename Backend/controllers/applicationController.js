const Application = require('../models/Application');

// @desc    Submit a new job application
// @route   POST /api/applications
// @access  Public
const createApplication = async (req, res) => {
  try {
    const {
      fullName, email, phone, position, experience,
      location, skills, expectedSalary, noticePeriod,
      availableDate, linkedIn, portfolio, coverLetter,
    } = req.body;

    // Basic required-field check (Mongoose validators also run)
    if (!fullName || !email || !phone || !position || !experience || !location || !availableDate) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    const application = await Application.create({
      fullName,
      email,
      phone,
      position,
      experience,
      location,
      skills:         skills         || '',
      expectedSalary: expectedSalary || '',
      noticePeriod:   noticePeriod   || '',
      availableDate,
      linkedIn:       linkedIn       || '',
      portfolio:      portfolio      || '',
      coverLetter:    coverLetter    || '',
      // resumeFileName handled separately when file upload is added
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully. Our HR team will review it within 7–10 business days.',
      application: {
        _id:       application._id,
        fullName:  application.fullName,
        email:     application.email,
        position:  application.position,
        createdAt: application.createdAt,
      },
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    console.error('Application create error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// @desc    Get all applications (admin only)
// @route   GET /api/applications
// @access  Private/Admin
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({}).sort({ createdAt: -1 });
    res.json({ success: true, count: applications.length, applications });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc    Update application status (admin only)
// @route   PUT /api/applications/:id/status
// @access  Private/Admin
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!application) return res.status(404).json({ message: 'Application not found.' });
    res.json({ success: true, application });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { createApplication, getApplications, updateApplicationStatus };
