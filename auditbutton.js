import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from './dataContext';

function AuditButton() {
  const { storeData } = useContext(DataContext);
  // Function to handle the button click event

  async function handleAuditButtonClick() {
    // Make an HTTP GET request to the '/api/query' endpoint
    await fetch('http://localhost:8000/api/query')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle the JSON response data here, e.g., display it on the page
        console.log(data.results);
        // You can also trigger additional actions as needed
        storeData(data.results);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  return (
    <Stack style={{marginTop:'-60px'}}spacing={2} direction='row'>
      <Link to={'/Results'}>
        <Button
          variant='contained'
          size='large'
          sx={{
            backgroundColor: 'black',
            color: 'white',
            borderColor: 'black',
            '&:hover': {
              backgroundColor: 'darkgrey',
            },
          }}
          onClick={handleAuditButtonClick} // Attach the click event handler
        >
          Results
        </Button>
      </Link>
    </Stack>
  );
}

export default AuditButton;