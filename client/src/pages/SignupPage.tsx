import { Container, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';
import { BackgroundMedia } from '../components/BackgroundMedia';
import { SignupForm } from '../components/SignupForm';

const styles = {
  wrapper: {
    minHeight: '-webkit-fill-available',
    position: 'relative',
    width: '100%',
    top: ['20vh']
  } as SxProps<Theme>,
  title: {
    color: 'text.secondary',
    fontSize: '4rem',
  }
};
export const SignupPage: React.FC = () => {
  return (
    <Container
      maxWidth='md'
      sx={styles.wrapper}
    >
      <BackgroundMedia />
      <Typography sx={styles.title}>Signup</Typography>
      <SignupForm />
    </Container>
  );
};

