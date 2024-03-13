import React from 'react';
import reactLogo from '@/assets/react.svg';
import googleLogo from '@/assets/google.svg';

const Login = () => {
    return (
        <div class="bg-gray-900">
            <div class="flex justify-center h-screen">
                <div class="hidden bg-cover lg:block lg:w-2/3 login-bg">
                    <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                        <div>
                            <h2 class="text-2xl font-bold text-white sm:text-3xl">React SSO</h2>

                            <p class="max-w-xl mt-3 text-gray-300">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                                autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus
                                molestiae
                            </p>
                        </div>
                    </div>
                </div>

                <div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                    <div class="flex-1">
                        <div class="text-center">
                            <div class="flex justify-center mx-auto">
                                <img class="w-auto h-7 sm:h-8" src={ reactLogo } alt="" />
                            </div>

                            <p class="mt-3 text-gray-300">Sign in to access your account</p>
                        </div>

                        <div class="mt-8">
                        <a href="#" class="flex items-center justify-center mt-4 transition-colors duration-300 transform border rounded-lg border-gray-700 text-gray-200 hover:bg-gray-600">
                            <div class="px-4 py-2">
                                <img class="w-6 h-6" src={ googleLogo } alt="" />
                            </div>

                            <span class="w-5/6 px-4 py-3 font-bold text-center">Sign in with Google</span>
                        </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;