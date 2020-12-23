import React, { useEffect } from 'react';

const NotFound = ({setActiveTab}) => {

    useEffect(() => {
        setActiveTab("");
    }, []);

    return (
        <div className="content_main">
            <h1>404: Not Found</h1>
        </div>
    );
};

export default NotFound;
