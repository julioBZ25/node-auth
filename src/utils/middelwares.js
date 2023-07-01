import pkg from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

const { verify } = pkg;

export const tokenVerification = (req, res, next) => {
  const bearerHeader = req.header("Authorization");
  if (!bearerHeader) return res.status(401).send({ message: "Access Denied" });

  try {
    const bearerToken = bearerHeader.split(" ")[1];
    req.user = verify(bearerToken, TOKEN_SECRET);
    next();
  } catch (err) {
    res.status(400).send({ message: "Invalid token" });
  }
};
