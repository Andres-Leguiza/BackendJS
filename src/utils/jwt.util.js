import jwt from 'jsonwebtoken';
import config from "../config/config.js";

export function generateToken(user) {
  const token = jwt.sign({ user }, config.secret, { expiresIn: '1h' });
  return token;
}