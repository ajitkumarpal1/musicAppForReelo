import React, { useEffect, useRef, useState } from 'react';
import styles from './musicProgressBar.module.css';
import Back from '../../assets/svg/backword-svgrepo-com.svg';
import Forward from '../../assets/svg/forward-svgrepo-com.svg';
import Pause from '../../assets/svg/pause-svgrepo-com.svg';
import PlayBtn from '../../assets/svg/play-pause-svgrepo-com.svg';
import Volume0 from '../../assets/svg/volume0.svg';
import Volume1 from '../../assets/svg/volume1.svg';
import Volume2 from '../../assets/svg/volume2.svg';
import VolumeFull from '../../assets/svg/volumeFull.svg';
import Loop from '../../assets/svg/loop.svg';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { loopTogal, nextSong, pause, play, prevSong, setCurentTime, setCurrentProgress, setTotalTime } from '../../redux/reducer/songReducer';

export const MusicProgressBar = () => {
  const dispatch = useDispatch();
  const isPlaying = useSelector(state => state.songReducer.play);
  const currentSongId = useSelector(state => state.songReducer.currentSong);
  const loop = useSelector(state => state.songReducer.loop);
  const activePlayList = useSelector(state => state.songReducer.activePlayList);
  const [volume, setVolume] = useState(50);
  const [songData, setSongData] = useState(null);
  const [songDuration, setSongDuration] = useState('0:00');
  const [currentTime, setCurrentTime] = useState('0:00');
  const [progress, setProgress] = useState(0);
  const [start, setStart] = useState(localStorage.getItem(currentSongId) || 0);

  const audioRef = useRef(null);

  useEffect(() => {
    if (currentSongId) {
      const token = localStorage.getItem('token');
      setStart(localStorage.getItem(currentSongId) || 0)
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/api/song/song-by-id/${currentSongId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          setSongData(response.data);
        })
        .catch(error => {
          console.error('Error fetching song data', error);
        });
    }
  }, [currentSongId]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;

      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume]);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      const formattedDuration = formatTime(duration);
      setSongDuration(formattedDuration);
      dispatch(setTotalTime(formattedDuration));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;

      localStorage.setItem(currentSongId, current);

      if (current >= duration) {
        localStorage.removeItem(currentSongId);
        if (loop) {
          dispatch(nextSong(currentSongId));
        }
      }

      const formattedTime = formatTime(current);
      setCurrentTime(formattedTime);
      dispatch(setCurentTime(formattedTime));
      setProgress((current / duration) * 100);
      dispatch(setCurrentProgress((current / duration) * 100));
    }
  };

  const handleProgressChange = e => {
    const newProgress = e.target.value;
    setProgress(newProgress);

    if (audioRef.current) {
      const duration = audioRef.current.duration;
      const newTime = (newProgress / 100) * duration;
      audioRef.current.currentTime = newTime;

      const formattedTime = formatTime(newTime);
      setCurrentTime(formattedTime);
      dispatch(setCurentTime(formattedTime));
    }
  };

  return (
    <>
      {songData &&
        <audio
          ref={audioRef}
          key={songData.id}
          autoPlay={isPlaying}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
        >
          <source src={songData.preview + "#t=" + start} type='audio/ogg' />
          <source src={songData.preview + "#t=" + start} type='audio/mpeg' />
          Your browser does not support the audio element.
        </audio>
      }

      <div
        className={`p-4 bg-blue-600 rounded-t-3xl shadow-2xl shadow-blue-950 fixed bottom-0 ${styles.widthOfProgresbar}`}
      >
        <div className='flex items-center justify-center mb-4 relative'>
          {/* Sound Control */}
          <div className='flex items-center -rotate-90 -mt-28 left-0 fixed group'>
            <div className='rounded-2xl active:bg-blue-900 cursor-pointer p-1' onClick={() => { volume == 0 ? setVolume(50) : setVolume(0) }}>
              {volume == 0 ? <Volume0 className='w-6 h-6 mr-2 rotate-90' /> :
                volume > 0 && volume < 40 ? <Volume1 className='w-6 h-6 mr-2 rotate-90' /> :
                  volume > 40 && volume < 80 ? <Volume2 className='w-6 h-6 mr-2 rotate-90' /> :
                    <VolumeFull className='w-6 h-6 mr-2 rotate-90' />}
            </div>

            <input
              type='range'
              min='0'
              max='100'
              value={volume}
              onChange={e => setVolume(e.target.value)}
              className='w-24 h-2 bg-gray-700 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer'
            />
          </div>

          <button onClick={() => { dispatch(prevSong()) }} className='p-2 text-gray-400 hover:text-white active:scale-95 rounded-2xl active:bg-blue-500'>
            <Back className='w-8 h-8' />
          </button>

          {isPlaying ? (
            <button
              onClick={() => dispatch(pause())}
              id='play-pause'
              className='p-2 mx-4 rounded-2xl text-gray-400 hover:text-white active:scale-95 active:bg-blue-500'
            >
              <Pause className='w-8 h-8' />
            </button>
          ) : (
            <button
              onClick={() => dispatch(play())}
              id='play-play'
              className='p-2 mx-4 rounded-2xl text-gray-400 hover:text-white active:scale-95 active:bg-blue-500'
            >
              <PlayBtn className='w-8 h-8' />
            </button>
          )}

          <button onClick={() => { dispatch(nextSong(currentSongId)) }} className='p-2 text-gray-400 hover:text-white rounded-2xl active:scale-95 active:bg-blue-500'>
            <Forward className='w-8 h-8' />
          </button>

          <div onClick={() => { dispatch(loopTogal()) }} className={`absolute right-0 top-1/2 transform -translate-y-1/2 rounded-2xl ${loop && 'bg-blue-500'}`}>
            <button className='p-2 text-gray-400 hover:text-white'>
              <Loop className='w-6 h-6' />
            </button>
          </div>
        </div>

        {/* Controllable Progress Bar */}
        <div className='group relative'>
          <div className='relative h-2 bg-gray-700 rounded-full mb-4'>
            {/* Filled Progress */}
            <div
              id='progress'
              className='absolute h-full bg-green-500 rounded-full'
              style={{ width: `${progress}%` }}
            />
          </div>

          <input
            type='range'
            min='0'
            max='100'
            value={progress}
            onChange={handleProgressChange}
            className='absolute inset-0 opacity-0 group-hover:opacity-100 w-full h-2 bg-gray-700 rounded-full cursor-pointer transition-opacity duration-300'
          />
        </div>


        <div className='flex justify-between text-sm text-gray-400'>
          <span id='current-time'>{currentTime}</span>
          {songData?.title}
          <span id='duration'>{songDuration}</span>
        </div>
      </div>
    </>
  );
};
