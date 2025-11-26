import React from 'react';
import facebook from '../shared/assets/facebook.png';
import telegram from '../shared/assets/telegram.png';
import instagram from '../shared/assets/instagram.png';
import youtube from '../shared/assets/youtube.png';

const Footer = () => {
  return (
    <div className="w-full bg-gradient-to-r from-purple-50 via-blue-50 to-green-50 shadow-inner py-12 border-t border-gray-200">
      <footer className="max-w-[90%] m-auto">
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-8">
          <div className="flex flex-col md:flex-row md:gap-20 items-start md:items-center">
            <h1 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 font-bold cursor-pointer mb-4 md:mb-0">КиноСайт</h1>
            <ul className="flex flex-wrap md:flex-nowrap gap-5 md:gap-8 text-black font-semibold">
              <li className="cursor-pointer hover:text-purple-600 transition">О проекте</li>
              <li className="cursor-pointer hover:text-purple-600 transition">Реклама</li>
              <li className="cursor-pointer hover:text-purple-600 transition">Кинотеатры</li>
              <li className="cursor-pointer hover:text-purple-600 transition">FAQ</li>
            </ul>
          </div>

          <div className="flex gap-5">
            <img className="w-10 rounded-xl cursor-pointer hover:scale-110 transition" src={facebook} alt="Facebook" />
            <img className="w-10 rounded-xl cursor-pointer hover:scale-110 transition" src={telegram} alt="Telegram" />
            <img className="w-10 rounded-xl cursor-pointer hover:scale-110 transition" src={instagram} alt="Instagram" />
            <img className="w-10 rounded-xl cursor-pointer hover:scale-110 transition" src={youtube} alt="YouTube" />
          </div>
        </section>

        <section className="flex flex-col md:flex-row justify-between gap-10 mb-10">
          <div className="text-black md:w-1/3">
            <h2 className="text-xl font-bold mb-3">Контакты</h2>
            <p className="text-gray-700 mb-1">Адрес: г. Москва, ул. Примерная, 123</p>
            <p className="text-gray-700 mb-1">Телефон: +7 123 456 789</p>
            <p className="text-gray-700 mb-1">Email: info@kino.ru</p>
            <p className="text-gray-700">Время работы: Пн-Пт 9:00 — 18:00</p>
          </div>
        </section>

        <section className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-5 text-gray-600 text-center md:text-left gap-3">
          <p>© 2025 — 2025. Все права защищены.</p>
          <p className="underline cursor-pointer hover:text-purple-600 transition">Политика конфиденциальности</p>
        </section>
      </footer>
    </div>
  );
};

export default Footer;
