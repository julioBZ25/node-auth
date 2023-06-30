import { loginSchema, registerSchema } from "../model/User.js";

export const registerValidation = (data) => {
  return registerSchema.validate(data, { abortEarly: false });
};

export const loginValidation = (data) => {
  return loginSchema.validate(data, { abortEarly: false });
};
