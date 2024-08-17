
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loop:true,
    activePlayList:null,
    play: false,
    totalTime:0,
    currentTime:0,
    currentProgress:0,
    currentSong: localStorage.getItem("currentSongId") || null, // Fixed key name
    homeSongList: [],
    pendingSongHistory: JSON.parse(localStorage.getItem("pendingSongHistory")) || {},
    playList: [], // Fixed typo in state name
    status: 'idle',
    playListStatus: 'idle',
    playpuscListStatus:'idle', //this all status for if we Want to new the status of our request for in future use.
    error: null,
    success:null,
    isLoading: true,
    search: "",
    playlistForm: false,
    selectPlayist: { status: false, songId: "", playlistId: "" },
    ErrorToast:null
};

// Thunk to get playlists
export const getPlaylist = createAsyncThunk("songHandling/getPlaylist", async () => {
    try {
        const token = localStorage.getItem('token'); // Example token retrieval
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/song/get-play-list`, {
            headers: {
                authorization: `Bearer ${token}` // Include the token in the headers
            }
        });
        console.log("responseresponse", response)
        return response.data;
    } catch (error) {
        return Promise.reject(error.message);
    }
});

// Thunk to fetch songs
export const fetchSongs = createAsyncThunk(
    "songHandling/fetchSongs",
    async () => {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/song/list`);
        return response.data;
    }
);

export const createPlaylist = createAsyncThunk("songHandling/createPlaylist", async (playlistData, thunkAPI) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/song/create-play-list`, playlistData, {
            headers: {
                Authorization: `Bearer ${token}` // Include the token in the headers
            }
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message); // Handle errors properly
    }
});

export const pushSongToPlayList = createAsyncThunk(
    'songHandling/pushSongToPlayList',
    async (data, thunkAPI) => {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/song/push-song-in-playlist`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Include the token in the headers
                    }
                }
            );
            return response.data; // Return the response data if successful
        } catch (error) {
            // Handle errors and provide an error message
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);


const songSlice = createSlice({
    name: "songHandling",
    initialState,
    reducers: {
        setToast:(state,actions)=>{
            state.ErrorToast = actions.payload
        },
        setCurrentSong: (state, action) => {
            state.currentSong = action.payload; 
            localStorage.setItem("currentSongId", action.payload); // Update localStorage when currentSong changes
        },
        addSongToHistory: (state, action) => {
            state.pendingSongHistory[action.payload.id] = action.payload;
            localStorage.setItem("pendingSongHistory", JSON.stringify(state.pendingSongHistory));
        },
        clearSongHistory: (state) => {
            state.pendingSongHistory = {};
            localStorage.removeItem("pendingSongHistory");
        },
        play: (state) => {
            state.play = true; 
        },
        pause: (state) => {
            state.play = false
        },
        search: (state, action) => {
            state.search = action.payload;
        },
        showCreatForm: (state, action) => {
            state.playlistForm = !state.playlistForm;
        },
        showSelectPlayist: (state, action) => {
            console.log(action.payload)
            if (action.payload?.songId) {
                state.selectPlayist.songId = action.payload.songId
            } else {
                state.selectPlayist.songId = ""
            }

            state.selectPlayist.status = !state.selectPlayist.status;

        },
        setTotalTime:(state, action)=>{
            state.totalTime = action.payload
        },
        setCurentTime:(state, action)=>{
            state.currentTime = action.payload
        },
        setCurrentProgress:(state, action)=>{
            state.currentProgress = action.payload
        },
        nextSong: (state) => {
            const currentIndex = state.homeSongList.findIndex(song => song.id == state.currentSong);
            
            // If the current song is found
            if (currentIndex !== -1) {
                let nextIndex;
        
                // Check if looping is enabled
                if (state.loop) {
                    // Get the next index, loop back to the start if it's the last song
                    nextIndex = (currentIndex + 1) % state.homeSongList.length;
                } else {
                    // Get the next index, if it's the last song, stay on the last song
                    nextIndex = currentIndex + 1 < state.homeSongList.length ? currentIndex + 1 : currentIndex;
                }
        
                // Update the current song to the next song
                state.currentSong = state.homeSongList[nextIndex].id;
                localStorage.setItem("currentSongId", state.currentSong); // Update localStorage
            }
        },
        prevSong: (state) => {
            const currentIndex = state.homeSongList.findIndex(song => song.id === state.currentSong);
            
            if (currentIndex !== -1) {
                let prevIndex;
        
                // Check if looping is enabled
                if (state.loop) {
                    // Get the previous index, loop back to the last song if it's the first song
                    prevIndex = (currentIndex - 1 + state.homeSongList.length) % state.homeSongList.length;
                } else {
                    // Get the previous index, if it's the first song, stay on the first song
                    prevIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : 0;
                }
        
                // Update the current song to the previous song
                state.currentSong = state.homeSongList[prevIndex].id;
                localStorage.setItem("currentSongId", state.currentSong); // Update localStorage
            }
        },
        loopTogal:(state)=>{
            state.loop = !state.loop
        }
        

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSongs.pending, (state) => {
                state.status = 'loading';
                state.isLoading = true;
            })
            .addCase(fetchSongs.fulfilled, (state, action) => {
                state.homeSongList = action.payload;
                state.status = 'succeeded';
                if(state.currentSong == null){
                    state.currentSong = state.homeSongList[0].id;
                    localStorage.setItem("currentSongId",state.homeSongList[0].id)
                }
                state.isLoading = false;
            })
            .addCase(fetchSongs.rejected, (state, action) => {
                //state.status = 'failed';
                //state.error = action.error.message;
                //state.isLoading = false;
            })
            // anduling song play list
            .addCase(getPlaylist.pending, (state) => {
                state.playListStatus = 'loading';
            })
            .addCase(getPlaylist.fulfilled, (state, action) => {
                state.playList = action.payload;
                state.playListStatus = 'succeeded';
            })
            .addCase(getPlaylist.rejected, (state, action) => {
                state.playListStatus = 'failed';
                state.error = action.error.message;
            })
            // Handling createPlaylist
            .addCase(createPlaylist.pending, (state) => {
                state.playListStatus = 'loading'; // You can set a different status for playlist creation if needed
            })
            .addCase(createPlaylist.fulfilled, (state, action) => {
                // Add the newly created playlist to the existing list
                console.log(action.payload);
                state.playList = [...state.playList, action.payload];
                state.playListStatus = 'succeeded';
            })
            .addCase(createPlaylist.rejected, (state, action) => {
                state.playListStatus = 'succeeded';
                state.error = action.payload || action.error.message;
            })
            // pushSongToPlayList
            .addCase(pushSongToPlayList.pending, (state) => {
                state.playpuscListStatus = 'loading';
            })
            .addCase(pushSongToPlayList.fulfilled, (state, action) => {
                const { playlistId, _id } = action.payload;
                console.log("action.payload",action.payload)
            
                // Find the index of the playlist to update
                const index = state.playList.findIndex(playlist => {
                    console.log(playlist["_id"],"==",_id)
                    return playlist["_id"] === _id});
            
                if (index !== -1) { // Check if the playlist exists
                    // Update the songList for the found playlist
                    state.playList[index].songList = [...state.playList[index].songList, ""+state.selectPlayist.songId];
                } else {
                    console.error(`Playlist with ID ${playlistId} not found.`);
                }
                /* setTimeout(()=>{
                    state.selectPlayist.status = false
                },500) */// the reducers are pyore functions we cant parformany sidefect inside it
                state.selectPlayist.status = false
                state.playpuscListStatus = 'succeeded'; // Update the status
                state.success = new Date().toISOString("64").split(".")[1]+": song added success successfully"
                console.log('Updated playlist:', state.playList[index]);
            })
            .addCase(pushSongToPlayList.rejected, (state, action) => {
                state.playpuscListStatus = 'failed';
                //state.error = action.error.message;
                state.error = new Date().toISOString("64").split(".")[1]+ ": already song present"
            })
    },
});

export const { setCurrentSong, addSongToHistory, clearSongHistory, search, play, showCreatForm, showSelectPlayist, pause, setTotalTime, setCurentTime, setCurrentProgress, nextSong, prevSong, loopTogal, setToast } = songSlice.actions;
export default songSlice.reducer;