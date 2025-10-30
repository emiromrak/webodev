import React, { useState } from 'react';
import { ACTIONS } from '../context/AppReducer';

const SearchBox = ({ dispatch, currentQuery }) => {
  const [input, setInput] = useState(currentQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== currentQuery && input.trim() !== '') {
      dispatch({ type: ACTIONS.SET_QUERY, payload: input.trim() });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-box">
      <input
        type="text"
        placeholder="Dizi Adı Ara..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Ara</button>
    </form>
  );
};

export default SearchBox;