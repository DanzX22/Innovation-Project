//Mohammad Danish Mohd Hazman (104139021)

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ResponsiveAppBar from './header';
import FileUploadButton from './uploadarea';
import AuditButton from './auditbutton';
import Footer from './footer';
import Typography from '@mui/material/Typography';

//Uploading document to get audited
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    }));
   export default function AuditPage() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/*Imports ResponsiveAppBar from Header*/}
          <Grid item xs={12} sm={12} md={12}>
            <ResponsiveAppBar />
          </Grid>
          <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            {/*Text for Audit*/}
            <Grid item xs={12}  style={{ textAlign: 'center' }}>
              <Typography variant="h5" component="h1" >
                UPLOAD YOUR SMART CONTRACT
              </Typography>
            </Grid>
            {/*File upload button*/}
            <Grid item xs={12} sm={8} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <FileUploadButton />
            </Grid>
            {/*Imports Audit button*/}
           <Grid item xs={12} sm={8} md={12} sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }} style={{ marginBottom: '10px'}}>
              <AuditButton />
    </Grid> 
            {/*Imports Footer*/}
            <Grid item xs={12} sm={12} md={12} >
            <Footer />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
    }   

