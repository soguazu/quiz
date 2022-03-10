const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
      required: false,
    },
    lastLogin: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      default: 'active',
      enum: ['active', 'inactive'],
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

UserSchema.index({
  firstName: 'text',
  lastName: 'text',
  email: 'text',
});

module.exports = mongoose.model('User', UserSchema);
