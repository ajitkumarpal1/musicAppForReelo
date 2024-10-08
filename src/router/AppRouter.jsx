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
import { Layout } from '../components/layout/layout';
import { Page404 } from '../components/404/Page404'; // Ensure this component is correctly imported

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
      // The catch-all route for handling 404s should be placed here
      {
        path: "*",
        element: <Page404 />,
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
    path: "/otp-verification", // Consistent with the adjusted path
    element: <OtpVerification />,
  },
  // Probably it would never call🙄 Catch-all route for handling 404s 
  {
    path: "*",
    element: <Page404 />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={routes} />;
};
