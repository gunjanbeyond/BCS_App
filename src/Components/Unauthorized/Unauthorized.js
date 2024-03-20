import {React, useState, useEffect} from 'react';
import { useMsal } from '@azure/msal-react';
import Logo from '../../assets/Images/BregLogo.png';


const Unauthorized = () => {
  const { instance, accounts } = useMsal();

  const logout = ()=>{
    instance.logout();
  }

  useEffect(() => {
    instance.clearCache();
  }, []);

  return (
    <div className="authcontainer">
    <main>
      <div className="authscreen">
        <div className="authhead">
          <img
            src={Logo}
            width="200"
            height="70"
            className="d-inline-block align-top"
            alt="BCS Logo"
          />
        </div>
        <div className="authintro">
        <h3>Unauthorized Access</h3>
        <p>You do not have permission to access this page.</p>
        <a href="/" className="login-button" onClick={logout}>Go Back</a>
        
        </div>     
        <div className="authfoot">
        <p>&copy; 2024, All rights reserved.</p> 
        </div>
      </div>
    </main>
  </div>
  
    
  );
};

export default Unauthorized;
