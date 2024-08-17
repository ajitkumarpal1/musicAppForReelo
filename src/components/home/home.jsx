import React, { useEffect } from 'react';
import { MusicCard } from '../musicCard/musicCard';
import { fetchSongs } from '../../redux/reducer/songReducer';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonCard from '../SkeletonCard/SkeletonCard';

export const Home = () => {
  const dispatch = useDispatch();
  const song = useSelector((state) => state.songReducer.homeSongList);
  const isLoading = useSelector((state) => state.songReducer.isLoading);
  const search = useSelector((state) => state.songReducer.search);

  // Fetch songs when the component is mounted
  useEffect(() => {
    if(song.length==0){
      dispatch(fetchSongs());
    }
    
  }, [dispatch]);

  // Filter the songs based on the search value
  const filteredSongs = song.filter((data) =>
    data.title.toLowerCase().includes(search.toLowerCase()) || data.artist.name.toLowerCase().includes(search.toLowerCase())  
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-blue-900 text-white rounded-3xl">
      <div className="w-full p-8 max-w-7xl">
        <h1 className="text-3xl font-bold text-center mb-8">Music Library</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {isLoading
            ? Array(6).fill(null).map((_, index) => (
              <SkeletonCard key={index} />
            ))
            : filteredSongs.map((data) => (
              <MusicCard key={data.id} {...data} />
            ))
          }
        </div>
      </div>
    </div>
  );
};
