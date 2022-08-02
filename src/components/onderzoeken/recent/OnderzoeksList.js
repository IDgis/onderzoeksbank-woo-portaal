import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Onderzoek from './Onderzoek';

const OnderzoeksList = ({setActiveTab}) => {

    const [researches, setResearches] = useState({});

    useEffect(async () => {
        const cancelTokenSource = axios.CancelToken.source();

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/research/query?sort=dateDesc&limit=5&offset=0`, {
                cancelToken: cancelTokenSource.token
            });

            setResearches(response.data);
        } catch (err) {
            console.log(err);
        }

        return () => {
            cancelTokenSource.cancel();
        }
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
                                    researches.records?.map((record, i) =>
                                        <Onderzoek record={record} setActiveTab={setActiveTab} index={i} key={record.uuid} />
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnderzoeksList;
