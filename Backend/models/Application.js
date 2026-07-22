const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Enter a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
    },
    experience: {
      type: String,
      required: [true, 'Experience is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    skills: {
      type: String,
      trim: true,
      default: '',
    },
    expectedSalary: {
      type: String,
      trim: true,
      default: '',
    },
    noticePeriod: {
      type: String,
      default: '',
    },
    availableDate: {
      type: Date,
      required: [true, 'Available date is required'],
    },
    linkedIn: {
      type: String,
      trim: true,
      default: '',
    },
    portfolio: {
      type: String,
      trim: true,
      default: '',
    },
    coverLetter: {
      type: String,
      trim: true,
      default: '',
    },
    // resume filename stored after upload (future: use multer/S3)
    resumeFileName: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Received', 'Under Review', 'Shortlisted', 'Rejected', 'Hired'],
      default: 'Received',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);
