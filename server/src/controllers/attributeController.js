import Attribute from '../models/Attribute.js';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import APIFeatures from '../utils/apiFeatures.js';

// Create Attribute -- Admin
export const createAttribute = catchAsyncErrors(async (req, res, next) => {
  req.body.createdBy = req.user.id;

  const attribute = await Attribute.create(req.body);

  res.status(201).json({
    success: true,
    attribute
  });
});

// Get All Attributes
export const getAllAttributes = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const attributesCount = await Attribute.countDocuments();

  const apiFeature = new APIFeatures(Attribute.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const attributes = await apiFeature.query;

  res.status(200).json({
    success: true,
    attributes,
    attributesCount,
    resultPerPage
  });
});

// Get Single Attribute Details
export const getAttributeDetails = catchAsyncErrors(async (req, res, next) => {
  const attribute = await Attribute.findById(req.params.id);

  if (!attribute) {
    return next(new ErrorHandler('Attribute not found', 404));
  }

  res.status(200).json({
    success: true,
    attribute
  });
});

// Update Attribute -- Admin
export const updateAttribute = catchAsyncErrors(async (req, res, next) => {
  let attribute = await Attribute.findById(req.params.id);

  if (!attribute) {
    return next(new ErrorHandler('Attribute not found', 404));
  }

  attribute = await Attribute.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    attribute
  });
});

// Delete Attribute -- Admin
export const deleteAttribute = catchAsyncErrors(async (req, res, next) => {
  const attribute = await Attribute.findById(req.params.id);

  if (!attribute) {
    return next(new ErrorHandler('Attribute not found', 404));
  }

  await attribute.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Attribute deleted successfully'
  });
});

// Get Attributes with Value Count
export const getAttributesWithCount = catchAsyncErrors(async (req, res, next) => {
  const attributes = await Attribute.getAttributesWithCount();

  res.status(200).json({
    success: true,
    attributes
  });
});
