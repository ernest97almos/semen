import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMovies } from './../../entities/movies/model/movieSlice';

const Movie = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.data);
  const isLoading = useSelector((state) => state.movie.isLoading);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  return (
    <section className="relative flex flex-col items-center justify-center px-6 py-16 sm:py-24 min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 overflow-hidden">
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-purple-200 rounded-full opacity-20 blur-3xl -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-200 rounded-full opacity-15 blur-3xl"></div>

      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-10 text-center">Фильмы в прокате</h1>
      <p className="text-gray-600 mb-10 max-w-2xl text-center text-base sm:text-lg">Добро пожаловать в наш киносайт! Ознакомьтесь с актуальными фильмами, доступными для просмотра в ближайшее время.</p>

      {isLoading ? (
        <div className="text-gray-500">Загрузка фильмов...</div>
      ) : (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 relative z-10 justify-center">
          {movies.map((movie) => (
            <Link to={`${movie.id}`} key={movie.id} className="relative bg-white rounded-[20px] shadow-[0_8px_20px_rgba(0,0,0,0.1)] overflow-hidden transition-transform duration-500 hover:scale-105 hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)] max-w-[270px] mx-auto">
              <div className="overflow-hidden rounded-t-[20px]">
                <img src={movie.image} alt={movie.title} className="w-full h-[380px] object-cover transition-transform duration-700 hover:scale-105" />
              </div>

              <div className="p-5 text-center">
                <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-2">{movie.title}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {movie.genre
                    .split(',')
                    .map((g) => g.trim())
                    .join(', ')}
                </p>
              </div>

              <div className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full bg-purple-200 opacity-30 blur-3xl"></div>
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-pink-200 opacity-30 blur-3xl"></div>
            </Link>
          ))}
        </div>
      )}

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-50"></div>
    </section>
  );
};

export default Movie;
