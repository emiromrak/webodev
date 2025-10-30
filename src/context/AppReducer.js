// A S K İ Y E T L İ V E Z O R U N L U R E D U C E R A K S İ Y O N L A R I
export const ACTIONS = {
  FETCH_INIT: 'FETCH_INIT',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE',
  SET_QUERY: 'SET_QUERY',
  SET_FILTERS: 'SET_FILTERS',
  SET_PAGE: 'SET_PAGE',
  ADD_WATCHLIST: 'ADD_WATCHLIST',
  REMOVE_WATCHLIST: 'REMOVE_WATCHLIST',
  CLEAR_WATCHLIST: 'CLEAR_WATCHLIST',
};

const PAGE_SIZE = 6; // Zorunlu sayfa boyutu

export const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_INIT:
      return { ...state, loading: true, error: null };

    case ACTIONS.FETCH_SUCCESS:
      // TVMaze sonuçları { show: {...} } formatında gelir, sadece show objesini alıyoruz.
      const shows = action.payload.map(item => ({ ...item.show, score: item.score }));
      
      return {
        ...state,
        loading: false,
        data: shows,
        currentPage: 1, // Yeni aramada sayfayı sıfırla
        totalPages: Math.ceil(shows.length / PAGE_SIZE),
        error: null,
      };

    case ACTIONS.FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ACTIONS.SET_QUERY:
      return { ...state, query: action.payload };

    case ACTIONS.SET_FILTERS:
      // Sayfayı sıfırlayarak filtreleri uygula
      return { ...state, filters: { ...state.filters, ...action.payload }, currentPage: 1 };
      
    case ACTIONS.SET_PAGE:
      // Sayfa sınırlarını kontrol et
      if (action.payload < 1 || action.payload > state.totalPages) {
        return state;
      }
      return { ...state, currentPage: action.payload };
      
    case ACTIONS.ADD_WATCHLIST:
      // Zaten listede yoksa ekle (Dizi ID'sine göre kontrol)
      if (state.watchlist.some(item => item.id === action.payload.id)) {
        return state;
      }
      return { ...state, watchlist: [...state.watchlist, action.payload] };

    case ACTIONS.REMOVE_WATCHLIST:
      return {
        ...state,
        watchlist: state.watchlist.filter(item => item.id !== action.payload.id),
      };

    case ACTIONS.CLEAR_WATCHLIST:
      return { ...state, watchlist: [] };

    default:
      throw new Error(`Bilinmeyen aksiyon tipi: ${action.type}`);
  }
};

export const initialState = {
  data: [],            // API'den çekilen ham dizi listesi
  watchlist: [],       // Gösterime girecekler listesi
  loading: false,      // Yüklenme durumu
  error: null,         // Hata nesnesi
  query: 'friends',    // Varsayılan sorgu (Zorunlu)
  filters: {           // Filtre durumları
    genre: '',
    language: '',
    minRating: 0,
  },
  currentPage: 1,      // Geçerli sayfa numarası
  pageSize: PAGE_SIZE, // Sayfa boyutu: 6 (Zorunlu)
  totalPages: 1,       // Toplam sayfa sayısı
};