import React from 'react';
import { Link } from 'react-router-dom';

const Document = ({record, setActiveTab, index}) => (
    <li className={index === 0 ? "eerste" : ""} key={record.uuid}>
        <Link to={`/list/document/${record.uuid}`} onClick={() => setActiveTab("documents")}>
            { record.titel }
        </Link>
    </li>
);

export default Document;
