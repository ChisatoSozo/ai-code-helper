import {Schema,model} from 'mongoose'
import {hash,compare} from 'bcrypt'
import { Iuser } from '../types'

const chatSchema = new Schema(
  {
    isUser:{type:Boolean, required:true},
    message:{type:String}
  }
)

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    chat:{type:[chatSchema]}
  }
)

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await hash(this.password, saltRounds);
  }
  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async (password:string, {password:hashedPassword}:Iuser)=> {
  //@ts-ignore
  return compare(password, hashedPassword);
};

export const User = model('User', userSchema)