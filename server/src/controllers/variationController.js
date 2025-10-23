import Variation from '../models/Variation.js';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import APIFeatures from '../utils/apiFeatures.js';

// Create Variation -- Admin
export const createVariation = catchAsyncErrors(async (req, res, next) => {
  req.body.createdBy = req.user.id;

  const variation = await Variation.create(req.body);

  res.status(201).json({
    success: true,
    variation
  });
});

// Get All Variations
export const getAllVariations = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const variationsCount = await Variation.countDocuments();

  const apiFeature = new APIFeatures(Variation.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const variations = await apiFeature.query;

  res.status(200).json({
    success: true,
    variations,
    variationsCount,
    resultPerPage
  });
});

// Get Single Variation Details
export const getVariationDetails = catchAsyncErrors(async (req, res, next) => {
  const variation = await Variation.findById(req.params.id);

  if (!variation) {
    return next(new ErrorHandler('Variation not found', 404));
  }

  res.status(200).json({
    success: true,
    variation
  });
});

// Update Variation -- Admin
export const updateVariation = catchAsyncErrors(async (req, res, next) => {
  let variation = await Variation.findById(req.params.id);

  if (!variation) {
    return next(new ErrorHandler('Variation not found', 404));
  }

  variation = await Variation.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    variation
  });
});

// Delete Variation -- Admin
export const deleteVariation = catchAsyncErrors(async (req, res, next) => {
  const variation = await Variation.findById(req.params.id);

  if (!variation) {
    return next(new ErrorHandler('Variation not found', 404));
  }

  await variation.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Variation deleted successfully'
  });
});

// Get Variations by Product
export const getVariationsByProduct = catchAsyncErrors(async (req, res, next) => {
  const variations = await Variation.getVariationsByProduct(req.params.productId);

  res.status(200).json({
    success: true,
    variations
  });
});

// Get Variation by Attributes
export const getVariationByAttributes = catchAsyncErrors(async (req, res, next) => {
  const { productId, attributes } = req.params;
  const variation = await Variation.getVariationByAttributes(productId, JSON.parse(attributes));

  if (!variation) {
    return next(new ErrorHandler('Variation not found', 404));
  }

  res.status(200).json({
    success: true,
    variation
  });
});

// Get Variations Statistics
export const getVariationsStats = catchAsyncErrors(async (req, res, next) => {
  const stats = await Variation.aggregate([
    {
      $group: {
        _id: '$product',
        count: { $sum: 1 },
        totalStock: { $sum: '$stock' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    }
  ]);

  res.status(200).json({
    success: true,
    stats
  });
});
