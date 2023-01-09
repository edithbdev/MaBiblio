import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

const NavBar = () => {
  const location = useLocation();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">MY LIBRARY BOOKS</Navbar.Brand>
        <Nav className="justify-content-end">
          <Link to="/" className={"navItem" + (url === "/" ? " active" : "")}>Home</Link>
          <Link to="/myLibrary" className={"navItem" + (url === "/myLibrary" ? " active" : "")}>My library</Link>
          <Link to="/search" className={"navItem" + (url === "/search" ? " active" : "")}>Search</Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
