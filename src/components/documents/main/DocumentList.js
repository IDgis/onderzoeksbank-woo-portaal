import React, { useEffect, useState } from 'react';
import axios from 'axios';

import PageInformation from '../../page/PageInformation';
import PageNavigation from '../../page/PageNavigation';
import Search from '../../search/Search';
import Document from './Document';

const DocumentList = () => {

    const resultsPerPage = 15;

    const [documents, setDocuments] = useState({});
    const [numResults, setNumResults] = useState(0);
    const [maxPages, setMaxPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [textFilter, setTextFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [themeFilter, setThemeFilter] = useState("");
    const [creationYearFilter, setCreationYearFilter] = useState(0);

    const [documentTypes, setDocumentTypes] = useState([]);
    const [themes, setThemes] = useState([]);
    const [wooThemes, setWooThemes] = useState([]);

    // Haal alle type documenten op
    useEffect(async () => {
        const cancelTokenSource = axios.CancelToken.source();

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/document/types`, {
                cancelToken: cancelTokenSource.token
            });

            setDocumentTypes(response.data);
        } catch (err) {
            console.log("Er ging iets mis bij het ophalen van de typen documenten", err);
        }

        return () => {
            cancelTokenSource.cancel();
        };
    }, []);

    // Haal alle thema's op
    useEffect(async () => {
        const cancelTokenSource = axios.CancelToken.source();

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/document/themes`, {
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

    // Haal alle WOO thema's op
    useEffect(async () => {
        const cancelTokenSource = axios.CancelToken.source();

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/document/woothemes`, {
                cancelToken: cancelTokenSource.token
            });

            setWooThemes(response.data);
        } catch (err) {
            console.log("Er ging iets mis bij het ophalen van de WOO thema's", err);
        }

        return () => {
            cancelTokenSource.cancel();
        };
    }, []);

    // Haal alle gevraagde documenten op
    useEffect(async () => {
        const cancelTokenSource = axios.CancelToken.source();

        try {
            const offset = (currentPage - 1) * resultsPerPage;
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/document/search/${process.env.REACT_APP_TYPE_APP}?sort=dateDesc&limit=${resultsPerPage}&offset=${offset}&text=${textFilter}&typeFilter=${typeFilter}&themeFilter=${themeFilter}&creationYear=${creationYearFilter}`, {
                cancelToken: cancelTokenSource.token
            });

            setDocuments(response.data);
            setNumResults(response.data.count);
            setMaxPages(Math.ceil(response.data.count / resultsPerPage));
            setCurrentPage(offset / resultsPerPage + 1);
        } catch (err) {
            console.log("Er ging iets mis bij het ophalen van de documenten", err);
        }

        return () => {
            cancelTokenSource.cancel();
        };
    }, [currentPage, textFilter, typeFilter, themeFilter, creationYearFilter]);

    return (
        <>
            <div className="content_main">
                <div className="documents-laatste">
                    <h1>Laatst uitgevoerde documenten</h1>
                    <PageInformation numResults={numResults} currentPage={currentPage} />
                    {
                        documents.records?.map(record => 
                            <Document record={record} key={record.uuid} />
                        )
                    }
                </div>
                <PageNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} maxPages={maxPages} />
            </div>
            <Search themes={themes} wooThemes={wooThemes} documentTypes={documentTypes} setTextFilter={setTextFilter} setTypeFilter={setTypeFilter} setThemeFilter={setThemeFilter} setCreationYearFilter={setCreationYearFilter} />
        </>
    );
};

export default DocumentList;
