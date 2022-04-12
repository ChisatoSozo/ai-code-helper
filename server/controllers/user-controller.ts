import { loginParams, Ichat, Iuser } from "../types";

const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

//Login Mutation 
const login = async(_:any, {email, password}:loginParams) => {
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

//Signup Mutation 
const signUp = async(_:any, {username, email, password}:Iuser ) => {
    const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
};

//addToChatHistory Mutation
const addToChatHistory = async (_:any, args:Ichat, context:any) => {
  if (context.user){
    const chatHistory = await User.findOneAndUpdate(
      {_id: args.isUser},
      {$addToSet: {chats: }}
    )
  }
};

//deleteChatHistory Mutation 
const deleteChatHistory = async ()