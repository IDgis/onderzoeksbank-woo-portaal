import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import PageInformation from '../page/PageInformation';
import PageNavigation from '../page/PageNavigation';
import Search from '../search/Search';

const Onderzoeksbank = () => {

    const resultsPerPage = 15;

    const [reports, setReports] = useState({});
    const [numResults, setNumResults] = useState(0);
    const [maxPages, setMaxPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("");

    useEffect(async () => {
        const cancelTokenSource = axios.CancelToken.source();

        try {
            const offset = (currentPage - 1) * resultsPerPage;
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/report/query?sort=dateDesc&limit=${resultsPerPage}&offset=${offset}&text=${filter}`, {
                cancelToken: cancelTokenSource.token
            });

            setReports(response.data);
            setNumResults(response.data.count);
            setMaxPages(Math.ceil(response.data.count / resultsPerPage));
            setCurrentPage(offset / resultsPerPage + 1);
        } catch (err) {
            console.log(err);
        }

        return () => {
            cancelTokenSource.cancel();
        };
    }, [currentPage, filter]);

    return (
        <>
            <div className="content_main">
                <div className="onderzoeken-laatste">
                    <h1>Laatst uitgevoerde onderzoeken</h1>
                    <PageInformation numResults={numResults} currentPage={currentPage} />
                    {
                        reports.records?.map(record => (
                            <div className="onderzoek-hoofd hoeken_5" key={record.uuid}>
                                <table width="100%" cellSpacing="0" cellPadding="0" border="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Link to={`/onderzoeksbank/onderzoek/${record.uuid}`}>{ record.titel }</Link>
                                            </td>
                                            <td className="date" width="100">
                                                { record.datumPublicatie.split("T")[0] }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ))
                    }
                </div>
                <PageNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} maxPages={maxPages} />
            </div>
            <Search setFilter={setFilter} />
        </>
    );
};

export default Onderzoeksbank;
