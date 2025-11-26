import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router';

function getRandomMovies(array, count) {
  const random = [...array].sort(() => 0.5 - Math.random());
  return random.slice(0, count);
}

const MovieById = () => {
  let { id } = useParams();

  const data = useSelector((state) => state.movie.data);

  const movie = data.find((e) => e.id === Number(id));
  if (!movie) return <div>Фильм не найден</div>;

  const movies = data.filter((e) => e.id !== movie.id);
  const randomProducts = getRandomMovies(movies, 4);

  return (
    <section className="my-[40px] max-w-[90%] mx-auto">
      <div className="flex items-center flex-wrap text-[18px] gap-[20px]">
        <Link to={'/'}>
          <h3 className="text-purple-700 hover:text-pink-500 transition-colors">Фильмы</h3>
        </Link>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-gray-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
        <h3 className="text-gray-800 font-semibold">{movie.name}</h3>
      </div>

      <div className="w-[100%]">
        <div className="flex md:flex-row flex-col items-start gap-[20px] justify-between">
          <div className="w-[100%]">
            <div className="my-[30px] w-[100%] flex md:flex-row flex-col items-start gap-[30px]">
              <div className="md:w-[315px]">
                <div className="relative">
                  <img src={movie.image} alt={movie.name} className="md:w-[315px] h-[475px] rounded-[10px]" />
                  {movie.imdb_rating !== 0 && <div className={`absolute top-[15px] right-[15px] w-[30px] h-[20px] rounded-[4px] flex items-center justify-center text-white font-semibold ${movie.imdb_rating < 5 ? 'bg-red-500' : movie.imdb_rating < 7 ? 'bg-pink-400' : 'bg-purple-500'}`}>{movie.imdb_rating}</div>}
                </div>

                <Link to={`/hall/${movie.id}`}>
                  <button className="w-full my-[20px] h-[50px] text-white text-[18px] cursor-pointer font-normal bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:scale-105 transition-all duration-300 rounded-xl">Перейти в зал</button>
                </Link>
              </div>

              <div className="md:w-[440px] w-[100%]">
                <div className="flex items-center flex-wrap gap-[20px]">
                  {movie.genre.split(',').map((g) => (
                    <h3 key={g.trim()} className="h-[35px] px-[5px] text-gray-600 flex items-center justify-center rounded-[7px] bg-purple-50">
                      {g.trim()}
                    </h3>
                  ))}
                </div>

                <h2 className="my-[20px] text-[35px] font-bold text-gray-800">{movie.title}</h2>
                <h3 className="mb-[20px] text-purple-500 text-[18px] font-semibold">Детали:</h3>
                <ul>
                  <li className="font-bold text-[18px]">
                    Возрастная категория фильма: <span className="font-normal">{movie.age_rating}</span>
                  </li>
                  <li className="font-bold text-[18px]">
                    Хронометраж: <span className="font-normal">{movie.duration}</span>
                  </li>
                  <li className="font-bold text-[18px]">
                    Страна: <span className="font-normal">{movie.country}</span>
                  </li>
                  <li className="font-bold text-[18px]">
                    Рейтинг <span className={`font-normal text-white px-[5px] rounded-[5px] h-[20px] ${movie.imdb_rating < 5 ? 'bg-red-500' : movie.imdb_rating < 7 ? 'bg-pink-400' : 'bg-purple-500'}`}>IMDb {movie.imdb_rating}</span>
                  </li>
                  <li className="font-bold text-[18px]">
                    Год: <span className="font-normal">{movie.year}</span>
                  </li>
                  <li className="font-bold text-[18px]">
                    В ролях: <span className="font-normal">{movie.actors}</span>
                  </li>
                </ul>
              </div>
            </div>

            <h3 className="my-[10px] text-[20px] font-bold text-gray-800">Описание</h3>
            <p className="text-[18px] md:w-[790px] text-gray-700">{movie.description}</p>
          </div>

          <div>
            <h3 className="text-[30px] mb-[30px] font-bold text-gray-800">Смотрите также</h3>
            <div className="flex flex-wrap md:w-[320px] w-[100%] gap-[20px] justify-between items-start">
              {randomProducts.slice(0, 4).map((e) => (
                <div key={e.id}>
                  <Link to={`/${e.id}`}>
                    <div className="w-[145px] m-auto md:m-0 overflow-hidden transform transition duration-600 group cursor-pointer">
                      <div className="overflow-hidden rounded-[10px] mb-[20px]">
                        <img src={e.image} alt={e.name} className="w-full h-[230px] object-cover transform transition duration-700 group-hover:scale-110 rounded-[10px]" />
                      </div>
                      <h3 className="font-bold group-hover:text-purple-500 transition-all duration-500 text-[19px] text-gray-800">{e.name}</h3>
                      <h4 className="my-[15px] text-[18px] text-pink-500">Расписание</h4>
                      <div className="flex items-center flex-wrap gap-[5px]">
                        {e.genre.split(',').map((g) => (
                          <h3 key={g.trim()} className="h-[35px] px-[5px] text-gray-600 flex items-center justify-center rounded-[7px] bg-purple-50">
                            {g.trim()}
                          </h3>
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieById;
