import Category from '../models/Category.js';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import APIFeatures from '../utils/apiFeatures.js';

// Create Category -- Admin
export const createCategory = catchAsyncErrors(async (req, res, next) => {
  req.body.createdBy = req.user.id;

  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    category
  });
});

// Get All Categories
export const getAllCategories = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const categoriesCount = await Category.countDocuments();

  const apiFeature = new APIFeatures(Category.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const categories = await apiFeature.query;

  res.status(200).json({
    success: true,
    categories,
    categoriesCount,
    resultPerPage
  });
});

// Get Single Category Details
export const getCategoryDetails = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler('Category not found', 404));
  }

  res.status(200).json({
    success: true,
    category
  });
});

// Update Category -- Admin
export const updateCategory = catchAsyncErrors(async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler('Category not found', 404));
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    category
  });
});

// Delete Category -- Admin
export const deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler('Category not found', 404));
  }

  await category.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Category deleted successfully'
  });
});

// Get Categories with Product Count
export const getCategoriesWithCount = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.getCategoriesWithCount();

  res.status(200).json({
    success: true,
    categories
  });
});
