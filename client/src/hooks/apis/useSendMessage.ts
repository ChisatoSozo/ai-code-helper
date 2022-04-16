import { useMutation, useQuery } from '@apollo/client';
import { ai21API, apolloErrorHandler, conversationGen, GET_CONVERSATION, SAVE_CHAT } from '../../utils';
import { useCallback, useState } from 'react';
import { IMessage } from '../../types';

export const useSendMessage = (messageHistory: IMessage[]) => {
  const [saveChat, { error }] = useMutation(SAVE_CHAT, {
    refetchQueries: [GET_CONVERSATION]
  });

  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = useCallback(
    async (message: string) => {
      try {
        setLoading(true);
        const conversationHistory = conversationGen(message, messageHistory);
        console.log(conversationHistory);
        const aIResponse: false | string = await ai21API(conversationHistory);
        if (aIResponse === false) {

        }
        const addChatMessagesInput = {
          messages:{
            user: {
              isUser: true,
              message: message
            },
            ai: {
              isUser: false,
              message: aIResponse
            }
          }
        };
        const {data} = await saveChat({variables: { ...addChatMessagesInput }})
        setLoading(false)
        if(error){
          apolloErrorHandler(error)
        }
      } catch (e) {
        console.log(e);
        apolloErrorHandler(error);
      }

    }, [messageHistory]);
  return { sendMessage, loading };
};
