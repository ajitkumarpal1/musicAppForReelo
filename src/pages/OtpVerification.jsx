
import React, { useRef, useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const OtpVerification = () => {
    const emailRef = useRef();
    const otpRef = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false); // State to manage button state
    const navigate = useNavigate();

    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        // Prevent multiple submissions
        if (isSubmitting) return;

        // Set submitting state
        setIsSubmitting(true);

        // Prepare data for the POST request
        const data = {
            otp: Number(otpRef.current.value),
        };

        try {
            // Make a POST request to verify OTP
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/${emailRef.current.value}/verify`, data);

            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/login'); // Redirect after successful verification
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            // Handle error response
            toast.error("An error occurred. Please try again.");
        } finally {
            // Reset submitting state
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="bg-blue-900 flex items-center justify-center h-screen text-white">
                
                <div className="w-full max-w-md">
                    <div className="bg-blue-600 p-4 shadow-lg shadow-blue-950 rounded-3xl px-8 py-8 pt-8">
                        <div className="px-4 pb-4">
                            <h1 className="text-2xl font-bold text-center">OTP Verification</h1>
                        </div>
                        <form onSubmit={handleOtpSubmit}>
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
                                <label htmlFor="otp" className="text-sm block font-bold pb-2">
                                    OTP
                                </label>
                                <input
                                    type="text"
                                    name="otp"
                                    id="otp"
                                    ref={otpRef}
                                    className="bg-transparent border-b border-white focus:outline-none focus:border-blue-300 text-white placeholder-white w-full py-2 px-3 leading-tight focus:shadow-outline"
                                    placeholder="Enter OTP"
                                />
                            </div>
                            <div className="px-4">
                                <button
                                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Verifying...' : 'Verify OTP'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
