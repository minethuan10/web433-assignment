// components/VisitedCities.js
import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const VisitedCities = ({ cities }) => {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Visited Cities</h1>
      {cities.length > 0 ? (
        <ListGroup>
          {cities.map((id, index) => (
            <ListGroup.Item key={index}>
              <Link to={`/city/${id}`}>City ID: {id}</Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p className="text-center">No cities visited yet.</p>
      )}
    </div>
  );
};

export default VisitedCities;
