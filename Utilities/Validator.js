const Joi = require("joi");

const registerValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4),
    
  });
  
  const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4),
  });

  const categoryValidator = Joi.object({
    name : Joi.string().required().min(4),
    description: Joi.string(),
  })

  const articleValidator = Joi.object({
    title : Joi.string().required().min(4).max(50),
    description : Joi.string(),
    photo : Joi.string(),
    price : Joi.number(). required(),
    categoryId: Joi.string().required()

  })

  const brandValidator = Joi.object({
    name: Joi.string().required(),
  })

  const styleValidator = Joi.object({
    name : Joi.string().required(),
    description : Joi.string(),
  })

  module.exports = {
    registerValidator,
    loginValidator, 
    categoryValidator,
    articleValidator,
    brandValidator,
    styleValidator
  };
