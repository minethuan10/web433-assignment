import React from 'react';

const SearchBar = ({ query, setQuery, onSearch, error }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') onSearch();
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="form-control"
          placeholder="Enter city name or city_name,country_code"
        />
        <button onClick={onSearch} className="btn btn-primary mt-2">Search</button>
        {error && <div className="text-danger mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default SearchBar;
