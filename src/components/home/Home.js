import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = ({setActiveTab}) => {

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
        <div id="content" className="content">
            <div className="dummy">
                <div className="content_main">
                    <div className="page_home">
                        <h1>
                            <strong>Welkom bij de Onderzoeksbank Overijssel</strong>
                        </h1>
                        <p>
                            De provincie Overijssel laat onderzoek doen op allerlei gebieden waar Overijssel bij betrokken is. Dat kan 
                            gaan over het (provinciale) beleid, de uitvoering ervan of een evaluatie. Doel van de onderzoeken is het 
                            vergroten van de effectiviteit en/ of efficiency bij projecten waar de provincie bij betrokken is. Daarbij gaat 
                            het meestal over het effect van beleid, de behaalde doelstellingen of het proces hoe daar gekomen is.
                        </p>
                        <p>
                            De onderzoeken bevatten veel informatie die vaak ook voor derden van belang is. Om deze kennis te delen, 
                            publiceert de provincie een openbaar doorzoekbaar register met onderzoeken: de Onderzoeksbank Overijssel.
                        </p>
                        <p>
                            Ben je op zoek naar een specifiek onderzoek? Wil je weten of er op een bepaald terrein al eens onderzoek is 
                            gedaan? Dan ben je hier aan het juiste adres.
                        </p>
                    </div>
                </div>
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
            </div>
        </div>
    );
};

export default Home;
