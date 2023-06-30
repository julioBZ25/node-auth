import { user as User } from "../model/User.js";
import { errorValidation } from "../utils/messages.js";
import { loginValidation, registerValidation } from "../utils/validations.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SALTROUNDS, TOKEN_SECRET } from "../config.js";

const { sign } = jwt;

export const registerController = async (req, res) => {
  //Validate the data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(errorValidation(error.details));

  //user already in the database?
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists.");

  //Hash password
  const hashedPassword = bcrypt.hashSync(req.body.password, SALTROUNDS);

  //Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

export const loginController = async (req, res) => {
  //Validate the data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(errorValidation(error.details));

  //user already in the database?
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .send("You have entered an invalid username or password.");

  //user's password validation
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res
      .status(400)
      .send("You have entered an invalid username or password.");

  const token = sign({ _id: user._id }, TOKEN_SECRET);

  res.header("auth-token", token).send({ token });
};
