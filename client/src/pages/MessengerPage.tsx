import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CONVERSATION } from '../utils/apis/queries';
import { apolloErrorHandler } from '../utils';

export const MessengerPage = () => {

  const {data, error} = useQuery(GET_CONVERSATION)

  const [temp,setTemp] = useState<[]|null>(null)


  useEffect(() => {
    console.log(data)
    apolloErrorHandler(error)
    if(data?.getUser?.chat){
      setTemp(data.getUser.chat)
    }
  }, [data,error]);

    
  return (
    <>
      {temp && temp.map((message:any,index:number)=>(
        <p key={index}>{message.message}</p>
      ))}

      {error && (<p>Error getting conversation history</p>)}
    </>
  );
};
