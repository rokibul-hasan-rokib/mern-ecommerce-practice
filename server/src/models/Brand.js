import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Brand name is required'],
    trim: true,
    unique: true,
    maxlength: [50, 'Brand name cannot exceed 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Brand description is required'],
    maxlength: [500, 'Brand description cannot exceed 500 characters']
  },
  logo: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  website: {
    type: String,
    match: [/^https?:\/\/.+/, 'Please enter a valid URL']
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
brandSchema.index({ name: 'text', description: 'text' });
brandSchema.index({ createdAt: -1 });

// Virtual for product count
brandSchema.virtual('productCount', {
  ref: 'Product',
  localField: 'name',
  foreignField: 'brand',
  count: true
});

// Pre save middleware
brandSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.name = this.name.toLowerCase();
  }
  next();
});

// Static method to get brands with product count
brandSchema.statics.getBrandsWithCount = function() {
  return this.aggregate([
    {
      $lookup: {
        from: 'products',
        localField: 'name',
        foreignField: 'brand',
        as: 'products'
      }
    },
    {
      $addFields: {
        productCount: { $size: '$products' }
      }
    },
    {
      $project: {
        products: 0
      }
    }
  ]);
};

const Brand = mongoose.model('Brand', brandSchema);

export default Brand;
