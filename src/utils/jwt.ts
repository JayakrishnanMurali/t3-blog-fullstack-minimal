import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET || "ChangeMe";

export function signJwt(data: Object) {
  return jwt.sign(data, SECRET);
}

export function verifyJwt<T>(token: string) {
  return jwt.verify(token, SECRET) as T;
}
