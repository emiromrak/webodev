import React from 'react';
import ReactDOM from 'react-dom/client';
// Varsayılan CSS'i (index.css) projemizde kullanmadığımız için kaldırıyoruz veya siliyoruz.
// import './index.css'; 

import App from './App'; // Yeni App.js'imizi import ediyoruz
// import reportWebVitals from './reportWebVitals'; // Bu da gereksiz

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* Yeni Router yapısı içeren App'i render ediyoruz */}
  </React.StrictMode>
);

// Eğer raporlama kullanmıyorsanız bu kısmı silebilirsiniz
// reportWebVitals();