import { React, useState, useEffect } from 'react';
import { InteractionRequiredAuthError, InteractionStatus, } from "@azure/msal-browser";
import { useMsal } from '@azure/msal-react';
import { useNavigate, Navigate } from 'react-router-dom';
import config from '../../config';
import Logo from '../../assets/Images/BregLogo.png';
import './AuthComponent.css';

const AuthComponent = () => {
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();

  const loginRequest = {
    scopes: ['openid', 'profile', 'User.Read'],
  };

  useEffect(() => {
    async function fetchData() {
      // You can await here
      await instance.initialize();
      await instance.handleRedirectPromise();
      instance.handleRedirectPromise().then(handleResponse).catch(console.error);
    }

    fetchData();
  }, []);

  const handleLogin = async () => {
    try {
      await instance.loginRedirect(loginRequest);

      navigate('/ordertype');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleResponse = (response) => {
    console.log("response")
    if (response) {
      const accounts = instance.getAllAccounts();
      if (accounts.length > 0) {
        instance.acquireTokenSilent({
          account: accounts[0], // Use the first account for silent token acquisition
          scopes: ['api://e0e20fda-187a-4a59-a919-107fa3e402bc/ReadWrite']
        }).then((response) => {
          localStorage.setItem('token', response.accessToken);

          // Use the acquired token to call Microsoft Graph API to get the user's security groups
          fetch('https://graph.microsoft.com/v1.0/me/memberOf', {
            headers: {
              Authorization: `Bearer ${response.accessToken}`
            }
          }).then(response => response.json())
            .then(data => {
              console.log(data)

              //const securityGroups = data.value.filter(group => group.securityEnabled);
              // const inSecurityGroup = data.value.some(item => config.SecurityGroup == item.id)
              // alert('inSecurityGroup: ' + inSecurityGroup);
              // if (inSecurityGroup == false) {
              //   navigate('/unauthorized');
              // }
              //setSecurityGroups(securityGroups);
            }).catch(console.error);
        }).catch(error => {
          console.error('Silent token acquisition failed:', error);
          // If silent token acquisition fails, prompt the user to sign in interactively
          instance.loginRedirect();
        });
      } else {
        console.error('no active accounts');
        // If there are no active accounts, prompt the user to sign in interactively
        instance.loginRedirect();
      }
    }
  };

  const handleLogout = () => {

    instance.logoutRedirect();
    navigate('/');
  };

  const handleGoToNext = () => {

    navigate('/ordertype');
  };

  return (
    <div>
      <main className="authcontainer">
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
            <h5>Welcome to BCS  sandeep & gunjan (BCS team)!</h5>
            {accounts.length === 0 ? (
              <div>
                <button className="login-button" onClick={handleLogin}>
                  LOGIN
                </button>
              </div>
            ) : (
              <Navigate to="/orderType" />
            )}
          </div>
          <div className="authfoot">
            <p>&copy; 2024, All rights reserved.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthComponent;