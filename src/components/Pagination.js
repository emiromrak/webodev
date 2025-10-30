import React from 'react';
import { ACTIONS } from '../context/AppReducer';

const Pagination = ({ state, dispatch }) => {
  const { currentPage, totalPages } = state;

  // Filtreleme yapıldığı zaman toplam sayfa sayısı Home.js'te hesaplanıp state'e yansıtılmadığı için,
  // Burada sadeleştirilmiş bir kontrol kullanıyoruz.
  
  if (totalPages <= 1) return null; // Tek sayfa ise gösterme

  const setPage = (page) => {
    dispatch({ type: ACTIONS.SET_PAGE, payload: page });
  };

  return (
    <div className="pagination-controls">
      <button
        onClick={() => setPage(1)}
        disabled={currentPage === 1}
      >
        İlk
      </button>
      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Geri
      </button>
      <span>
        Sayfa **{currentPage}** / **{totalPages}**
      </span>
      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        İleri
      </button>
      <button
        onClick={() => setPage(totalPages)}
        disabled={currentPage === totalPages}
      >
        Son
      </button>
    </div>
  );
};

export default Pagination;