import { loginSchema, registerSchema, updateSchema } from "../model/User.js";

export const registerValidation = (data) => {
  return registerSchema.validate(data, { abortEarly: false });
};

export const loginValidation = (data) => {
  return loginSchema.validate(data, { abortEarly: false });
};

export const updateValidation = (data) => {
  return updateSchema.validate(data, { abortEarly: false });
};
