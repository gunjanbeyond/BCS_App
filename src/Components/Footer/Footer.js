import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Footer = () => {
  return (
    <footer className="fixed-bottom">
      <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary px-3 navfont">
        <Container fluid>
          <div className="d-flex mx-auto">
            <Navbar.Text>
              &copy; 2024, All rights reserved.
            </Navbar.Text>
          </div>
        </Container>
      </Navbar>
    </footer>
  );
};

export default Footer;