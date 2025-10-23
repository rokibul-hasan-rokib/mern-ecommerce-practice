import mongoose from 'mongoose';

const attributeValueSchema = new mongoose.Schema({
  attribute: {
    type: String,
    required: [true, 'Attribute is required'],
    trim: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, 'Value is required']
  },
  label: {
    type: String,
    required: [true, 'Label is required'],
    trim: true,
    maxlength: [100, 'Label cannot exceed 100 characters']
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
attributeValueSchema.index({ attribute: 1 });
attributeValueSchema.index({ value: 1 });
attributeValueSchema.index({ createdAt: -1 });

// Pre save middleware
attributeValueSchema.pre('save', function(next) {
  if (this.isModified('label')) {
    this.label = this.label.trim();
  }
  next();
});

// Static method to get values by attribute
attributeValueSchema.statics.getValuesByAttribute = function(attribute) {
  return this.find({ attribute: attribute });
};

const AttributeValue = mongoose.model('AttributeValue', attributeValueSchema);

export default AttributeValue;
