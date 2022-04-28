import { useMutation } from '@apollo/client';
import { Autorenew } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { IMessage } from '../../../types';
import { DELETE_SOME_MESSAGES, GET_CONVERSATION } from '../../../utils';

interface props {
  isUser?: boolean;
  message?: string | undefined | null;
  loading?: boolean;
  index?: number;
  messages?: IMessage[];
  sendMessage?: (message: string) => Promise<void>;
  setMessages?: (messages: IMessage[]) => void;
}

const Message: React.FC<props> = ({
  isUser = false,
  message = '',
  loading = false,
  index = 1,
  messages = [],
  setMessages = () => {},
  sendMessage = () => Promise.resolve(),
}) => {
  // const loadingRef = useRef<null | HTMLDivElement>(null)
  // useEffect((): void => {
  //   if (loadingRef.current) {

  const styles = {
    container: {
      padding: '10px',
      margin: '20px',
      marginTop: '0px',
      marginBottom: '0px',
      width: 'fit-content',
      color: 'white',
    },
    loading: {
      '@keyframes loading': {
        '0%': {
          transform: 'translateY(0)',
        },
        '50%': {
          transform: 'translateY(-5px)',
        },
        '100%': {
          transform: 'translateY(0)',
        },
      },
      'p:nth-child(1)': {
        animation: 'loading .7s infinite',
        animationDelay: '0s',
      },
      'p:nth-child(2)': {
        animation: 'loading .7s infinite',
        animationDelay: '0.1s',
      },
      'p:nth-child(3)': {
        animation: 'loading .7s infinite',
        animationDelay: '0.2s',
      },
    },
    userMessage: {
      bgcolor: 'primary.light',
      marginLeft: 'auto',
      maxWidth: '70%',
      borderRadius: '10px 10px 0 10px',
    },
    userName: {
      marginLeft: 'auto',
      marginRight: '10px',
      padding: '10px',
      width: 'fit-content',
    },
    aiMessage: {
      backgroundColor: 'secondary.main',
      borderRadius: '10px 10px 10px 0px',
      position: 'relative',
    },
    aiName: {
      marginRight: 'auto',
      marginLeft: '10px',
      padding: '10px',
      maxWidth: '70%',
    },
    refresh: {
      width: '15px',
      height: '15px',
      position: 'absolute',
      bottom: '0px',
      right: '0px',
    },
  };

  const [deleteSomeMessages, { error: deleteSomeMessagesError }] = useMutation(
    DELETE_SOME_MESSAGES,
    {
      refetchQueries: [GET_CONVERSATION],
    }
  );

  const refresh = () => {
    const input: string = messages[index - 1].message || '';
    deleteSomeMessages({
      variables: { numberOfMessagesToDelete: messages.length - index + 1 },
    });
    sendMessage(input);
  };

  if (loading) {
    return (
      <Box
        sx={{
          ...styles.container,
          display: 'flex',
          ...styles.aiMessage,
          ...styles.loading,
        }}
      >
        <Typography>.</Typography>
        <Typography>.</Typography>
        <Typography>.</Typography>
      </Box>
    );
  }

  if (isUser) {
    return (
      <Box>
        <Typography variant={'body1'} sx={styles.userName}>
          You
        </Typography>
        <Box sx={{ ...styles.container, ...styles.userMessage }}>{message}</Box>
      </Box>
    );
  } else {
    return (
      <Box>
        <Typography variant={'body1'} sx={styles.aiName}>
          Sarabot:
        </Typography>
        <Box
          sx={{
            ...styles.container,
            ...styles.aiMessage,
          }}
        >
          <Typography component="span">{message}</Typography>
          <IconButton
            color="info"
            aria-label="upload picture"
            component="span"
            sx={styles.refresh}
            onClick={refresh}
          >
            <Autorenew sx={styles.refresh} />
          </IconButton>
        </Box>
      </Box>
    );
  }
};

export default Message;
