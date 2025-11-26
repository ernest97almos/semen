import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../../../shared/lib/utilits';

export const getOccupiedSeats = createAsyncThunk('hall/getOccupiedSeats', async (movieId, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${apiUrl}/bookings/${movieId}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Ошибка');
  }
});

export const getTickets = createAsyncThunk('hall/getTickets', async ({ email }, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${apiUrl}/bookings/${email}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Ошибка при отправке на почту');
  }
});

export const bookSeat = createAsyncThunk('booking/bookSeat', async ({ movieId, seatIds, email }, thunkAPI) => {
  try {
    const response = await axios.post(`${apiUrl}/bookings-multiple/`, {
      movie_id: movieId,
      seat_ids: seatIds,
      email,
    });
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const sendAllBookings = createAsyncThunk('hall/sendAllBookings', async (email, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${apiUrl}/send-all-bookings/`, { email });
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Ошибка при отправке писем');
  }
});

const hallSlice = createSlice({
  name: 'hall',
  initialState: {
    occupiedSeats: [],
    ticketEmail: '',
    loading: false,
    error: null,
    bookingStatus: 'idle',
    bookingError: null,
    successMessage: null,
  },
  reducers: {
    clearSelectedSeats(state) {
      state.occupiedSeats = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOccupiedSeats.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOccupiedSeats.fulfilled, (state, action) => {
        state.loading = false;
        state.occupiedSeats = action.payload.map((seat) => seat.seat_id - 1);
      })
      .addCase(getOccupiedSeats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTickets.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(bookSeat.pending, (state) => {
        state.bookingStatus = 'loading';
        state.bookingError = null;
      })
      .addCase(bookSeat.fulfilled, (state, action) => {
        state.bookingStatus = 'succeeded';
        state.ticketEmail = action.meta.arg.email;
      })
      .addCase(bookSeat.rejected, (state, action) => {
        state.bookingStatus = 'failed';
        state.bookingError = action.payload;
      })
      .addCase(sendAllBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message || 'Письмо успешно отправлено';
      })
      .addCase(sendAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedSeats } = hallSlice.actions;
export default hallSlice.reducer;
