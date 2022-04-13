import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CONVERSATION } from '../utils';

export const MessengerPage = () => {

  const {data,error} = useQuery(GET_CONVERSATION)

  return (
    <div>
      {error && (<p>Error getting conversation history</p>)}
    </div>
  );
};
