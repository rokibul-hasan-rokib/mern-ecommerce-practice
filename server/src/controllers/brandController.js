import Brand from '../models/Brand.js';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import APIFeatures from '../utils/apiFeatures.js';

// Create Brand -- Admin
export const createBrand = catchAsyncErrors(async (req, res, next) => {
  req.body.createdBy = req.user.id;

  const brand = await Brand.create(req.body);

  res.status(201).json({
    success: true,
    brand
  });
});

// Get All Brands
export const getAllBrands = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const brandsCount = await Brand.countDocuments();

  const apiFeature = new APIFeatures(Brand.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const brands = await apiFeature.query;

  res.status(200).json({
    success: true,
    brands,
    brandsCount,
    resultPerPage
  });
});

// Get Single Brand Details
export const getBrandDetails = catchAsyncErrors(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return next(new ErrorHandler('Brand not found', 404));
  }

  res.status(200).json({
    success: true,
    brand
  });
});

// Update Brand -- Admin
export const updateBrand = catchAsyncErrors(async (req, res, next) => {
  let brand = await Brand.findById(req.params.id);

  if (!brand) {
    return next(new ErrorHandler('Brand not found', 404));
  }

  brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    brand
  });
});

// Delete Brand -- Admin
export const deleteBrand = catchAsyncErrors(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return next(new ErrorHandler('Brand not found', 404));
  }

  await brand.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Brand deleted successfully'
  });
});

// Get Brands with Product Count
export const getBrandsWithCount = catchAsyncErrors(async (req, res, next) => {
  const brands = await Brand.getBrandsWithCount();

  res.status(200).json({
    success: true,
    brands
  });
});
