import { user as User } from "../model/User.js";
import { errorValidation } from "../utils/messages.js";
import {
  loginValidation,
  registerValidation,
  updateValidation,
} from "../utils/validations.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SALTROUNDS, TOKEN_SECRET } from "../config.js";

const { sign, verify } = jwt;

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
    res.status(201).send({
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
  console.log(user);
  if (!user)
    return res
      .status(400)
      .send({ message: "You have entered an invalid username or password" });

  //user's password validation
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res
      .status(400)
      .send({ message: "You have entered an invalid username or password." });

  const accessToken = sign(
    { _id: user._id, refreshToken: false },
    TOKEN_SECRET,
    {
      expiresIn: "1m",
    }
  );
  const refreshToken = sign(
    { _id: user._id, refreshToken: true },
    TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.status(200).send({ accessToken, refreshToken });
};

export const updateProfileController = async (req, res) => {
  //Only name
  const { error } = updateValidation(req.body);
  if (error) return res.status(400).send(errorValidation(error.details));

  const user = await User.findByIdAndUpdate(req.token._id, req.body, {
    new: true,
  });
  res.status(200).send({
    user: {
      name: user.name,
      email: user.email,
    },
  });
};

export const getProfileController = async (req, res) => {
  const user = await User.findById(req.token._id);

  res.status(200).send({
    user: {
      name: user.name,
      email: user.email,
    },
  });
};

export const refreshTokenController = async (req, res) => {
  const accessToken = sign(
    { _id: req.token._id, refreshToken: false },
    TOKEN_SECRET,
    {
      expiresIn: "1m",
    }
  );
  const refreshToken = sign(
    { _id: req.token._id, refreshToken: true },
    TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
  res.status(200).send({ accessToken, refreshToken });
};
