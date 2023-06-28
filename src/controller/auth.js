import {user as User} from "../model/User.js";
import { errorValidation } from "../utils/messages.js";
import { registerValidation } from "../utils/validations.js";
import bcrypt from 'bcrypt'
import { SALTROUNDS } from "../config.js";

export const registerController = async (req, res) => {
  //Validate the data
  const {error} = registerValidation(req.body)
  if (error) return res.status(400).send(errorValidation(error.details))

  //user already in the database?
  const emailExist = await User.findOne({email: req.body.email});
  if(emailExist) return res.status(400).send('Email already exists.');

  //Hash password
  const hashedPassword = bcrypt.hashSync(req.body.password, SALTROUNDS);

  //Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })

  try{
    const savedUser = await user.save();
    res.send({user: {
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email
    }});
  }catch(err){
    res.status(400).send(err);
  }
}