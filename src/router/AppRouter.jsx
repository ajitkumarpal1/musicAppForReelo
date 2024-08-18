import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import required components
import { Login } from '../pages/login';
import { Signup } from '../pages/signup';
import { Home } from '../components/home/home';
import { Profile } from '../components/profile/profile';
import { Playlist } from '../components/playlist/playlist';
import { OtpVerification } from '../pages/OtpVerification';
import { PlaylistSong } from '../components/playlistSong/playlistSong';
//import { PageNotFound } from '../components/pageNotFound/PageNotFound'; 
import { Layout } from '../components/layout/layout';
import { Page404 } from '../components/404/Page404';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "playlist", 
        element: <Playlist />,
      },
      {
        path: "playlist/:id",
        element: <PlaylistSong />,
      },
      {
        path: "*",
        element: <Page404 />, // Use the PageNotFound component
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/otp-verification", // Adjusted to lowercase for consistency
    element: <OtpVerification />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={routes} />;
};
