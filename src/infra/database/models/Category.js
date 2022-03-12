const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'User',
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);


CategorySchema.index({
  title: 'text',
});

module.exports = mongoose.model('Category', CategorySchema);
