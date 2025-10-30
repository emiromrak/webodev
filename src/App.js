import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// AppState, Context klasöründen default export ile çekiliyor
import AppState from './context/AppState'; 
import Home from './pages/Home';
import ShowDetail from './pages/ShowDetail';
import './App.css'; 

function App() {
  return (
    // Uygulama genelinde useReducer state'ini AppState ile sarmalıyoruz
    <AppState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Dizi detayları için dinamik rota */}
          <Route path="/detail/:id" element={<ShowDetail />} />
          {/* Tanımlanmayan tüm yollar için Home'a yönlendirme */}
          <Route path="*" element={<Home />} /> 
        </Routes>
      </Router>
    </AppState>
  );
}

export default App;
