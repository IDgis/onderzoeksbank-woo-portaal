import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Document = () => {

    const { documentUUID } = useParams();
    const [record, setRecord] = useState({});
    const typeApp = process.env.REACT_APP_TYPE_APP;
    const themeTypes = [
        {
            type: "ob",
            label: "Thema's",
            key: "themas"
        },
        {
            type: "woo",
            label: "WOO thema's",
            key: "wooThemas"
        }
    ]

    useEffect(async () => {
        const cancelTokenSource = axios.CancelToken.source();

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/document/${typeApp}/${documentUUID}`, {
                cancelToken: cancelTokenSource.token
            });

            setRecord(response.data);
        } catch (err) {
            console.log("Er ging iets mis met het ophalen van het document met UUID: ", documentUUID, err);
        }

        return () => {
            cancelTokenSource.cancel();
        };
    }, []);

    return (
        <>
            <div className="content_main">
                <div className="documents-laatste">
                    <h1>Document Detail</h1>
                    <Link to="/list">{"<< Terug naar de zoekresultaten"}</Link>
                    <div className="print-document">
                        <div className="document-hoofd hoeken_5">
                            <table width="100%" cellSpacing="0" cellPadding="0" border="0">
                                <tbody>
                                    <tr>
                                        <td width="20" align="center">
                                            <ul><li></li></ul>
                                        </td>
                                        <td>
                                            <Link to={`/list/document/${documentUUID}`}>{ record.titel }</Link>
                                        </td>
                                        <td className="date" width="100">
                                            { new Date(record.datumCreatie).getFullYear().toString() }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="document-content">
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
                                            <strong>Bijlagen</strong>
                                        </td>
                                        <td className="zoekoverzicht">
                                            <ul>
                                                {
                                                    record.bijlagen?.map(bijlage =>
                                                        <li key={bijlage.naam}>
                                                            <a href={`${process.env.REACT_APP_API_HOST}/attachment/${documentUUID}/${bijlage.naam}`} target="_blank">{ bijlage.naam }</a>
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
                                            <strong>Creatie jaar</strong>
                                        </td>
                                        <td className="zoekoverzicht">
                                            { new Date(record.datumCreatie).getFullYear().toString() }
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
                                    { typeApp === 'ob' &&
                                        <tr>
                                            <td className="icoon" width="20" align="center">
                                                <ul><li></li></ul>
                                            </td>
                                            <td className="zoekoverzicht">
                                                <strong>Type document</strong>
                                            </td>
                                            <td className="zoekoverzicht">
                                                { record.typeOnderzoek }
                                            </td>
                                        </tr>
                                    }
                                    {
                                        themeTypes?.map(themeType => 
                                            typeApp === themeType.type &&
                                                <tr key={themeType.key}>
                                                    <td className="icoon" width="20" align="center">
                                                        <ul><li></li></ul>
                                                    </td>
                                                    <td className="zoekoverzicht">
                                                        <strong>{themeType.label}</strong>
                                                    </td>
                                                    <td className="zoekoverzicht">
                                                        <ul>
                                                            {
                                                                record[themeType.key]?.map(item =>
                                                                    <li key={item}>{ item }</li>
                                                                )
                                                            }
                                                        </ul>
                                                    </td>
                                                </tr>
                                        )
                                    }
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

export default Document;
