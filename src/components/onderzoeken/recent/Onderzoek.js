import React from 'react';
import { Link } from 'react-router-dom';

const Onderzoek = ({record, setActiveTab, index}) => (
    <li className={index === 0 ? "eerste" : ""} key={record.uuid}>
        <Link to={`/onderzoeksbank/onderzoek/${record.uuid}`} onClick={() => setActiveTab("onderzoeken")}>
            { record.titel }
        </Link>
    </li>
);

export default Onderzoek;
