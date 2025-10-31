import React, { useContext, useEffect, useMemo } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppState';
import { ACTIONS } from '../context/AppReducer';
import SearchBox from '../components/SearchBox';
import Filters from '../components/Filters';
import TVList from '../components/TVList';
import WatchlistPanel from '../components/WatchlistPanel';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import Footer from '../components/common/Footer';

const Home = () => {
  const { state, dispatch } = useContext(AppContext);
  const { query, data, loading, error, currentPage, pageSize, filters } = state;

 
  useEffect(() => {
    let isMounted = true;

    if (!query) return;

    const fetchShows = async () => {
      dispatch({ type: ACTIONS.FETCH_INIT });
      try {

        const result = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
        
        if (isMounted) {
            dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: result.data });
        }
      } catch (err) {
        if (isMounted) {
          dispatch({ type: ACTIONS.FETCH_FAILURE, payload: "Dizi listesi yüklenirken bir hata oluştu." });
        }
      }
    };

    fetchShows();

    return () => {
        isMounted = false;
    };
  }, [query, dispatch]); 


  const paginatedAndFilteredData = useMemo(() => {

    const filtered = data.filter(item => {
      const show = item;
      const rating = show.rating?.average || 0;
   
      const ratingMatch = rating >= filters.minRating; 
      
      return ratingMatch;
    });


    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    

    const newTotalPages = Math.ceil(filtered.length / pageSize);
    if (state.totalPages !== newTotalPages && data.length > 0) {

    }

    return filtered.slice(start, end);
  }, [data, currentPage, pageSize, filters, state.totalPages]);


  return (
    <div className="container">
      <header className="header-panel">
        <SearchBox dispatch={dispatch} currentQuery={query} />
        <Filters dispatch={dispatch} currentFilters={filters} />
      </header>

      <main className="main-layout">
        <section className="tv-list-section">
          {}
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} onRetry={() => dispatch({ type: ACTIONS.SET_QUERY, payload: state.query })} />
          ) : data.length === 0 ? (
            <div className="empty-state">
              <p>😢 Aradığınız kritere uygun dizi bulunamadı.</p>
            </div>
          ) : (
            <>
              <TVList shows={paginatedAndFilteredData} />
              <Pagination state={state} dispatch={dispatch} filteredLength={paginatedAndFilteredData.length} />
            </>
          )}
        </section>

        <WatchlistPanel watchlist={state.watchlist} dispatch={dispatch} />
      </main>

      <Footer name="Emir OMRAK" />
    </div>
  );
};

export default Home;
