import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import reactLogo from '@/assets/react.svg';
import logoutLogo from '@/assets/logout.svg';
import { googleLogout  } from '@react-oauth/google';
import { useMsal } from '@azure/msal-react';

const Home = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const { instance, accounts } = useMsal();
    const [isGoogle, setIsGoogle] = useState(false);
    const mAccount = instance.getActiveAccount();

    useEffect(() => {
        document.title = "React SSO - Home";

        const token = cookies.get('token') as string;
        if (!token && !mAccount) {
            navigate('/');
        }

        if (token) {
            setIsGoogle(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logout = () => {
        if (isGoogle) {
            googleLogout();
            cookies.remove('token');
            navigate('/');
        } else {
            const logoutRequest = {
                account: instance.getAccountByHomeId(accounts[0]?.homeAccountId),
                mainWindowRedirectUri: '/',
            };
            instance.logoutPopup(logoutRequest);
        }
    }

    return (
        <div className="flex flex-col h-screen bg-gray-900 ">
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <img src={reactLogo} alt="logo" className='w-6' />
                    <button type="button" onClick={logout} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <img src={logoutLogo} alt="logo" className='w-5 h-5 text-white' />
                    </button>
                </div>
            </nav>
            <div className="flex items-center justify-center grow">
                <span className="text-gray-50">{ isGoogle ? 'Logged in with Google' : 'Logged in with Microsoft' }</span>
            </div>
        </div>
    );    
};

export default Home;