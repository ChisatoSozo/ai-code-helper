const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

//User resolver
// export const user = async(parent:any, { username }, context:any) => {
//     return User.findOne({username});
// }


//interface login params 
interface loginParams {
    email: string, 
    password: string,
};

//Login Mutation 
export const login = async(_:any, {email, password}:loginParams) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
};