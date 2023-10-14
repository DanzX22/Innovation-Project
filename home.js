//Mohammad Danish Mohd Hazman (104139021)
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ResponsiveAppBar from './header'; // Import the header component
import GetStarted from './getstartedbutton'; // Import the GetStarted component
import SmartContractImage from './images/smartcontract2.png'; // Import smart contract image
import AboutUsImage from './images/aboutus2.png'; // Import about us image
import OurTeamImage from './images/team.png'; // Import team image
import Footer from './footer'; // Import footer
import './home.css'; // Import a CSS file for transition
import Typography from '@mui/material/Typography';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function HomePage() {
  
  const handleIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('grid'); //Transition effect from CSS when grid is in view
        observer.unobserve(entry.target);
      }
    });
  };

  // Set up a IntersectionObserver 
  React.useEffect(() => {
    const options = {
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleIntersect, options);
    const targets = document.querySelectorAll('.grid'); // it selects any elements with 'grid'
    targets.forEach((target) => observer.observe(target));
  }, []);

 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
         {/* Imports 'Header'' */}
        <Grid item xs={12} sm={12} md={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ResponsiveAppBar />
        </Grid>
       {/* Grid item for 'Get Started Button' */}
        <Grid item xs={6} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgrey'}} style={{ marginBottom: '130px'}} className="grid">
          <GetStarted />
        </Grid>
      {/* Grid item for 'Smart Contract Image' */}
        <Grid item xs={6} sm={6} md={6}  className="grid" style={{ marginBottom: '130px', backgroundColor: 'lightgrey'}}>
          <div>
            <img src={SmartContractImage} 
                 alt="smartcontractimage" 
                 style={{ maxWidth: '70%', height: 'auto', width: '80%'}}/>
          </div>
        </Grid>
      {/* Grid item for 'About Us Image' */}
        <Grid item xs={6} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} style={{ marginBottom: '130px'}} className="grid">
          <div style={{ textAlign: 'center' }}>
            <img src={AboutUsImage} 
                 alt="aboutusimage" 
                 style={{ width: '70%', maxWidth: '400px', height: 'auto' }}/>
          </div>
        </Grid>
      {/* Grid item for 'Who Are We documentation' */}
        <Grid item xs={6} sm={6} md={6} style={{ textAlign: 'center', marginBottom: '130px'  }} className="grid"> 
          <div>
            <Typography variant="h4" component="h1" gutterBottom>
              Who Are We?
            </Typography>
            <Typography variant="h6" component="h1" gutterBottom>
              AuditNow is a pioneering company specializing in the meticulous examination and assessment of smart contract codes. With an emphasis on ensuring security, reliability, and compliance, we offer expert auditing services that help organizations navigate the complexities of blockchain technology.
            </Typography>
          </div>
        </Grid>
      {/* Grid item for 'Our Team documentation' */}
        <Grid item xs={8} sm={6} md={6} style={{ textAlign: 'center', marginBottom: '80px'}} className="grid">
          <div>
            <Typography variant="h4" component="h1" gutterBottom>
              Our Team
            </Typography>
            <Typography variant="h6" component="h1" gutterBottom>
              Our team of skilled professionals meticulously review smart contract codes to identify vulnerabilities, mitigate risks, and enhance overall performance. By leveraging cutting-edge methodologies and industry best practices, we provide clients with actionable insights and recommendations that safeguard their digital assets and reputation.
            </Typography>
            <Typography variant="h4" component="h1" gutterBottom>
              Our Goal
            </Typography>
            <Typography variant="h6" component="h1" gutterBottom>
              At AuditNow, we're committed to fostering trust in blockchain ecosystems by delivering thorough and comprehensive smart contract audits that set the standard for security and excellence.
            </Typography>
          </div>
        </Grid>
        {/* Grid item for 'Team image logo' */}
        <Grid item xs={4} sm={6} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} style={{ marginBottom:'80px'}} className="grid">
          <div style={{ textAlign: 'center' }}>
            <img src={OurTeamImage} 
                 alt="ourteamimage" 
                 style={{ width: '100%', maxWidth: '400px', height: 'auto'}}/>
          </div>
        </Grid>
        {/* Imports 'Footer' */}
        <Grid item xs={12} sm={12} md={12} >
          <Footer /> //import function footer
        </Grid>
      </Grid>
    </Box>
  );
}
