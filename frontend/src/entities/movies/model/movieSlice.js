import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrl } from '../../../shared/lib/utilits';
import axios from 'axios';

export const getMovies = createAsyncThunk('movie/getMovies', async () => {
  const response = await axios.get(`${apiUrl}/movies/`);
  return response.data;
});

const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.map((movie) => ({
          ...movie,
          image: `/movies/${movie.id}.jpg`,
        }));
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;
