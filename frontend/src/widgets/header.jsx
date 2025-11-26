import React, { useState } from 'react';
import { Link } from 'react-router';
import { SendBookingsModal } from '../entities/movies/ui/sendBookings';

const Header = () => {
  const [showBookingsModal, setShowBookingsModal] = useState(false);

  return (
    <header className="relative z-50 w-full bg-gradient-to-r from-purple-50 via-blue-50 to-green-50 shadow-md flex items-center justify-between px-8 py-4">
      <Link to="/" className="flex items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text select-none">КиноСайт</h1>
      </Link>

      <button onClick={() => setShowBookingsModal(true)} className="px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold rounded-xl hover:scale-105 transition-transform">
        Мои бронирования
      </button>

      {showBookingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <SendBookingsModal closeModal={() => setShowBookingsModal(false)} />
        </div>
      )}
    </header>
  );
};

export default Header;
