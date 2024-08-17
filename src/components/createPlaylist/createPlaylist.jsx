import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPlaylist, showCreatForm } from '../../redux/reducer/songReducer';
import { toast, ToastContainer } from 'react-toastify';

// SVG for close button
const CloseIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6 text-gray-400"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
);

export const CreatePlaylist = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');


    function createNewPlaylist() {
        if (name.trim() === '') {
            // Handle validation error
            toast.error("enter playlist name?")
            return;
        }
        dispatch(createPlaylist({ name, description }));
        dispatch(showCreatForm()); 
    }

    return (<>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-blue-900 p-8 rounded-lg shadow-lg max-w-md w-full relative">
                <button
                    onClick={() => dispatch(showCreatForm())}
                    className='absolute top-4 right-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700'
                >
                    <CloseIcon />
                </button>
                <h2 className="text-2xl font-bold text-white mb-6">Create Playlist</h2>

                <div className="mb-4">
                    <label className="block text-gray-400 mb-2" htmlFor="playlist-name">Playlist Name</label>
                    <input
                        className="w-full p-3 bg-blue-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        id="playlist-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="My Awesome Playlist"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-400 mb-2" htmlFor="playlist-description">Description (optional)</label>
                    <textarea
                        className="w-full p-3 bg-blue-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        id="playlist-description"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add a description"
                    ></textarea>
                </div>

                {/* Uncomment if image upload is needed */}
                {/* <div className="mb-6">
                    <label className="block text-gray-400 mb-2">Playlist Image (optional)</label>
                    <div className="w-full p-3 bg-blue-800 text-white relative rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center">
                        <div className='relative flex items-center mx-auto cursor-pointer'>
                            <ImageUpload className="w-10 h-10 cursor-pointer" />
                            <input
                                className='absolute opacity-0 w-full h-10 cursor-pointer left-0 top-0'
                                type="file"
                            />
                            <label className='ml-3 cursor-pointer'>No file</label>
                        </div>
                    </div>
                </div> */}

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => dispatch(showCreatForm())}
                        className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={createNewPlaylist}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    </>

    );
};
