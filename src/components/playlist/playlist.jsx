import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPlaylist, getPlaylist, showCreatForm } from '../../redux/reducer/songReducer';
import { Link } from 'react-router-dom';


export const Playlist = () => {
    const dispatch = useDispatch();
    const playList = useSelector((state) => state.songReducer.playList);
    const status = useSelector((state) => state.songReducer.playListStatus);
    const error = useSelector((state) => state.songReducer.error);
    
    

    return (
        <div className="w-full max-w-xl p-4 mx-auto bg-blue-900 shadow-blue-950 rounded-lg shadow-lg">
            {/* Playlist Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">Playlists</h2>
                <button onClick={()=>{dispatch(showCreatForm())}} className="p-2 text-gray-400 hover:text-white outline rounded-3xl">
                    New Playlist
                </button>
            </div>
            {/* Playlist Items */}
            {status === 'loading' && <p className="text-white">Loading playlists...</p>}
            {status === 'failed' && <p className="text-red-500">Error: {error}</p>}
            {status === 'succeeded' && (
                <div className="space-y-4">
                    {playList.map((playlist) => (
                        <Link to={"/playList/"+playlist._id}  key={playlist._id} className="flex items-center justify-between p-2 bg-blue-600 rounded-lg hover:bg-gray-600">
                            <div className="flex items-center">
                                <div className="p-2 bg-green-500 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        className="w-6 h-6 text-white"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M5 3.5A.5.5 0 0 1 5.5 3h6a.5.5 0 0 1 0 1h-6A.5.5 0 0 1 5 3.5zm0 2A.5.5 0 0 1 5.5 5h6a.5.5 0 0 1 0 1h-6A.5.5 0 0 1 5 5.5zm0 2A.5.5 0 0 1 5.5 7h6a.5.5 0 0 1 0 1h-6A.5.5 0 0 1 5 7.5zm9 4a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1z" />
                                    </svg>
                                </div>
                                <span className="ml-4 text-white">{playlist.name}</span>
                            </div>
                            <span className="text-sm text-gray-400">{playlist.songList.length} songs</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};
