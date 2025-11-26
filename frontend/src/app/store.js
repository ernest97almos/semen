import { configureStore } from '@reduxjs/toolkit';
import movieSlice from './../entities/movies/model/movieSlice';
import hallSlice from './../entities/hall/model/hallSlice';

export const store = configureStore({
  reducer: {
    movie: movieSlice,
    hall: hallSlice,
  },
});
