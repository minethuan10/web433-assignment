// pages/History.js

import { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { visitedCitiesAtom } from './atoms/jotai'; // Adjust path as per your structure

const History = () => {
  const [visitedCities] = useAtom(visitedCitiesAtom);

  useEffect(() => {
    // Fetch or update history data if needed
  }, []); // Add dependencies if necessary for fetching data

  return (
    <div className="container mt-5">
      <h1 className="text-center">History Page</h1>
      {visitedCities.length > 0 ? (
        <ListGroup>
          {visitedCities.map((city, index) => (
            <ListGroup.Item key={index}>
              <Link href={`/city/${city.id}`}>
                <a>City ID: {city.id}</a>
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p className="text-center">No history yet.</p>
      )}
    </div>
  );
};

export default History;
