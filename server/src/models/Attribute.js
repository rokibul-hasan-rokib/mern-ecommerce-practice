import mongoose from 'mongoose';

const attributeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Attribute name is required'],
    trim: true,
    unique: true,
    maxlength: [50, 'Attribute name cannot exceed 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Attribute description is required'],
    maxlength: [500, 'Attribute description cannot exceed 500 characters']
  },
  type: {
    type: String,
    required: [true, 'Attribute type is required'],
    enum: {
      values: ['text', 'number', 'boolean', 'date'],
      message: 'Type must be text, number, boolean, or date'
    }
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create indexes for better performance
attributeSchema.index({ name: 'text', description: 'text' });
attributeSchema.index({ type: 1 });
attributeSchema.index({ createdAt: -1 });

// Virtual for attribute value count
attributeSchema.virtual('valueCount', {
  ref: 'AttributeValue',
  localField: 'name',
  foreignField: 'attribute',
  count: true
});

// Pre save middleware
attributeSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.name = this.name.toLowerCase();
  }
  next();
});

// Static method to get attributes with value count
attributeSchema.statics.getAttributesWithCount = function() {
  return this.aggregate([
    {
      $lookup: {
        from: 'attributevalues',
        localField: 'name',
        foreignField: 'attribute',
        as: 'values'
      }
    },
    {
      $addFields: {
        valueCount: { $size: '$values' }
      }
    },
    {
      $project: {
        values: 0
      }
    }
  ]);
};

const Attribute = mongoose.model('Attribute', attributeSchema);

export default Attribute;
