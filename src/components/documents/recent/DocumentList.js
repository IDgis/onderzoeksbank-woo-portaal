import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Document from './Document';

const DocumentList = ({setActiveTab}) => {

    const [documents, setDocuments] = useState({});

    useEffect(async () => {
        const cancelTokenSource = axios.CancelToken.source();

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/document/search/${process.env.REACT_APP_TYPE_APP}?sort=dateDesc&limit=5&offset=0`, {
                cancelToken: cancelTokenSource.token
            });

            setDocuments(response.data);
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
                                    documents.records?.map((record, i) =>
                                        <Document record={record} setActiveTab={setActiveTab} index={i} key={record.uuid} />
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

export default DocumentList;
