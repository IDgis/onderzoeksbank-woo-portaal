import React from 'react';
import { Link } from 'react-router-dom';

const Report = ({titel, omschrijving, reportUUID, datum, eindverantwoordelijke, setActiveTab, expand}) => (
    <div className="home-metadata">
        <div className="row">
            <div className="col-md-12">
                <p className="title">
                    <Link className="md-title" to={`/report/${reportUUID}`} target="_blank" onClick={() => setActiveTab("report")}>
                        {titel} ({datum.split("T")[0]}, {eindverantwoordelijke})
                    </Link>
                </p>
            </div>
            {expand &&
            <div className="col-md-12">
                <p>
                    {omschrijving}
                </p>
                <Link className="link" to={`/report/${reportUUID}`} target="_blank" onClick={() => setActiveTab("report")}>
                    Meer informatie
                </Link>
            </div>
            }
        </div>
    </div>
);

export default Report;
