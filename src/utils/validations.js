import {joiSchema} from "../model/User.js";

export const registerValidation = data => {
  return joiSchema.validate(data, {abortEarly: false})
}