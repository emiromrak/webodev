import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppState';
import { ACTIONS } from '../context/AppReducer';

const TVCard = ({ show }) => {
  const { dispatch } = useContext(AppContext);
  const rating = show.rating?.average || 'N/A';
  // HTML etiketlerini temizle ve özeti kısalt
  const summary = show.summary ? show.summary.replace(/<[^>]+>/g, '').substring(0, 100) + '...' : 'Özet yok.';
  const imageUrl = show.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image';

  const handleAddToWatchlist = () => {
    dispatch({ type: ACTIONS.ADD_WATCHLIST, payload: show });
  };

  return (
    <div className="tv-card">
      <img src={imageUrl} alt={show.name} />
      <div className="card-info">
        <h3>{show.name}</h3>
        <p>
          **Tür:** {show.genres?.join(', ') || 'N/A'} | **Dil:** {show.language || 'N/A'}
        </p>
        <p className='rating'>
          **Puan:** **{rating}**
        </p>
        <p className="summary">{summary}</p>
        <div className="card-actions">
          <Link to={`/detail/${show.id}`} className="button detail">
            Detay
          </Link>
          <button onClick={handleAddToWatchlist} className="button add-list">
            Kısa Listeye Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default TVCard;