// Xavier O'Leary (103734056)
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ResponsiveAppBar from './header';
import Footer from './footer';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// History Page
export default function HistoryPage() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch the list of file names and content from the Flask API
    fetch('http://localhost:8000/api/history')
      .then((response) => response.json())
      .then((data) => {
        // Set the fetched data to the state
        setFiles(data.history);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} direction="row" justifyContent="space-around" alignItems="center">
        {/* Imports ResponsiveAppBar */}
        <Grid item xs={12} sm={12} md={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
          <ResponsiveAppBar />
        </Grid>

        {/* Render the file names and content */}
        <Grid item xs={12} style={{ textAlign: 'left' }}>
          <Typography variant="h4" component="h1">
            HISTORY
          </Typography>
          {files.length > 0 && (
            <ul>
              {files.map((file, index) => (
                <li key={index}>
                  <h2>{file.file_name}</h2>
                  <p dangerouslySetInnerHTML={{ __html: file.file_content.replace(/\n/g, '<br />') }}></p>
                </li>
              ))}
            </ul>
          )}
          
        </Grid>
        {/* Imports footer */}
        <Grid item xs={12} sm={12} md={12}>
          <Footer />
        </Grid>
      </Grid>
    </Box>
  );
}
