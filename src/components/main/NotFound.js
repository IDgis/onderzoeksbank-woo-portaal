import React, { useEffect } from 'react';

const NotFound = ({setActiveTab}) => {

    useEffect(() => {
        setActiveTab("");
    }, []);

    return (
        <div id="content" className="content">
            <div className="dummy">
                <div className="content_main">
                    <h1>404: Not Found</h1>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
