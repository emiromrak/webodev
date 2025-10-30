import React from 'react';
import TVCard from './TVCard';

const TVList = ({ shows }) => {
  return (
    <div className="tv-list-grid">
      {shows.map((show) => (
        <TVCard key={show.id} show={show} />
      ))}
    </div>
  );
};

export default TVList;