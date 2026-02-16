const Joi = require('joi');

/**
 * Validation middleware factory
 * @param {Joi.Schema} schema - Joi validation schema
 * @param {string} property - Request property to validate (body, params, query)
 */
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors
      });
    }

    // Replace with validated value
    req[property] = value;
    next();
  };
};

// Common validation schemas
const schemas = {
  // Auth schemas
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }),

  register: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    level: Joi.string().valid('Beginner', 'Intermediate', 'Advanced').default('Beginner')
  }),

  // Lesson schemas
  updateLessonProgress: Joi.object({
    progress: Joi.number().min(0).max(100).required(),
    timeSpent: Joi.number().min(0).optional()
  }),

  // Challenge schemas
  updateChallenge: Joi.object({
    current: Joi.number().min(0).required()
  }),

  // User schemas
  updateProfile: Joi.object({
    name: Joi.string().min(2).max(50).optional(),
    level: Joi.string().valid('Beginner', 'Intermediate', 'Advanced').optional()
  })
};

module.exports = {
  validate,
  schemas
};
