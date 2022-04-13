import { loginParams, Ichat, Iuser } from '../types';
import { AuthenticationError } from 'apollo-server-express';
import { User } from '../models';
import { signToken } from '../utils/signToken';

//Login Mutation
export const login = async (_: any, { email, password }: loginParams) => {

  const user = await User.findOne({ email });
  // console.log(user); 

  if (!user) {
    throw new AuthenticationError('No user found with this email address');
  }
  let correctPw

  try {
    correctPw = await user.isCorrectPassword(password);
  } catch (e){
    console.error(e)
  };

  if (!correctPw) {
    throw new AuthenticationError('Incorrect credentials');
  }
  const token = signToken(user);

  return { token, user };
};

//createUser Mutation
export const createUser = async (_: any, { username, email, password }: Iuser) => {
  const user = await User.create({ username, email, password });
  const token = signToken(user);
  return { token, user };
};

//addToChatHistory Mutation
export const addToChatHistory = async (_: any, args: Ichat, context:{user?:Iuser}) => {
  if (!context.user) {
    throw new AuthenticationError('User is not logged in');
  }

  const document = await User.findOneAndUpdate(
    { _id: context.user._id },
    { $addToSet: { chat: args } }
  );

  return document.chat;
};

//deleteChatHistory Mutation
export const deleteChatHistory = async(_: any, __:any, context: {user?:Iuser}) => {
  if (!context.user){
    throw new AuthenticationError('User is not logged in');
  }

  const document = await User.findOneAndUpdate(
    { _id: context.user._id }, 
    {user: {chat: [] } } 
  );

  return document.chat; 
};