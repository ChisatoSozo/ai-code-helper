import {Request} from 'express'
export interface UserRequest extends Request{
  user:{
    username:string,
    email:string,
    _id:string
  }
};

export interface Iuser{
  username: string, 
  email: string, 
  password: string, 
  chat?: [Ichat], 
};

export interface Ichat {
  isUser: boolean, 
  message?: string, 
};

export interface loginParams {
  email: string, 
  password: string,
};