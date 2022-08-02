import React, { useEffect, useState } from 'react';
import axios from 'axios';

import PageInformation from '../../page/PageInformation';
import PageNavigation from '../../page/PageNavigation';
import Search from '../../search/Search';
import Onderzoek from './Onderzoek';

const OnderzoeksList = () => {

    const resultsPerPage = 15;

    const [researches, setResearches] = useState({});
    const [numResults, setNumResults] = useState(0);
    const [maxPages, setMaxPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [textFilter, setTextFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [themeFilter, setThemeFilter] = useState("");

    const [researchTypes, setResearchTypes] = useState([]);
    const [themes, setThemes] = useState([]);

    // Haal alle typen onderzoek op
    useEffect(async () => {
        const cancelTokenSource = axios.CancelToken.source();

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/research/types`, {
                cancelToken: cancelTokenSource.token
            });

            setResearchTypes(response.data);
        } catch (err) {
            console.log("Er ging iets mis bij het ophalen van de typen onderzoeken", err);
        }

        return () => {
            cancelTokenSource.cancel();
        };
    }, []);

    // Haal alle thema's op
    useEffect(async () => {
        const cancelTokenSource = axios.CancelToken.source();

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/research/themes`, {
                cancelToken: cancelTokenSource.token
            });

            setThemes(response.data);
        } catch (err) {
            console.log("Er ging iets mis bij het ophalen van de thema's", err);
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
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/research/query?sort=dateDesc&limit=${resultsPerPage}&offset=${offset}&text=${textFilter}&typeFilter=${typeFilter}&themeFilter=${themeFilter}`, {
                cancelToken: cancelTokenSource.token
            });

            setResearches(response.data);
            setNumResults(response.data.count);
            setMaxPages(Math.ceil(response.data.count / resultsPerPage));
            setCurrentPage(offset / resultsPerPage + 1);
        } catch (err) {
            console.log("Er ging iets mis bij het ophalen van de onderzoeken", err);
        }

        return () => {
            cancelTokenSource.cancel();
        };
    }, [currentPage, textFilter, typeFilter, themeFilter]);

    return (
        <>
            <div className="content_main">
                <div className="onderzoeken-laatste">
                    <h1>Laatst uitgevoerde onderzoeken</h1>
                    <PageInformation numResults={numResults} currentPage={currentPage} />
                    {
                        researches.records?.map(record => 
                            <Onderzoek record={record} key={record.uuid} />
                        )
                    }
                </div>
                <PageNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} maxPages={maxPages} />
            </div>
            <Search setTextFilter={setTextFilter} themes={themes} researchTypes={researchTypes} setTypeFilter={setTypeFilter} setThemeFilter={setThemeFilter} />
        </>
    );
};

export default OnderzoeksList;
