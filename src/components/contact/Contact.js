import React, { useEffect } from 'react';
import parse from 'html-react-parser';

import DocumentList from '../documents/recent/DocumentList';

const Contact = ({setActiveTab}) => {
    useEffect(async () => {
        document.title = `Contact | ${process.env.REACT_APP_TITLE}`;
    }, []);

    return (
        <>
            <div className="content_main">
                <div className="page_default">
                    <div>
                        {parse(process.env.REACT_APP_CONTACT_HTML)}
                    </div>
                </div>
            </div>
            <DocumentList setActiveTab={setActiveTab} />
        </>
    );
};

export default Contact;
