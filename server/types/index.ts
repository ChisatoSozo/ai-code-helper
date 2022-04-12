import {Request} from 'express'
export interface UserRequest extends Request{
  user:{
    username:string,
    email:string,
    _id:string
  }
}