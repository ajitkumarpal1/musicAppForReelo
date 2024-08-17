import { useDispatch, useSelector } from 'react-redux';
import { AppRouter } from './router/AppRouter';
import { loginAuthAsync } from './redux/reducer/userReducer';
import { useEffect } from 'react';
import { getPlaylist } from './redux/reducer/songReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const success = useSelector(state=>state.songReducer.success)
  const error = useSelector(state=>state.songReducer.error)
  useEffect(()=>{
    toast.success(success)
  },[success])
  useEffect(()=>{
    toast.error(error)
  },[error])
  const dispatch = useDispatch();
  /* function ErrorToast(type,masseg){
    if(type == "success"){
      toast.success(masseg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }else{
      toast.error(masseg)
    }
  } */

  useEffect(() => {
    // Fetch playlists and authenticate user on component mount
    dispatch(getPlaylist());
    dispatch(loginAuthAsync());
  }, [dispatch]);

  return (
    <>
      <AppRouter />
      <ToastContainer />
    </>
  );
}

export default App;
