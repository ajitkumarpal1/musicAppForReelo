import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// import requre components 
import { Login } from '../pages/login'
import { Signup } from '../pages/signup'
import { Home } from '../components/home/home'
import { FavoriteList } from '../components/songList/favoriteList'
import { Layout } from '../components/layout/layout'
import { Profile } from '../components/profile/profile'
/* import { PageNotFound } from '../components/pageNotFound/PageNotFound' */
import { Playlist } from '../components/playlist/playlist'
import { OtpVerification } from '../pages/OtpVerification'
import { PlaylistSong } from '../components/playlistSong/playlistSong'


const routes = createBrowserRouter(
    [
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "",
                    element: <><Home/></>
                },
                {
                    path: "profile",
                    element: <Profile />
                },
                {
                    path:"Playlist",
                    element:<Playlist />
                },
                {
                    path: "playlist/:id",
                    element:<PlaylistSong />
                },
                {
                    path: "*",
                    element: <div>PageNotFound</div>//<PageNotFound /> 
                }
            ]
        }, 
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/signup",
            element: <Signup />
        },
        {
            path:"/OtpVerification",
            element:<OtpVerification />
        }
    ]
);



export const AppRouter = () => {

    

  return (
    <RouterProvider router={routes} />
  )
}
