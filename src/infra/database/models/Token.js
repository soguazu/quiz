const mongoose = require('mongoose');

const Token = require('../../../domain/Token');
/*
Token schema
*/

const TokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true, unique: true },
    purpose: {
      type: String,
      required: true,
      enum: ['PASSWORD_RESET', 'EMAIL_VERIFICATION', 'LOGIN'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'User',
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

TokenSchema.loadClass(Token);

TokenSchema.index({ user: 1, purpose: 1 }, { unique: true });

TokenSchema.index({ createdAt: 1 }, { expires: '1d' });

module.exports = mongoose.model('Token', TokenSchema);
