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

  const categorieValidator = Joi.object({
    name : Joi.string().required().min(4),
    description: Joi.string(),
  })

  const articleValidator = Joi.object({
    title : Joi.string().required().min(4).max(50),
    description : Joi.string(),
    photo : Joi.string(),
    price : Joi.number(). required(),


  })

  module.exports = {registerValidator, loginValidator, categorieValidator};
