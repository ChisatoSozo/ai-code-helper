import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { BackgroundMedia } from '../components/BackgroundMedia';

const styles = {
  wrapper: {
    minHeight: '-webkit-fill-available',
    width: '100%',
  },
  title: {
    fontSize: ['4rem', '6rem', '8rem', '10rem', '12rem'],
    position: 'relative',
    color: 'white',
    left: '-10vw',
  },
  subtitle: {
    fontSize: ['2rem', '3rem', '4rem', '5rem', '6rem'],
    position: 'relative',
    color: 'white',
    left: '10vw',
  },
} as const;

export const HomePage = () => {
  return (
    <Grid
      container
      direction='column'
      alignItems='center'
    >
      <BackgroundMedia />
      <Grid item>
        <Typography sx={styles.title}>SaraBOT</Typography>
      </Grid>
      <Grid item>
        <Typography sx={styles.subtitle}>test</Typography>
      </Grid>
    </Grid >
  );
};
