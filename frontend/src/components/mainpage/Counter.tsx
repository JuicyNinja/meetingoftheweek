import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

interface CounterProps {
  items: string[];
  values: string[];
}

const Counter: React.FC<CounterProps> = ({ items, values }) => {
  return (
    <Grid container spacing={4} justifyContent="space-around" alignItems="center" my={1}>
      {items.map((item, index) => (
        <Box
          sx={{
            marginY: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          key={index}
        >
          <Typography variant="h5" marginBottom={2}> {item} </Typography>
          <Typography variant="h4" component="div" fontWeight="bold" color={"#0032f3"}> {values[index]} </Typography>
        </Box>
      ))}
    </Grid>
  );
};

export default Counter;
