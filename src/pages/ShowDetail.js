import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useE?ect: İki ayrı API çağrısını yönetme
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Dizi Bilgileri (axios)
        const showRes = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        // 2. Bölüm Listesi (axios, Ayrı API çağrısı)
        const episodesRes = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`);
        
        setShow(showRes.data);
        setEpisodes(episodesRes.data);
        setLoading(false);
      } catch (err) {
        setError("Dizi detayları yüklenirken bir sorun oluştu.");
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  // Koşullu Render
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!show) return <div className="empty-state">Dizi bulunamadı.</div>;

  const cleanSummary = show.summary ? show.summary.replace(/<[^>]+>/g, '') : 'Özet bilgisi mevcut değil.';

  return (
    <div className="show-detail-page">
      <h2>{show.name} ({show.premiered?.substring(0, 4)})</h2>
      <div className="detail-header">
        <img src={show.image?.original || 'https://via.placeholder.com/300x420?text=No+Image'} alt={show.name} />
        <div className="show-info">
          <p>
            **Puan:** **{show.rating?.average || 'N/A'}** / 10
          </p>
          <p>
            **Türler:** {show.genres?.join(', ') || 'N/A'}
          </p>
          <p>
            **Durum:** {show.status}
          </p>
          <p className='detail-summary'>
            **Özet:** {cleanSummary}
          </p>
        </div>
      </div>

      <div className="episode-list-container">
        <h3>Bölümler ({episodes.length})</h3>
        {/* Bölüm Listesi */}
        <ul className='episode-list'>
          {episodes.map((ep) => (
            <li key={ep.id}>
              **S{ep.season.toString().padStart(2, '0')}E{ep.number.toString().padStart(2, '0')}**: {ep.name}
              <small> ({ep.airdate})</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShowDetail;