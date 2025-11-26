import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendAllBookings } from '../../hall/model/hallSlice';
import toast from 'react-hot-toast';

export const SendBookingsModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.hall);
  const [email, setEmail] = useState('');

  const handleSend = async () => {
    if (!email.trim()) {
      toast.error('Введите email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Неверный формат email');
      return;
    }

    try {
      const result = await dispatch(sendAllBookings(email)).unwrap();
      toast.success(result.message || 'Письмо успешно отправлено');
      closeModal();
    } catch (err) {
      const msg = err?.detail?.[0]?.msg || err?.message || 'Ошибка при отправке бронирований';
      toast.error(msg);
    }
  };

  return (
    <div className="p-6 rounded-xl bg-white shadow-lg w-[400px] mx-auto mt-10 flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Отправить все бронирования</h2>
      <input type="email" placeholder="Введите ваш email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
      <div className="flex justify-end gap-4 mt-4">
        <button onClick={closeModal} className="px-8 py-3 bg-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-300 transition-all">
          Отмена
        </button>
        <button onClick={handleSend} disabled={loading} className={`px-8 py-3 text-white font-bold rounded-xl transition-all ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:scale-105'}`}>
          {loading ? 'Отправка...' : 'Отправить'}
        </button>
      </div>
    </div>
  );
};
