import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RecentReports = ({setActiveTab}) => {

    const [reports, setReports] = useState({});

    useEffect(async () => {
        const cancelTokenSource = axios.CancelToken.source();

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/report/query?sort=dateDesc&limit=5&offset=0`, {
                cancelToken: cancelTokenSource.token
            });

            setReports(response.data);
        } catch (err) {
            console.log(err);
        }

        return () => {
            cancelTokenSource.cancel();
        };
    }, []);

    return (
        <div className="content_right">
            <div id="nieuws_widget">
                <div className="tabs">
                    <div className="tabkoppen">
                        <div className="tab hoeken_3_boven actief">
                            Laatst Toegevoegd
                        </div>
                    </div>
                    <div className="tabbladen">
                        <div id="laatst_toegevoegd" className="tabblad actief">
                            <ul>
                                {
                                    reports.records?.map((record, i) => (
                                        <li className={i === 0 ? "eerste" : ""} key={record.uuid}>
                                            <Link to={`/onderzoeksbank/onderzoek/${record.uuid}`} onClick={() => setActiveTab("onderzoeksbank")}>
                                                { record.titel }
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentReports;
