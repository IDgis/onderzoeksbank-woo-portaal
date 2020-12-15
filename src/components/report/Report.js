import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Report = ({activeTab, match}) => {

    const [report, setReport] = useState({});

    useEffect(async () => {
        const cancelTokenSource = axios.CancelToken.source();
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/report/query/${match.params.reportUUID}`, {
                cancelToken: cancelTokenSource.token
            });
            setReport(response.data);
        } catch (err) {
            console.log(err);
        }

        return () => {
            cancelTokenSource.cancel();
        }
    }, []);

    return (
        <div style={{fontFamily:"Verdana"}}>
            <div id="titel">
                <div className="blok">
                    <p className="bestandsnaam">
                        <b>Naam rapport:</b> {report.titel}
                    </p>
                </div>
            </div>
            <div id="wat">
                <div className="blok">
                    <div id="abstract">
                        <p>
                            <b>Samenvatting:</b> {report.omschrijving}
                        </p>
                    </div>
                </div>
                <div className="blok">
                    <div id="publicationdate">
                        <p>
                            <b>Publicatie datum:</b> {report.datumPublicatie?.split('T')[0]}
                        </p>
                    </div>
                </div>
                <div className="blok">
                    <div id="owner">
                        <p>
                            <b>Eindverantwoordelijke:</b> {report.eindverantwoordelijke}
                        </p>
                    </div>
                </div>
                <div className="blok">
                    <div id="subjects">
                        <p>
                            <b>Onderwerpen:</b>
                        </p>
                        <ul>
                            {report.isoOnderwerpen?.map(onderwerp => <li key={onderwerp}>{onderwerp}</li>)}
                        </ul>
                    </div>
                </div>
                <div className="blok">
                    <div id="attachments">
                        <p>
                            <b>Bijlagen:</b>
                        </p>
                        <ul>
                            {report.bijlagen?.map(bijlage => 
                                <li key={bijlage.naam}>
                                    <a href={`${process.env.REACT_APP_API_HOST}/attachment/${match.params.reportUUID}/${bijlage.naam}`} target="_blank">{bijlage.naam}</a>
                                </li>)}
                        </ul>
                    </div>
                </div>
                <div className="blok">
                    <div id="restrictions">
                        <p>
                            <b>Gebruiksrestricties:</b> {report.gebruiksrestricties}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Report;
