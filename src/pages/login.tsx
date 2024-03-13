import React, { useEffect } from 'react';
import reactLogo from '@/assets/react.svg';
import googleLogo from '@/assets/google.svg';
import microsoftLogo from '@/assets/microsoft.svg';
import { useGoogleLogin  } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '@/configs/msal-config';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const { instance } = useMsal();
    const mAccount = instance.getActiveAccount();

    useEffect(() => {
        document.title = "React SSO - Login";

        const token = cookies.get('token') as string;
        if (token || mAccount) {
            navigate('/home');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async res => {
            cookies.set('token', res.access_token, {
                maxAge: res.expires_in,
            });

            await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${res.access_token}` },
            }).then(userRes => {
                cookies.set('user_name', userRes.data.name, {
                    maxAge: res.expires_in,
                });

                navigate('/home');
            });                  
        },
    });

    const loginWithMicrosoft = () => {
        instance.loginPopup({
            ...loginRequest,
            prompt: 'select_account',
        }).then((res) => {
            cookies.set('user_name', res.account.name);
            navigate('/home');
        });
    }

    return (
        <div className="bg-gray-900">
            <div className="flex justify-center h-screen">
                <div className="hidden bg-cover lg:block lg:w-2/3 login-bg">
                    <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                        <div>
                            <h2 className="text-2xl font-bold text-white sm:text-3xl">React SSO</h2>

                            <p className="max-w-xl mt-3 text-gray-300">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                                autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus
                                molestiae
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                    <div className="flex-1">
                        <div className="text-center">
                            <div className="flex justify-center mx-auto">
                                <img className="w-auto h-7 sm:h-8" src={ reactLogo } alt="" />
                            </div>

                            <p className="mt-3 text-gray-300">Sign in to access your account</p>
                        </div>

                        <div className="mt-8">
                            <button onClick={loginWithGoogle} className="flex w-full items-center justify-center mt-4 transition-colors duration-300 transform border rounded-lg border-gray-700 text-gray-200 hover:bg-gray-600">
                                <div className="px-4 py-2">
                                    <img className="w-6 h-6" src={ googleLogo } alt="" />
                                </div>

                                <span className="w-5/6 px-4 py-3 font-bold text-center">Sign in with Google</span>
                            </button>
                            <button onClick={loginWithMicrosoft} className="flex w-full items-center justify-center mt-4 transition-colors duration-300 transform border rounded-lg border-gray-700 text-gray-200 hover:bg-gray-600">
                                <div className="px-4 py-2">
                                    <img className="w-6 h-6" src={ microsoftLogo } alt="" />
                                </div>

                                <span className="w-5/6 px-4 py-3 font-bold text-center">Sign in with Microsoft</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;