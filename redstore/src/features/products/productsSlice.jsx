import { createSlice } from '@reduxjs/toolkit';

const loadFavoritesFromStorage = () => {
  try {
    const data = localStorage.getItem('favorites');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const loadwatchlistFromStorage = () => {
  try {
    const data = localStorage.getItem('watchlist');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState = {
  favorites: loadFavoritesFromStorage(),
  watchlist: loadwatchlistFromStorage(),
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const exists = state.favorites.find(p => p.id === action.payload.id);
      if (exists) {
        state.favorites = state.favorites.filter(p => p.id !== action.payload.id);
      } else {
        state.favorites.push(action.payload);
      }
      // Save to localStorage
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },

    toggleWatchlist: (state, action) => {
      const payload = action.payload;

      // Fallback logic to get image
      const thumb =
        payload.image ||
        payload.thumbnail ||
        (payload.images && payload.images[0]) ||
        '';

      const exists = state.watchlist.find(p => p.id === payload.id);

      if (exists) {
        state.watchlist = state.watchlist.filter(p => p.id !== payload.id);
      } else {
        state.watchlist.push({
          ...payload,
          thumbnail: thumb,
          image: thumb,
        });
      }
      localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
    }

  },
});

export const { toggleFavorite, toggleWatchlist } = productsSlice.actions;
export default productsSlice.reducer;
