import React from 'react';
import { Grid, Typography } from '@mui/material';

interface CounterProps {
  items: string[];
  content: string[];
}

const AccountInfo: React.FC<CounterProps> = ({ items, content }) => {
  return (
    <Grid container spacing={4} alignItems="center" my={8}>
      {items.map((item, index) => (
        <Grid item key={index} xs={3}>
          <div>
            <Typography variant="h6" gutterBottom>
              {item}
            </Typography>
            <Typography variant="h6" component="div" fontWeight="bold">
              {content[index]}
            </Typography>
            
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default AccountInfo;
