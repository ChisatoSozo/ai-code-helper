import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CONVERSATION } from '../utils/apis/queries';

export const MessengerPage = () => {

  const {data, error} = useQuery(GET_CONVERSATION)
    console.log(data, GET_CONVERSATION)
    console.log(JSON.data)
  return (
    <div>
      {error && (<p>Error getting conversation history</p>)}
    </div>
  );
};
