// Xavier O'Leary (103734056)

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ResponsiveAppBar from './header';
import Footer from './footer';
import Typography from '@mui/material/Typography';
import { DataContext } from './dataContext';
import { useContext } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
// define a table for the three elements

export default function ResultsPage() {
  const { retrieveData } = useContext(DataContext);

  //   console.log(retrieveData());

  let dataRetrieve = retrieveData();

  const tableData = [
    { id: 1, name: 'Vulnerability' },
    { id: 2, name: 'Class' },
    { id: 3, name: 'Solution' },
  ];

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Grid container spacing={2}>
        {/* Grid item for the header */}
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <ResponsiveAppBar />
        </Grid>
        {/* Grid item for the "AUDIT COMPLETED!" title */}
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Typography variant='h4' component='h1'>
            AUDIT COMPLETED!
          </Typography>
        </Grid>
        {/* Grid item for the "Here are our findings:" subtitle */}
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Typography variant='h6' component='h6' gutterBottom>
            Here are our findings:
          </Typography>
        </Grid>
        {/* Grid item for the table */}
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container sx={{ marginBottom: '150px' }} spacing={2}>
            {/* Mapping through tableData to create table items */}
            {tableData.map(item => (
              <Grid key={item.id} item xs={4} sm={4} md={4}>
                <Item
                  elevation={3}
                  style={{ padding: '20px', textAlign: 'center' }}
                >
                  <Typography variant='h6'>{item.name}</Typography>
                </Item>
              </Grid>
            ))}
            {dataRetrieve?.length > 0 &&
              dataRetrieve.map((item, index) => (
                <>
                  <Grid
                    sx={{ height: '100%' }}
                    key={item.id}
                    item
                    xs={4}
                    sm={4}
                    md={4}
                  >
                    <Item
                      elevation={3}
                      style={{ padding: '20px', textAlign: 'center' }}
                    >
                      <Typography variant='h6'>{item[1]}</Typography>
                    </Item>
                  </Grid>
                  <Grid
                    sx={{ height: '100%' }}
                    key={item.id}
                    item
                    xs={4}
                    sm={4}
                    md={4}
                  >
                    <Item
                      elevation={3}
                      style={{ padding: '20px', textAlign: 'center' }}
                    >
                      <Typography variant='h6'>{item[2]}</Typography>
                    </Item>
                  </Grid>
                  <Grid
                    sx={{ height: '100%' }}
                    key={item.id}
                    item
                    xs={4}
                    sm={4}
                    md={4}
                  >
                    <Item
                      elevation={3}
                      style={{ padding: '20px', textAlign: 'center' }}
                    >
                      <Typography variant='h6'>{item[3]}</Typography>
                    </Item>
                  </Grid>
                </>
              ))}
          </Grid>
        </Grid>
        {/* Grid item for the footer */}
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          style={{ marginTop: 'auto' }}
        >
          <Footer />
        </Grid>
      </Grid>
    </Box>
  );
}