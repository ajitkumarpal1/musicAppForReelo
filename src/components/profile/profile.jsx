import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/reducer/userReducer';
import avtar from '../../assets/imgs/avatar.png'



export const Profile = () => {
  const navigate = useNavigate();
  const dispatch =useDispatch()
  const user = useSelector((state) => state.userReducer.userData);
  const status = useSelector((state) => state.userReducer.status);
  const playList = useSelector((state) => state.songReducer.playList).length ;

  useEffect(() => {
    if (status !== "success") {
      navigate("/");
    }
  }, [status, navigate]);

  if (status !== "success"){
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="w-full max-w-xl p-6 bg-blue-900 shadow-blue-950 text-white rounded-lg shadow-lg mx-auto">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-4">
          <img
            src={avtar}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-green-500"
          />
          <h1 className="mt-4 text-2xl font-bold">{user.name || `ajitttt`}</h1>
          <p className="text-sm text-gray-400">{user.email||`@Ajit`}</p>
        </div>

        {/* User Info */}
        <div className="flex justify-between text-gray-300 mb-4">
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold">{playList}</span>
            <span className="text-sm">Playlists</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold">0000</span>
            <span className="text-sm">Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold">0000</span>
            <span className="text-sm">Following</span>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="flex justify-center space-x-4">
          <button className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition duration-300">
            Edit Profile
          </button>
          <button onClick={()=>{dispatch(logout())}} className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300">
            Log Out
          </button>
        </div>
      </div>
    </>
  )
}
