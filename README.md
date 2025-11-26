Semen — Movie App
Запуск

1. Клонировать репозиторий
git clone https://github.com/<username>/<repo>.git
cd <repo>

2. Создать .env файлы
Backend:
cp backend/.env.example backend/.env
и заполнить своими значениями.

Frontend:
cp frontend/.env.example frontend/.env

3. Запуск
docker compose up --build

4. После запуска проверить 

Backend → http://localhost:8000/docs
Frontend → http://localhost/
