import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [1000, 'Product description cannot exceed 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Product brand is required'],
    trim: true
  },
  stock: {
    type: Number,
    required: [true, 'Product stock is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
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
  ratings: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true
    }
  }],
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
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ price: 1 });
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ createdAt: -1 });

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return ((this.originalPrice - this.price) / this.originalPrice * 100).toFixed(2);
  }
  return 0;
});

// Virtual for variations
productSchema.virtual('variations', {
  ref: 'Variation',
  localField: '_id',
  foreignField: 'product'
});

// Virtual for total stock from variations
productSchema.virtual('totalStock').get(function() {
  // This will be calculated in controller if needed
  return this.stock; // Fallback to main stock
});

// Pre save middleware
productSchema.pre('save', function(next) {
  if (this.isModified('price') && this.price < 0) {
    return next(new Error('Price cannot be negative'));
  }
  next();
});

// Static method to get products by category
productSchema.statics.getProductsByCategory = function(category) {
  return this.find({ category: category });
};

// Static method to get products by brand
productSchema.statics.getProductsByBrand = function(brand) {
  return this.find({ brand: brand });
};



// Instance method to update stock
productSchema.methods.updateStock = function(quantity) {
  this.stock += quantity;
  return this.save();
};

const Product = mongoose.model('Product', productSchema);

export default Product;
