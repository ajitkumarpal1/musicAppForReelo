import React, { useEffect } from 'react';
import { MusicCard } from '../musicCard/musicCard';
import { fetchSongs } from '../../redux/reducer/songReducer';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonCard from '../SkeletonCard/SkeletonCard';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


export const PlaylistSong = () => {
  const dispatch = useDispatch();
  const song = useSelector((state) => state.songReducer.homeSongList);
  const isLoading = useSelector((state) => state.songReducer.isLoading);
  const error = useSelector((state) => state.songReducer.error); // Added error state
  const search = useSelector((state) => state.songReducer.search);
  const allPlaylists = useSelector((state) => state.songReducer.playList);
  const { id } = useParams();

  useEffect(() => {
    toast.error(error)
  }, [error])

  // Find the playlist by id
  const playlist = allPlaylists.find(playlist => playlist["_id"] === id);

  useEffect(() => {
    if (song.length === 0) {
      dispatch(fetchSongs());
    }
  }, [dispatch, song]);

  /* play list song */
  const playlistSongs = song.filter((data) => playlist?.songList.includes("" + data.id));

  // Filter the songs based on the search value
  const filteredSongs = playlistSongs.filter((data) => playlist?.songList.includes("" + data.id) &&
    data.title.toLowerCase().includes(search.toLowerCase()) ||
    data.artist.name.toLowerCase().includes(search.toLowerCase())
  );
  console.log("filteredSongs", filteredSongs)
  console.log("playlist.songList", playlist?.songList)

  // Error handling if the playlist is not found
  if (!playlist) {
    return (<>

      <div className="min-h-screen flex flex-col items-center bg-blue-900 text-white rounded-3xl">
        <h1 className="text-3xl font-bold text-center mb-8">Playlist not found</h1>
      </div>
    </>
    );
  }

  // Error handling if there was an issue fetching songs
  /* if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center bg-blue-900 text-white rounded-3xl">
        <h1 className="text-3xl font-bold text-center mb-8">Error fetching songs: {error}</h1>
      </div>
    );
  } */

  return (<>
    <div className="min-h-screen flex flex-col items-center bg-blue-900 text-white rounded-3xl">
      <div className="w-full p-8 max-w-7xl">
        <h1 className="text-3xl font-bold text-center mb-8">{playlist.name}</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {isLoading
            ? Array(6).fill(null).map((_, index) => (
              <SkeletonCard key={index} />
            ))
            : filteredSongs.map((data) => (<MusicCard key={data.id} {...data} />))
          }
        </div>
      </div>
    </div></>
  );
};
