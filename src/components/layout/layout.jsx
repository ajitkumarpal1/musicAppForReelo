import React from 'react'

import styles from './layout.module.css'

import { NavBar } from '../navBar/navBar'
import { Outlet } from 'react-router-dom';
import { MusicProgressBar } from '../musicProgressBar/musicProgressBar';
import { CreatePlaylist } from '../createPlaylist/createPlaylist';
import { useSelector } from 'react-redux';
import { PupupSelectPlaylist } from '../pupupPlaylist/pupupPlaylist';

export const Layout = () => {
    const playlistForm = useSelector((state) => state.songReducer.playlistForm);
    const selectPlayist = useSelector((state) => state.songReducer.selectPlayist.status);
    return (
        <>
            <div className={`bg-blue-900 min-h-screen overflow-hidden ${styles.W100Per}`}>
                <NavBar />
                <div className="bg-blue-600 mt-5 p-4 shadow-lg shadow-blue-950 sm:rounded-none md:m-6 md:rounded-3xl lg:m-10 min-h-60" style={{ marginBottom: "150px" }}>
                    <Outlet />
                </div>
                <MusicProgressBar />
            </div>
            {playlistForm && <CreatePlaylist />}
            {selectPlayist && <PupupSelectPlaylist />}

        </>
    )
}
