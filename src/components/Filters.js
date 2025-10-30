import React from 'react';
import { ACTIONS } from '../context/AppReducer';

const Filters = ({ dispatch, currentFilters }) => {
  const handleRatingChange = (e) => {
    dispatch({
      type: ACTIONS.SET_FILTERS,
      payload: { minRating: parseFloat(e.target.value) },
    });
  };

  return (
    <div className="filters-panel">
      <label>
        Min. Puan:
        <select value={currentFilters.minRating} onChange={handleRatingChange}>
          <option value="0">0+</option>
          <option value="5">5+</option>
          <option value="7">7+</option>
          <option value="8">8+</option>
        </select>
      </label>
      {/* İstenirse buraya Tür ve Dil filtreleri eklenebilir */}
    </div>
  );
};

export default Filters;