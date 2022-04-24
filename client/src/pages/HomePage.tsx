import { Box, Button, Grid, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BackgroundMedia } from '../components/BackgroundMedia';


const styles = {
  wrapper: {
    minHeight: '-webkit-fill-available',
    position: 'relative',
    width: '100%',
    top: ['20vh']
  } as SxProps<Theme>,
  title: {
    fontSize: ['4rem', '6rem', '8rem', '10rem', '12rem'],
    position: 'relative',
    color: 'white',
    left: '-10vw',
  } as SxProps<Theme>,
  subtitle: {
    fontSize: ['2rem', '3rem', '4rem', '5rem', '6rem'],
    position: 'relative',
    color: 'white',
    left: '10vw',
  } as SxProps<Theme>,
  buttonContainer: {
    position: 'relative',
    width: '100%',
    top: '20vh',
  } as SxProps<Theme>,
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      sx={styles.wrapper}
    >
      <BackgroundMedia />
      <Grid item>
        <Typography sx={styles.title}>SaraBOT</Typography>
      </Grid>
      <Grid item>
        <Typography sx={styles.subtitle}>AI Tutor.</Typography>
      </Grid>
      <Grid item container
        justifyContent={'center'}
        sx={styles.buttonContainer}
      >
        <Grid item xs={6} sx={{ textAlign: 'center' }}>
          <Button variant='contained' size='large'
            onClick={() => navigate('/login')}>Login</Button>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'center' }}>
          <Button variant='contained' size='large'
            onClick={() => navigate('/signup')}>Signup</Button>
        </Grid>
      </Grid>
    </Grid >
  );
};
