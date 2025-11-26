import { lazy } from 'react';

export const Layout = lazy(() => import('../layout/layout.jsx'));
export const Hall = lazy(() => import('@/pages/hall/hall'));
export const Movie = lazy(() => import('@/pages/movie/movie'));
export const MovieById = lazy(() => import('@/pages/movieById/movieById'));
