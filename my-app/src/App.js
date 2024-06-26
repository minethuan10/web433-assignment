// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search';
import VisitedCities from './components/VisitedCities';
import CityDetail from './components/CityDetail';

import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    // Load visited cities from local storage
    const savedCities = localStorage.getItem('recentlyViewed');
    return savedCities ? JSON.parse(savedCities) : [];
  });
  const [searchId, setSearchId] = useState('');

  const handleViewCity = (id) => {
    setRecentlyViewed((prev) => {
      const updated = prev.includes(id) ? prev : [...prev, id];
      localStorage.setItem('recentlyViewed', JSON.stringify(updated)); // Save to local storage
      return updated;
    });
  };

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Navbar.Brand as={Link} to="/">Weather App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/search">Search</Nav.Link>
            <NavDropdown title="Previously Viewed" id="basic-nav-dropdown">
              {recentlyViewed.length > 0 ? (
                recentlyViewed.map((id, index) => (
                  <NavDropdown.Item as={Link} to={`/city/${id}`} key={index}>
                    City ID: {id}
                  </NavDropdown.Item>
                ))
              ) : (
                <NavDropdown.Item>No cities</NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
          <Form className="d-flex ml-auto">
            <FormControl
              type="text"
              placeholder="City ID"
              className="mr-sm-2"
              onChange={(e) => setSearchId(e.target.value)}
            />
            <Button as={Link} to={`/city/${searchId}`} variant="outline-success">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home onViewCity={handleViewCity} />} />
        <Route path="/search" element={<Search onViewCity={handleViewCity} />} />
        <Route path="/city/:id" element={<CityDetail onViewCity={handleViewCity} />} />
        <Route path="/visited" element={<VisitedCities cities={recentlyViewed} />} />
      </Routes>
    </Router>
  );
};

export default App;
