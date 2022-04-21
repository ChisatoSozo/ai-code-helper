import { Box, Typography } from '@mui/material';
import React, { useRef } from 'react';
import { useEffect } from 'react';

interface props {
  isUser?: boolean;
  message?: string | undefined | null;
  loading?: boolean;
}

const Message: React.FC<props> = ({
  isUser = false,
  message = '',
  loading = false,
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
    },
    aiName: {
      marginRight: 'auto',
      marginLeft: '10px',
      padding: '10px',
      maxWidth: '70%',
    },
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
        <Box sx={{ ...styles.container, ...styles.aiMessage }}>{message}</Box>
      </Box>
    );
  }
};

export default Message;
