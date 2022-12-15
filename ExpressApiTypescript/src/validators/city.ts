import { body, param } from 'express-validator';

export const cityIdValidation = [
  param('id')
    .notEmpty()
    .withMessage('Id is required!')
    .isInt({
      min: 0,
    })
    .withMessage('Id is required!'),
];

export const createCityValidations = [
  body('name').notEmpty().withMessage('Name is required!'),
  body('uf').notEmpty().withMessage('UF is required!'),
];

export const updateCityValidations = [
  ...cityIdValidation,
  ...createCityValidations,
];
