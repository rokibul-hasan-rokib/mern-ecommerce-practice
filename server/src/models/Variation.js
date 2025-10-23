import mongoose from 'mongoose';

const variationSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Product is required']
  },
  attributes: [{
    attribute: {
      type: String,
      required: true
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    }
  }],
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  sku: {
    type: String,
    required: [true, 'SKU is required'],
    unique: true,
    trim: true
  },
  images: [{
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }],
  isActive: {
    type: Boolean,
    default: true
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
variationSchema.index({ product: 1 });
variationSchema.index({ sku: 1 });
variationSchema.index({ stock: 1 });
variationSchema.index({ price: 1 });
variationSchema.index({ createdAt: -1 });

// Pre save middleware
variationSchema.pre('save', function(next) {
  if (this.isModified('price') && this.price < 0) {
    return next(new Error('Price cannot be negative'));
  }
  if (this.isModified('stock') && this.stock < 0) {
    return next(new Error('Stock cannot be negative'));
  }
  next();
});

// Static method to get variations by product
variationSchema.statics.getVariationsByProduct = function(productId) {
  return this.find({ product: productId, isActive: true });
};

// Static method to get variation by attributes
variationSchema.statics.getVariationByAttributes = function(productId, attributes) {
  return this.findOne({
    product: productId,
    attributes: { $all: attributes },
    isActive: true
  });
};

// Instance method to update stock
variationSchema.methods.updateStock = function(quantity) {
  this.stock += quantity;
  return this.save();
};

const Variation = mongoose.model('Variation', variationSchema);

export default Variation;
