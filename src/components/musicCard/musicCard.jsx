import React, { useEffect } from 'react'
import AddBtn from '../../assets/svg/addBtn.svg'
import { pause, play, setCurrentSong, showSelectPlayist } from '../../redux/reducer/songReducer'
import { useDispatch, useSelector } from 'react-redux'



export const MusicCard = ({ title, artist, album, id }) => {
    const dispatch = useDispatch()
    const currentSongId = useSelector(state => state.songReducer.currentSong)
    const currentTime = useSelector(state => state.songReducer.currentTime)
    const totalTime = useSelector(state => state.songReducer.totalTime)
    const progress = useSelector(state => state.songReducer.currentProgress)
    const isPlaying = useSelector(state => state.songReducer.play);
    
    return (
        <>
            <div className="bg-blue-500 shadow-blue-950 rounded-lg shadow-lg p-4 h-72 max-w-xs aspect-video text-black">
                <div className="relative">
                    <img
                        className="rounded-lg w-full h-44 object-cover"
                        src={album.cover_xl}
                        alt="Album Cover"
                    />
                    <button onClick={() => { dispatch(showSelectPlayist({ songId: id })) }} className="absolute bottom-2 left-2 bg-gray-600 rounded-full hover:bg-gray-700 active:rotate-45 transition-all">
                        <AddBtn className="h-10 w-10" />
                    </button>

                    {currentSongId == id && isPlaying ? 
                        <button onClick={() => {
                            dispatch(setCurrentSong(id))
                            dispatch(pause())
                        }} className="absolute bottom-2 right-2 bg-green-500 rounded-full p-2 hover:bg-green-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="h-6 w-6"
                                viewBox="0 0 16 16"
                            >
                                <path d="M5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0v-9A.5.5 0 0 1 5 3zM11 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0v-9A.5.5 0 0 1 11 3z" />
                            </svg>

                        </button>
                     :
                     <button onClick={() => {
                        dispatch(setCurrentSong(id))
                        dispatch(play())
                    }} className="absolute bottom-2 right-2 bg-green-500 rounded-full p-2 hover:bg-green-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="h-6 w-6"
                            viewBox="0 0 16 16"
                        >
                            <path d="M10.804 8.95L6.58 11.95a.5.5 0 01-.777-.416V4.467a.5.5 0 01.777-.416l4.224 3a.5.5 0 010 .832z" />
                        </svg>
                    </button>}
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold overflow-hidden flex-grow" style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>{title}</h3>
                    <p className="text-gray-100">{artist.name}</p>
                    {currentSongId == id && <div className="flex items-center mt-2">
                        <span className="mr-2 text-sm">{totalTime}</span>
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${progress}%` }} />
                        </div>
                        <span className="ml-2 text-sm">{currentTime}</span>
                    </div>}
                </div>
            </div>
        </>
    )
}
