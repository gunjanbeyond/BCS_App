import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/Images/BregLogo.png';
import UserProfileIcon from '../../assets/Images/UserProfileIcon.png';
import LogOutIcon from '../../assets/Images/LogOutIcon.png';

const Header = () => {
  const { accounts, instance } = useMsal();
  const navigate = useNavigate();
  const handleProfileClick = () => {

    if (accounts.length === 0) {

      instance.loginRedirect();
    } else {
      instance.logout();
      // navigate('/');
    }
  };

  return (
    <header className="fixed-top">
      <Navbar expand="lg" className="bg-body-tertiary px-3 navfont">
        <Container fluid>
          <Navbar.Brand href="#home">
            <img
              src={Logo}
              width="120"
              height="40"
              alt="BCS Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={handleProfileClick}>
                {accounts.length === 0 ? (
                  <span style={{ fontWeight: 'bold' }}>Login</span>
                ) : (
                  <>
                    <div className="d-flex align-items-center justify-content-between gap-3">
                      <div className="d-inline-flex align-items-center gap-2">
                        <img
                          src={UserProfileIcon} width="30"
                          height="30"
                          alt="User Profile Icon"
                        />
                        <span>{accounts[0].username}</span>
                      </div>
                      <div className="d-inline-flex align-items-center gap-2">
                        <span style={{ fontWeight: 'bold' }}>Logout</span>
                        <img
                          src={LogOutIcon} width="30"
                          height="30"
                          alt="Logout Icon"
                        />
                      </div>
                    </div>
                  </>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;