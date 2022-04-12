const jwt = require('jsonwebtoken');
interface signTokenBody {
  username:string,
  email:string,
  _id:string
}
export const signToken = ({username, email, _id}:signTokenBody) => {
  const payload = {username, email, _id};
  return jwt.sign({data: payload}, process.env.JWT_SECRET, {expiresIn: process.env.EXPIRATION});
}