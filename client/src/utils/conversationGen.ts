import { IMessage } from '../types';

let prompt = `SaraBot is your tutor. She has knowledge of javascript, html, css and can answer your questions in a clear and concise manner.` +
  `\nThe following is a conversation between you and SaraBot. The conversation will follow the following format` +
  `\nSaraBot: "Hello welcome to my tutoring session."` +
  `\nYou: "Thank you."` +
  `\nSaraBot: "We can start if you're ready"` +
  `\nYou: "Yes I am ready"`;


export const conversationGen = (message:string, messageHistory:IMessage[]) => {
  let conversation = prompt

  //TODO lets talk about this I dont like this
  // if(messageHistory.length<1){
  //   conversation+=`\nSaraBot: "Hey, I heard you were struggling with javascript in class today. Did you have any questions?"`
  // }

  if(messageHistory.length>20){
    const numberToRemove = messageHistory.length - 20
    messageHistory = messageHistory.splice(0,numberToRemove)
  }

  for(const message of messageHistory){
    conversation+= `\n${message.isUser?'You':'SaraBot'}: "${message.message}"`
  }

  conversation += `\nYou: "${message}"` + `\nSaraBot: "`

  return conversation
}