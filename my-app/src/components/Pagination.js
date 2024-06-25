import React from 'react';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPrev, onNext }) => {
  return (
    <div className="d-flex justify-content-center mt-3">
      <button onClick={onPrev} className="btn btn-secondary mr-2" disabled={currentPage === 0}>Previous</button>
      <button onClick={onNext} className="btn btn-secondary" disabled={(currentPage + 1) * itemsPerPage >= totalItems}>Next</button>
    </div>
  );
};

export default Pagination;
