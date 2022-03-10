const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      lowercase: true,
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
