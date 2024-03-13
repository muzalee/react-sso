import React, { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        document.title = "React SSO - Home";
    }, []);

    return (
        <div className="bg-gray-900">
           
        </div>
    );
};

export default Home;