// Md Araf Uddin(103485354)
// Xavier O'Leary (103734056)
 //Mohammad Danish Mohd Hazman (104139021)

 import HomePage from './home.js';
 import AuditPage from './auditpage.js';
 import ResultsPage from './resultspage.js';
 import HistoryPage from './history.js';
 import { Login } from './login.js';
 import { Register } from './register.js';
 import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
 import React, { useState } from 'react';
 import AuditButton from './auditbutton.js';
 import DataProvider from './dataContext.js';
 
 // Define the ParentComponent function component
 function ParentComponent() {
   // Initialize the showLogin state and setShowLogin function with useState
   const [showLogin, setShowLogin] = useState(true);
 
   // Handle form switching based on the formType parameter
   const handleFormSwitch = formType => {
     if (formType === 'register') {
       setShowLogin(false);
     } else {
       setShowLogin(true);
     }
   };
 
   // Render Login or Register component based on the showLogin state
   return (
     <div>
       {showLogin ? (
         <Login onFormSwitch={handleFormSwitch} />
       ) : (
         <Register onFormSwitch={handleFormSwitch} />
       )}
     </div>
   );
 }
 
 // Convert the App class to a functional component
 function App() {
   return (
     <>
       {/* Define the routing structure using React Router */}
       <DataProvider>
         <Routes>
           <Route path='' element={<HomePage />} /> {/* Route to the HomePage */}
           <Route path='/Audit' element={<AuditPage />} />
           {/* Route to the AuditPage  */}
           <Route path='/Results' element={<ResultsPage />} />
           {/* Route to the ResultsPage  */}
           <Route path='/History' element={<HistoryPage />} />
           {/* Route to the HistoryPage */}
           <Route path='/Login/Register' element={<ParentComponent />} />
           {/* Route to the ParentComponent for Login/Register */}
         </Routes>
       </DataProvider>
     </>
   );
 }
 
 export default App;