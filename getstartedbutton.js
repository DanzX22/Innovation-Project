import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

//Get started button
function GetStarted() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" size="large" component = {Link} to = {"/Audit"} 
        sx={{  backgroundColor: 'black', color: 'white', borderColor: 'black',
        '&:hover': {
          backgroundColor: 'darkgrey', // Change to your desired hover color
        },
        
      }}>Get Audited</Button>
    </Stack>
  );
}

export default GetStarted;