import React from 'react';
import parse from 'html-react-parser';

import DocumentList from '../documents/recent/DocumentList';

const Home = ({setActiveTab}) => (
    <>
        <div className="content_main">
            <div className="page_home">
                {parse(process.env.REACT_APP_HOME_HTML)}
            </div>
        </div>
        <DocumentList setActiveTab={setActiveTab} />
    </>
);

export default Home;
