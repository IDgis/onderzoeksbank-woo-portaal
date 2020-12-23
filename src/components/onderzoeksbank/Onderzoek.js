import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Onderzoek = () => {

    const { onderzoekUUID } = useParams();
    const [record, setReccord] = useState({});

    useEffect(async () => {
        const cancelTokenSource = axios.CancelToken.source();

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/report/query/${onderzoekUUID}`, {
                cancelToken: cancelTokenSource.token
            });

            setReccord(response.data);
        } catch (err) {
            console.log(err);
        }

        return () => {
            cancelTokenSource.cancel();
        };
    }, []);

    return (
        <>
            <div className="content_main">
                <div className="onderzoeken-laatste">
                    <h1>Onderzoek Detail</h1>
                    <Link to="/onderzoeksbank">{"<< Terug naar de zoekresultaten"}</Link>
                    <div className="print-onderzoek">
                        <div className="onderzoek-hoofd hoeken_5">
                            <table width="100%" cellSpacing="0" cellPadding="0" border="0">
                                <tbody>
                                    <tr>
                                        <td width="20" align="center">
                                            <ul><li></li></ul>
                                        </td>
                                        <td>
                                            <Link to={`/onderzoeksbank/onderzoek/${onderzoekUUID}`}>{ record.titel }</Link>
                                        </td>
                                        <td className="date" width="100">
                                            { record.datumPublicatie?.split("T")[0] }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="onderzoek-content">
                            <table width="100%" cellSpacing="1" cellPadding="0">
                                <tbody>
                                    <tr>
                                        <td className="icoon" width="20" align="center">
                                            <ul style={{position:"absolute",top:"15px"}}><li></li></ul>
                                        </td>
                                        <td className="zoekoverzicht" colSpan="2">
                                            <strong>Samenvatting:</strong>
                                            <p></p>
                                            <p>{ record.omschrijving }</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="icoon" width="20" align="center">
                                            <ul><li></li></ul>
                                        </td>
                                        <td className="zoekoverzicht">
                                            <strong>Rapporten</strong>
                                        </td>
                                        <td className="zoekoverzicht">
                                            <ul>
                                                {
                                                    record.bijlagen?.map(bijlage =>
                                                        <li key={bijlage.naam}>
                                                            <a href={`${process.env.REACT_APP_API_HOST}/attachment/${onderzoekUUID}/${bijlage.naam}`} target="_blank">{ bijlage.naam }</a>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="icoon" width="20" align="center">
                                            <ul><li></li></ul>
                                        </td>
                                        <td className="zoekoverzicht">
                                            <strong>Publicatie datum</strong>
                                        </td>
                                        <td className="zoekoverzicht">
                                            { record.datumPublicatie?.split("T")[0] }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="icoon" width="20" align="center">
                                            <ul><li></li></ul>
                                        </td>
                                        <td className="zoekoverzicht">
                                            <strong>Eindverantwoordelijke</strong>
                                        </td>
                                        <td className="zoekoverzicht">
                                            { record.eindverantwoordelijke }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="icoon" width="20" align="center">
                                            <ul><li></li></ul>
                                        </td>
                                        <td className="zoekoverzicht">
                                            <strong>Onderwerpen</strong>
                                        </td>
                                        <td className="zoekoverzicht">
                                            <ul>
                                                {
                                                    record.isoOnderwerpen?.map(onderwerp =>
                                                        <li key={onderwerp}>{ onderwerp }</li>
                                                    )
                                                }
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="icoon" width="20" align="center">
                                            <ul><li></li></ul>
                                        </td>
                                        <td className="zoekoverzicht">
                                            <strong>Gebruiksrestricties</strong>
                                        </td>
                                        <td className="zoekoverzicht">
                                            { record.gebruiksrestricties }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Onderzoek;
