import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

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
        <div className="flex bg-gray-900 h-screen">
           <span className="text-gray-50 mx-auto my-auto">Home</span>
        </div>
    );
};

export default Home;