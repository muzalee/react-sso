import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import reactLogo from '@/assets/react.svg';
import logoutLogo from '@/assets/logout.svg';

const Home = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "React SSO - Home";

        const token = cookies.get('token') as string;
        if (!token) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex-col h-screen bg-gray-900 ">
            <nav class="bg-white border-gray-200 dark:bg-gray-900">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <img src={reactLogo} alt="logo" className='w-6' />
                    <button type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <img src={logoutLogo} alt="logo" className='w-5 h-5 text-white' />
                    </button>
                </div>
            </nav>
            <div className="flex h-full">
                <span className="text-gray-50 mx-auto my-auto">Home</span>
            </div>
        </div>
    );
};

export default Home;