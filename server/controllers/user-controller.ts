import { loginParams, Ichat, Iuser } from '../types';
import { AuthenticationError } from 'apollo-server-express';
import { User } from '../models';
import { signToken } from '../utils/signToken';

interface addToChatHistoryArgs {
  messages: {
    user: Ichat
    ai: Ichat
  }
}

//Login Mutation
export const login = async (_: any, { email, password }: loginParams) => {

  const user = await User.findOne({ email });
  // console.log(user); 

  if (!user) {
    throw new AuthenticationError('No user found with this email address');
  }
  
  let correctPw

  try {
    correctPw = await user.isCorrectPassword(password, user);
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
export const addToChatHistory = async (_: any, {messages: {user, ai}}:addToChatHistoryArgs, context:{user?:Iuser}) => {
  if (!context.user) {
    throw new AuthenticationError('User is not logged in');
  }

  const userMessageDocument = await User.findOneAndUpdate(
    { _id: context.user._id },
    { $addToSet: { chat: {user} } },
    {new: true}, 
  );

  const aiMessageDocument = await User.findOneAndUpdate(
    { _id: context.user._id },
    { $addToSet: { chat: { ai } } },
    {new: true}, 
  );

  return aiMessageDocument.chat;
};

//deleteChatHistory Mutation (clear chat history)
export const deleteChatHistory = async(_: any, __:any, context: {user?:Iuser}) => {
  if (!context.user){
    throw new AuthenticationError('User is not logged in');
  }

  const document = await User.findOneAndUpdate(
    { _id: context.user._id }, 
    {chat: [] }, 
    {new: true}, 
  );
  return document.chat; 
};

//getUser only for backend testing 
export const getUser = async (_:any, {username}:Iuser, context: {user?:Iuser}) => {
  return await User.findOne({username})
};