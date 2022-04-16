import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { auth, GET_CONVERSATION } from '../utils';
import { apolloErrorHandler } from '../utils';
import Message from '../components/Messages/Message';
import { IMessage } from '../types';
import MessageInput from '../components/Messages/MessageInput';
import { useSendMessage } from '../hooks';
import OptionsModal from '../components/OptionsModal';
import { useNavigate } from 'react-router-dom';
import { BackgroundMedia } from '../components/BackgroundMedia';


const styles = {
  container:{
    height:'100vh',
    width:'100vw',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column'
  },
  conversationContainer:{
    backgroundColor:'white',
    height:'90vh'
  },
  messagesContainer:{
    minHeight: '-webkit-fill-available',
  }
}as const


export const MessengerPage = () => {


  const navigation = useNavigate()
  //TODO
  // if(!auth.isLoggedIn()){
  //   navigation('/')
  // }

  const {data, error} = useQuery(GET_CONVERSATION)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [messages,setMessages] = useState<IMessage[]>([])
  const { sendMessage,loading } = useSendMessage(messages)

  useEffect(() => {
    apolloErrorHandler(error)
    if(data?.getUser?.chat){
      setMessages(data.getUser.chat)
    }
  }, [data,error]);

    
  return (
    <div style={styles.container}>
      <BackgroundMedia/>
      <div style={styles.conversationContainer}>
      {error && (<p>Error getting conversation history</p>)}
        <div style={styles.messagesContainer}>
      {messages.map(({ message,isUser }:IMessage,index:number)=>(
        <Message isUser={isUser} message={message} key={index}/>
      ))}

      <Message loading={loading}/>
          </div>
      <MessageInput sendMessage={sendMessage} setIsModalOpen={setIsModalOpen}/>
      </div>
      <OptionsModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </div>
  );
};
