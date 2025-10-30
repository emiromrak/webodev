import React from 'react';
import { ACTIONS } from '../context/AppReducer';

const WatchlistPanel = ({ watchlist, dispatch }) => {
  const handleRemove = (show) => {
    dispatch({ type: ACTIONS.REMOVE_WATCHLIST, payload: show });
  };

  const handleClear = () => {
    dispatch({ type: ACTIONS.CLEAR_WATCHLIST });
  };

  return (
    <aside className="watchlist-panel">
      <h3>🎬 Gösterime Girecekler ({watchlist.length})</h3>
      {watchlist.length === 0 ? (
        <p className="empty-message">Henüz kısa listede dizi yok.</p>
      ) : (
        <>
          <button onClick={handleClear} className="clear-button">
            Listeyi Temizle
          </button>
          <ul>
            {watchlist.map((show) => (
              <li key={show.id}>
                <span>{show.name}</span>
                <button onClick={() => handleRemove(show)}>Kaldır</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
};

export default WatchlistPanel;