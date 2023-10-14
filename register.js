//Md Araf Uddin (103485354)
// Import necessary React components and libraries
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import ResponsiveAppBar from "./header"; // Import the header component
import Footer from "./footer"; // Import the footer component
import './loginsignup.css'; // Import a CSS file for styling
import Typography from '@mui/material/Typography';

// Define the Register functional component
export const Register = (props) => {
  // Initialize state variables for email, password, and name
  const [email, setEmail] = useState(''); 
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  // Function to handle form submission
  const handleSubmit = (e)=> {
    e.preventDefault();
    console.log(email); // Log the email to the console (for testing)
  }

  // JSX structure of the Register component
  return (
    <Grid container justifyContent="center" alignItems={"center"}>
      <Grid item xs={12} sm={12} md={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '100px' }}>
        <ResponsiveAppBar />
      </Grid>
      <Grid item xs={12} sm={8} md={6} lg={4} style={{ display: 'flex', justifyContent: 'center', marginBottom: '130px' }}>
        <div className="auth-form-container">
          <Typography variant="h5" component="h1" gutterBottom>
            CREATE AN ACCOUNT
          </Typography>
          <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name" >Full Name </label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" />
            <label htmlFor='Email'>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="Email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor='Password'>Password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="Password" placeholder="********" id="password" name="password" />
            <button type='Submit'>Register</button>
          </form>
          <button className= "link-btn" onClick={() => props.onFormSwitch('login')}> Already have an account? Log In </button>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Footer />
      </Grid>
    </Grid>
  );
}
