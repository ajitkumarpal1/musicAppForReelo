import React, { useEffect } from 'react'
import styles from './navBar.module.css';
import MusicLibrary from "../../assets/svg/music-library.svg"
import Playlist from "../../assets/svg/playlist.svg";
import LoginKey from "../../assets/svg/loginkey.svg";
import AvatarIcan from "../../assets/svg/avatar1.svg";

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../../redux/reducer/songReducer';



export const NavBar = () => {
    const userstatus = useSelector(state => state.userReducer.status)
    const dispatch = useDispatch()

    const navItems = [
        {
            icon: MusicLibrary,
            text: "Library",
            link: "/",
            states: true
        },
        {
            icon: Playlist,
            text: "Playlist",
            link: "/playlist",
            cartItem: 0,
            states: userstatus == "success" ? true : false
        },
        {
            icon: LoginKey,
            text: "Login",
            link: "/login",
            states: userstatus != "success" ? true : false
        },
        {
            icon: AvatarIcan,
            text: "Profile",
            link: "/profile",
            menu: [{ text: "login" }, { text: "view frofile" }
            ],
            states: userstatus == "success" ? true : false
        },
    ];
    const handleSearch = (e) => {
        const query = e.target.value; // Get the input value
        dispatch(search(query)); // Dispatch the search action with the query
    };

    return (
        <>
            <nav className={`bg-blue-600 p-4 shadow-lg shadow-blue-950 sm:rounded-none md:m-6 md:rounded-3xl ${styles.navWidth}`}>
                <div className="container mx-auto flex items-center justify-between flex-wrap">
                    <div className="text-lg font-semibold text-white mb-4 md:mb-0">
                        🎧Reelo📻Music🎶
                    </div>

                    <input
                        type="text"
                        className="bg-transparent border-b border-white focus:outline-none focus:border-blue-300 text-white placeholder-white w-full md:w-auto mb-4 md:mb-0"
                        onChange={handleSearch}
                        placeholder="Search..."
                    />

                    <div className={`flex space-x-4 gap-4 w-full md:w-auto justify-between overflow-x-auto ${styles.scroleWidthNone}`}>
                        {navItems.map((item, index) => {
                            return (item.states && <Link key={index} to={item.link} className="relative flex flex-col items-center">
                                {item.cartItem ? <div className="w-6 h-6 text-white text-center bg-blue-400 absolute rounded-full ml-10 -mt-1 overflow-hidden">{item.cartItem}</div> : ""}
                                <item.icon height="44px" width="44px" className="hover:scale-105 hover:mix-blend-multiply" />
                                <span className="text-xs text-center w-full overflow-hidden text-ellipsis">
                                    {item.text}
                                </span>
                            </Link>)
                        })}
                    </div>
                </div>
            </nav>
        </>
    )
}
