import AttributeValue from '../models/AttributeValue.js';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import APIFeatures from '../utils/apiFeatures.js';

// Create Attribute Value -- Admin
export const createAttributeValue = catchAsyncErrors(async (req, res, next) => {
  req.body.createdBy = req.user.id;

  const attributeValue = await AttributeValue.create(req.body);

  res.status(201).json({
    success: true,
    attributeValue
  });
});

// Get All Attribute Values
export const getAllAttributeValues = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const attributeValuesCount = await AttributeValue.countDocuments();

  const apiFeature = new APIFeatures(AttributeValue.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const attributeValues = await apiFeature.query;

  res.status(200).json({
    success: true,
    attributeValues,
    attributeValuesCount,
    resultPerPage
  });
});

// Get Single Attribute Value Details
export const getAttributeValueDetails = catchAsyncErrors(async (req, res, next) => {
  const attributeValue = await AttributeValue.findById(req.params.id);

  if (!attributeValue) {
    return next(new ErrorHandler('Attribute Value not found', 404));
  }

  res.status(200).json({
    success: true,
    attributeValue
  });
});

// Update Attribute Value -- Admin
export const updateAttributeValue = catchAsyncErrors(async (req, res, next) => {
  let attributeValue = await AttributeValue.findById(req.params.id);

  if (!attributeValue) {
    return next(new ErrorHandler('Attribute Value not found', 404));
  }

  attributeValue = await AttributeValue.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    attributeValue
  });
});

// Delete Attribute Value -- Admin
export const deleteAttributeValue = catchAsyncErrors(async (req, res, next) => {
  const attributeValue = await AttributeValue.findById(req.params.id);

  if (!attributeValue) {
    return next(new ErrorHandler('Attribute Value not found', 404));
  }

  await attributeValue.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Attribute Value deleted successfully'
  });
});

// Get Attribute Values by Attribute
export const getValuesByAttribute = catchAsyncErrors(async (req, res, next) => {
  const attributeValues = await AttributeValue.getValuesByAttribute(req.params.attribute);

  res.status(200).json({
    success: true,
    attributeValues
  });
});
