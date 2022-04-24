import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CONVERSATION } from '../utils';
import { apolloErrorHandler } from '../utils';
import Message from '../components/Messages/Message';
import { IMessage } from '../types';
import MessageInput from '../components/Messages/MessageInput';
import { useSendMessage } from '../hooks';
import OptionsModal from '../components/OptionsModal';
import { useNavigate } from 'react-router-dom';
import { BackgroundMedia } from '../components/BackgroundMedia';
import { Box, Container, Paper } from '@mui/material';
import auth from '../utils/auth';

const styles = {
  container: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  conversationContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: '60px',
  },
  messagesContainer: {
    height: 'calc(100vh - 200px)',
    width: '100%',
    overflow: 'auto',
  },
} as const;

export const MessengerPage: React.FC = () => {
  const bottomOfChat = useRef<null | HTMLDivElement>(null);
  const navigation = useNavigate();
  if (!auth.isLoggedIn()) {
    navigation('/');
  }

  const { data, error } = useQuery(GET_CONVERSATION);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { sendMessage, loading } = useSendMessage(messages);

  useEffect(() => {
    apolloErrorHandler(error);
    if (data?.getUser?.chat) {
      setMessages(data.getUser.chat);
    }
  }, [data, error]);

  useEffect(() => {
    if (bottomOfChat.current) {
      bottomOfChat.current.scrollIntoView({
        block: 'nearest',
        inline: 'start',
      });
    }
  }, [messages]);

  return (
    <Container maxWidth="md" style={styles.container}>
      <BackgroundMedia />
      <Paper style={styles.conversationContainer}>
        {error && <p>Error getting conversation history</p>}
        <Box style={styles.messagesContainer}>
          {messages.map(({ message, isUser }: IMessage, index: number) => (
            <Message isUser={isUser} message={message} key={index} />
          ))}

          {loading && <Message loading={true} />}
          <Box ref={bottomOfChat} />
        </Box>
      </Paper>
      <Paper sx={{ width: '100%', bgcolor: 'transparent' }}>
        <MessageInput
          sendMessage={sendMessage}
          setIsModalOpen={setIsModalOpen}
          messages={messages}
          setMessages={setMessages}
        />
      </Paper>
      <OptionsModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </Container>
  );
};
