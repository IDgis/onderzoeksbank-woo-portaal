import React, { useEffect, useState } from 'react';
import axios from 'axios';

import PageInformation from '../../page/PageInformation';
import PageNavigation from '../../page/PageNavigation';
import Search from '../../search/Search';
import Onderzoek from './Onderzoek';

const OnderzoeksList = () => {

    const resultsPerPage = 15;

    const [onderwerpen, setOnderwerpen] = useState([]);
    const [reports, setReports] = useState({});
    const [numResults, setNumResults] = useState(0);
    const [maxPages, setMaxPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [textFilter, setTextFilter] = useState("");
    const [onderwerpFilter, setOnderwerpFilter] = useState("");

    // Haal alle onderwerpen op
    useEffect(async () => {
        const cancelTokenSource = axios.CancelToken.source();

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/report/subjects`, {
                cancelToken: cancelTokenSource.token
            });

            setOnderwerpen(response.data);
        } catch (err) {
            console.log(err);
        }

        return () => {
            cancelTokenSource.cancel();
        };
    }, []);

    // Haal alle gevraagde onderzoeken op
    useEffect(async () => {
        const cancelTokenSource = axios.CancelToken.source();

        try {
            const offset = (currentPage - 1) * resultsPerPage;
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/report/query?sort=dateDesc&limit=${resultsPerPage}&offset=${offset}&text=${textFilter}&subjectFilter=${onderwerpFilter}`, {
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
    }, [currentPage, textFilter, onderwerpFilter]);

    return (
        <>
            <div className="content_main">
                <div className="onderzoeken-laatste">
                    <h1>Laatst uitgevoerde onderzoeken</h1>
                    <PageInformation numResults={numResults} currentPage={currentPage} />
                    {
                        reports.records?.map(record => 
                            <Onderzoek record={record} key={record.uuid} />
                        )
                    }
                </div>
                <PageNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} maxPages={maxPages} />
            </div>
            <Search setTextFilter={setTextFilter} onderwerpen={onderwerpen} setOnderwerpFilter={setOnderwerpFilter} />
        </>
    );
};

export default OnderzoeksList;
