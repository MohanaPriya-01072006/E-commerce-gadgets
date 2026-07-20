const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
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
      trim: true,
      default: '',
    },
    subject: {
      type: String,
      required: [true, 'Subject / topic is required'],
      enum: [
        'Order Issue',
        'Product Enquiry',
        'Return / Refund',
        'Technical Support',
        'Partnership',
        'Other',
      ],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      minlength: [20, 'Message must be at least 20 characters'],
    },
    status: {
      type: String,
      enum: ['New', 'In Progress', 'Resolved'],
      default: 'New',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Enquiry', enquirySchema);
