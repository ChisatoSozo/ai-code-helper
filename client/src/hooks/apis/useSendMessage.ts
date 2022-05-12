import { useMutation, useLazyQuery } from '@apollo/client';
import {
  ai21API,
  apolloErrorHandler,
  conversationGen,
  GET_CONVERSATION,
  SAVE_CHAT,
} from '../../utils';
import { useCallback, useState } from 'react';
import { IMessage } from '../../types';

export const useSendMessage = (messageHistory: IMessage[]) => {
  const [saveChat, { error }] = useMutation(SAVE_CHAT, {
    refetchQueries: [GET_CONVERSATION],
  });
  const [updateConversation, { loading: updateConversationLoading }] =
    useLazyQuery(GET_CONVERSATION);
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = useCallback(
    async (message: string, isResending: boolean = false) => {
      try {
        const { data: messagesData } = await updateConversation();

        setLoading(true);
        const conversationHistory = conversationGen(message, [
          ...messagesData.getUser.chat,
        ]);
        const aIResponse: false | string = await ai21API(
          conversationHistory,
          isResending
        );
        if (aIResponse === false) {
          throw new Error('SaraBot is unresponsive');
        }
        const addChatMessagesInput = {
          messages: {
            user: {
              isUser: true,
              message: message,
            },
            ai: {
              isUser: false,
              message: aIResponse,
            },
          },
        };
        const { data } = await saveChat({
          variables: { ...addChatMessagesInput },
        });
        setLoading(false);
        if (error) {
          apolloErrorHandler(error);
        }
      } catch (e) {
        console.log(e);
        apolloErrorHandler(error);
      }
    },
    [error, saveChat, updateConversation]
  );
  return { sendMessage, loading };
};
