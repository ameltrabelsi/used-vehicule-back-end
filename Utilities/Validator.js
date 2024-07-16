const Joi = require("joi");

const registerValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4),
    phoneNumber: Joi.number().required().min(8),
    
  });
  
  const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4),
  });

  const categorieValidator = Joi.object({
    name : Joi.string().required().min(4),
    description: Joi.string(),
  })

  const articleValidator = Joi.object({
    brand : Joi.string().required().min(4).max(50),
    style: Joi.string().required(),
    description : Joi.string(),
    photo : Joi.string(),
    price : Joi.number(). required(),


  })

  

  module.exports = {
    registerValidator,
    loginValidator, 
    categorieValidator,
    articleValidator,
    
  };
