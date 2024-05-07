

import React from 'react';
import { Grid, Typography } from '@mui/material';

interface CounterProps {
  items: string[];
  sent: string[];
  receive: string[];
  position:string[];
}

const Total: React.FC<CounterProps> = ({ items, sent, receive,position }) => {
  return (
    <Grid container spacing={2} alignItems={position} my={1}>
      {items.map((item, index) => (
        <Grid item key={index}>
          <div>
            <Typography variant="h6" gutterBottom>
              {item}
            </Typography>
            <Typography variant="h3" component="div" fontWeight="bold">
              {sent[index]}
            </Typography>
            <Typography variant="h3" component="div" fontWeight="bold">
              {receive[index]}
            </Typography>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default Total;

