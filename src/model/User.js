import mongoose from 'mongoose';
import Joi from '@hapi/joi';

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  }
}, {timestamps: {createdAt: 'created_at'}})

export const user = mongoose.model('User', userSchema)

export const joiSchema = Joi.object({
  name: Joi.string().min(5).max(30).required(),
  email: Joi.string().min(6).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'pe', 'edu'] } }),
  password: Joi.string().min(6).required()
})