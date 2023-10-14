//Mohammad Danish Mohd Hazman (104139021)

import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


// Styles for the footer
const footerStyle = {
  position: 'fixed', // Fixed position at the bottom
  bottom: 0, // Stick to the bottom
  width: '100%', // Full width
  backgroundColor: 'black', // Background color
  padding: '10px 0', // Padding at the top and bottom
  borderTop: '1px solid #ccc', // Top border
  textAlign: 'center', // Center-align text
  marginTop: '200px'
};

// Styles for text within the footer
const textStyle = {
  textAlign: 'center', // Center-align text
  color: 'white', // Text color is white
};

// Styles for contact information within the footer
const contactStyle = {
  display: 'flex', // Display elements in a row
  justifyContent: 'left', // Align elements to the left
  alignItems: 'left', // Align elements to the left
  marginTop: '10px', // Margin at the top
  color: 'white', // Text color is white
};

// Styles for icons within the footer
const iconStyle = {
  marginRight: '10px', // Margin on the right side of icons
};

// Footer component for every page
function Footer() {
  return (
    <footer style={footerStyle}>
      <Container>
        {/* Registered Trademark */}
        <Typography variant="h9" style={textStyle}>
          © AuditNow. All Rights Reserved
        </Typography>
        {/* Phone Number */}
        <div style={contactStyle}>
          <span style={iconStyle}>📞</span>
          <Typography variant="body1">Call Us: +610000000</Typography>
        </div>
        {/* Email */}
        <div style={contactStyle}>
          <span style={iconStyle}>📧</span>
          <Typography variant="body1">Email Your Enquiries: auditnow@enquiries.com</Typography>
        </div>
      </Container>
    </footer>
  );
}


export default Footer;
