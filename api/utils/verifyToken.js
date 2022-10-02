import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = (req, res, next) => {
  //const token = req.cookies.access_token;
  const authToken = req.headers.token;

  //if (!token) return next(createError(401, "You are not authenticated"));
  if (!authToken) return next(createError(401, "You are not authenticated"));

  jwt.verify(authToken, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid"));
    req.user = user;
    next();
  });
};
