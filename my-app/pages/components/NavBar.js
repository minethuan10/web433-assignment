import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

export default function NavigationBar() {
  const [searchId, setSearchId] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    setSearchId(e.target.value);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>
        <Link href="/">Weather App</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link href="/" passHref legacyBehavior>
            <a className="nav-link">Home</a>
          </Link>
          <Link href="/search" passHref legacyBehavior>
            <a className="nav-link">Search</a>
          </Link>
          <Link href="/History" passHref legacyBehavior>
            <a className="nav-link">Visited Cities</a>
          </Link>
        </Nav>
        <Form inline className="ml-auto">
          <FormControl 
            type="text" 
            placeholder="City ID" 
            className="mr-sm-2" 
            onChange={handleInputChange} 
          />
          <Link href={`/city/${searchId}`} passHref legacyBehavior>
            <a>
              <Button variant="outline-info">Search</Button>
            </a>
          </Link>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
