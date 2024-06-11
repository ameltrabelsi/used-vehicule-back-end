const Joi = require("joi");

const registerValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4),
    role: Joi.string()
  });
  
  const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4),
  });

  const categorieValidator = Joi.object({
    name : Joi.string().required().min(4),
    description: Joi.string(),
  })

  module.exports = {registerValidator, loginValidator, categorieValidator};
