import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOccupiedSeats, bookSeat } from '../../entities/hall/model/hallSlice';
import toast from 'react-hot-toast';
import bg from '../../shared/assets/bg.jpg';

const ROWS = [6, 8, 10, 12, 14, 14, 12, 10, 8, 6];

const Hall = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const occupiedSeats = useSelector((state) => state.hall.occupiedSeats);
  const bookingStatus = useSelector((state) => state.hall.bookingStatus);
  const bookingError = useSelector((state) => state.hall.bookingError);
  const ticketEmail = useSelector((state) => state.hall.ticketEmail);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [showBookingModal, setShowBookingModal] = useState(false);

  const [email, setEmail] = useState('');

  const movies = [
    { id: 1, name: 'Каратэ-пацан: Легенды' },
    { id: 2, name: 'Миссия невыполнима: Финальная расплата' },
    { id: 3, name: 'Игры возмездия' },
    { id: 4, name: 'Балерина' },
    { id: 5, name: 'Как приручить дракона' },
    { id: 6, name: 'Лило и Стич' },
  ];

  useEffect(() => {
    const movie = movies.find((m) => m.id === Number(id)) || movies[0];
    setSelectedMovie(movie);
    setSelectedSeats([]);
    dispatch(getOccupiedSeats(Number(id)));
  }, [id, dispatch]);

  const handleSeatClick = (seatIndex) => {
    if (occupiedSeats.includes(seatIndex)) return;
    setSelectedSeats((prev) => (prev.includes(seatIndex) ? prev.filter((s) => s !== seatIndex) : [...prev, seatIndex]));
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      toast.error('Выберите хотя бы одно место');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      toast.error('Поле email обязательно');
      return;
    } else if (!emailRegex.test(email)) {
      toast.error('Неверный формат email');
      return;
    }

    if (selectedSeats.length > 6) {
      toast.error('Нельзя забронировать больше 6 мест одновременно');
      return;
    }

    try {
      await dispatch(
        bookSeat({
          movieId: Number(selectedMovie.id),
          seatIds: selectedSeats.map((s) => s + 1),
          email,
        })
      ).unwrap();
      setSelectedSeats([]);
      setShowBookingModal(false);
      dispatch(getOccupiedSeats(Number(selectedMovie.id)));
      toast.success('Бронирование успешно');
    } catch (err) {
      toast.error('Ошибка бронирования: ' + (err?.message || err));
    }
  };

  const seatStyles = {
    free: 'bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 text-white shadow-lg',
    occupied: 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-inner',
    selected: 'bg-green-500 text-white shadow-xl scale-110',
  };

  let seatCounter = 0;
  const maxSeats = Math.max(...ROWS);

  if (!selectedMovie) return <div>Загрузка фильма...</div>;

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0">
        <img src={bg} alt="Cinema Hall" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
      </div>

      <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-white my-6">{selectedMovie.name}</h1>

      <div className="relative z-10 flex flex-col items-center gap-4 w-[90%]">
        {ROWS.map((seatsInRow, rowIndex) => {
          const row = Array.from({ length: seatsInRow }, () => seatCounter++);
          const emptySlots = (maxSeats - seatsInRow) / 2;

          return (
            <div key={rowIndex} className="flex items-center justify-center gap-2">
              <div className="w-6 text-center text-white font-bold text-lg">{rowIndex + 1}</div>

              {Array(Math.floor(emptySlots))
                .fill(null)
                .map((_, i) => (
                  <div key={`spacer-left-${i}`} className="w-12 h-12"></div>
                ))}

              {row.map((seat) => {
                const isOccupied = occupiedSeats.includes(seat);
                const isSelected = selectedSeats.includes(seat);
                const seatClass = isOccupied ? seatStyles.occupied : isSelected ? seatStyles.selected : seatStyles.free;

                return (
                  <button key={seat} className={`w-12 h-12 rounded-2xl flex justify-center items-center font-semibold transition-all hover:scale-110 ${seatClass}`} onClick={() => handleSeatClick(seat)}>
                    {seat + 1}
                  </button>
                );
              })}

              {Array(Math.ceil(emptySlots))
                .fill(null)
                .map((_, i) => (
                  <div key={`spacer-right-${i}`} className="w-12 h-12"></div>
                ))}

              <div className="w-6 text-center text-white font-bold text-lg">{rowIndex + 1}</div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => {
          setEmail(ticketEmail || '');
          setShowBookingModal(true);
        }}
        className="relative z-10 mt-6 px-8 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold rounded-xl hover:scale-105 transition-all"
      >
        Забронировать
      </button>

      {showBookingModal && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Бронирование мест</h2>
            <p>Выбрано мест: {selectedSeats.map((s) => s + 1).join(', ')}</p>

            <input type="email" placeholder="Ваш email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" />

            <div className="flex justify-end gap-4 mt-4">
              <button onClick={() => setShowBookingModal(false)} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-all">
                Отмена
              </button>
              <button onClick={handleBooking} className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-all">
                Забронировать
              </button>
            </div>

            {bookingStatus === 'loading' && <p className="text-gray-500 mt-2">Обработка...</p>}
            {bookingError && <p className="text-red-500 mt-2">{bookingError}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Hall;
