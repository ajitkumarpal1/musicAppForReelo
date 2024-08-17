
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/reducer/userReducer";

export const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false); // State to manage button state
    const navigate = useNavigate(); // Use useNavigate for redirection
    const dispatch = useDispatch(); // Initialize the dispatch function

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };
    
        setIsSubmitting(true); // Set submitting state
    
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/signin`, data);
    
            if (response.data.success) {
                // Dispatch loginUser action with user data
                dispatch(loginUser(response.data.user));
                localStorage.setItem('token',response.data.token); // Store the token
                toast.success("Login successful!");
                navigate('/'); // Redirect to home page
            } else {
                // Show error message returned from the server
                toast.error(response.data.error);
            }
        } catch (error) {
            // Show error message if request fails
            const errorMessage = error.response?.data?.error || "An error occurred. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false); // Reset submitting state
        }
    };
    

    return (
        <div className="bg-blue-900 flex items-center justify-center h-screen text-white">
            
            <div className="bg-blue-600 p-4 flex flex-col shadow-lg shadow-blue-950 rounded-3xl w-full h-full sm:max-w-full sm:h-full md:max-w-md md:h-auto lg:max-w-md lg:h-auto">
                <div className="px-4 pb-4">
                    <h1 className="text-2xl font-bold text-center">Login</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="px-4 pb-4">
                        <label htmlFor="email" className="text-sm block font-bold pb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            ref={emailRef}
                            className="bg-transparent border-b border-white focus:outline-none focus:border-blue-300 text-white placeholder-white w-full py-2 px-3 leading-tight focus:shadow-outline"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="px-4 pb-4">
                        <label htmlFor="password" className="text-sm block font-bold pb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            ref={passwordRef}
                            className="bg-transparent border-b border-white focus:outline-none focus:border-blue-300 text-white placeholder-white w-full py-2 px-3 leading-tight focus:shadow-outline"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="px-4 pb-4">
                        <label className="block font-bold">
                            <input className="mr-2 leading-tight" type="checkbox" />
                            <span className="text-sm">Remember Me</span>
                        </label>
                    </div>
                    <div className="px-4">
                        <button
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Logging In...' : 'Login'}
                        </button>
                    </div>
                    <div className="px-4 pt-4 text-center">
                        <p className="text-sm text-blue-900">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-white hover:text-blue-700 font-bold underline">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
