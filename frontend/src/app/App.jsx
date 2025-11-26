import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Loading from '../shared/ui/loading';
import { Hall, Layout, Movie, MovieById } from './providers/lazy/lazy';
import { Provider } from 'react-redux';
import { store } from './store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <Layout />
              </Suspense>
            }
          >
            <Route index element={<Movie />} />
            <Route path="hall/:id" element={<Hall />} />
            <Route path="/:id" element={<MovieById />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
