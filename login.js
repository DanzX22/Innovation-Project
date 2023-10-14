// Md Araf Uddin(103485354)
// Import necessary React components and libraries
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import ResponsiveAppBar from "./header"; // Import the header component
import Typography from '@mui/material/Typography';
import Footer from "./footer.js"; // Import the footer component
import './loginsignup.css'; // Import a CSS file for styling

// Define the Login functional component
export const Login = (props) => {
  // Initialize state variables for email and password
  const [email, setEmail] = useState(''); 
  const [pass, setPass] = useState(''); 

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email); // Log the email to the console (for testing)
  }

  // JSX structure of the Login component
  return (
    <Grid container justifyContent="center" alignItems={"center"}>
      <Grid item xs={12} sm={12} md={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '100px' }}>
        <ResponsiveAppBar />
      </Grid>

      <Grid item xs={12} sm={8} md={6} lg={4} style={{ display: 'flex', justifyContent: 'center', marginBottom: '130px' }}>
        <div className="auth-form-container">
          <Typography variant="h5" component="h1" gutterBottom>
            SIGN IN
          </Typography>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="youremail@gmail.com"
              id="email"
              name="email"
            />
            <label htmlFor="password">Password</label>
            <input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              placeholder="********"
              id="password"
              name="password"
            />
            <button type="submit">Log In</button>
          </form>
          <button
            className="link-btn"
            onClick={() => props.onFormSwitch("register")}
          >
            Don't have an account? Register here
          </button>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Footer />
      </Grid>
    </Grid>
  );
};
