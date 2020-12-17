import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ReportsList from '../reportslist/ReportsList';
import withTabs from '../main/withTabs';

const Search = ({setActiveTab}) => {

    const resultsPerPage = 10;

    const searchRef = useRef(null);
    const [reports, setReports] = useState({});
    const [numResults, setNumResults] = useState(0);
    const [maxPages, setMaxPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [expanded, setExpanded] = useState(true);
    const [filter, setFilter] = useState("");

    useEffect(async () => {
        const cancelTokenSource = axios.CancelToken.source();
        
        try {
            const offset = (currentPage - 1) * resultsPerPage;
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/report/query?sort=dateDesc&limit=10&offset=${offset}&text=${filter}`, {
                cancelToken: cancelTokenSource.token
            });

            setReports(response.data);
            setNumResults(response.data.count);
            setMaxPages(Math.ceil(response.data.count / resultsPerPage));
            setCurrentPage(offset / 10 + 1);
        } catch (err) {
            console.log(err);
        }

        return () => {
            cancelTokenSource.cancel();
        };
    }, [currentPage, filter]);

    const setSearchFilter = (e) => {
        e.preventDefault();
        setFilter(searchRef.current.value);
    };

    const isGetFirstPageEnabled = () => {
        return currentPage !== 1;
    }

    const isGetLastPageEnabled = () => {
        return currentPage < maxPages;
    }

    const getFirstPage = () => {
        setCurrentPage(1);
    };

    const getPreviousPage = () => {
        setCurrentPage(page => page - 1);
    }

    const getNextPage = () => {
        setCurrentPage(page => page + 1);
    }

    const getLastPage = () => {
        setCurrentPage(maxPages);
    }

    const handleExpand = () => {
        setExpanded(expand => !expand);
    };

    return (
        <div>
            <div className="intro">
                <p>
                    Zoek naar rapporten.
                </p>
            </div>
            <form className="search-bar" onSubmit={setSearchFilter}>
                <div className="form-group">
                    <span className="search-label">Zoek</span>
                </div>
                <div className="form-group">
                    <input className="form-control search-field" type="text" placeholder="Zoek op term" name="text" ref={searchRef} />
                </div>
                <div className="form-group">
                    <button id="search-button" className="button-ovs" type="submit">Zoek</button>
                </div>
            </form>
            <div id="js-search-results-all">
                <div className="data-control">
                    <div className="pull-left">
                        <div className="page-information">
                            <span>{numResults} resultaten, pagina {currentPage}</span>
                        </div>
                    </div>
                    <div className="pull-right">
                        <div id="nav-top">
                            <nav>
                                <ul id="pager-adjusted" className="pager">
                                    <li className={isGetFirstPageEnabled() ? "" : "disabled paging-disabled"}>
                                        <Link className="js-nav-button" to="/search" onClick={getFirstPage}>Eerste pagina</Link>&nbsp;
                                    </li>
                                    <li className={isGetFirstPageEnabled() ? "" : "disabled paging-disabled"}>
                                        <Link className="js-nav-button" to={`/search`} onClick={getPreviousPage}>Vorige pagina</Link>&nbsp;
                                    </li>
                                    <li className={isGetLastPageEnabled() ? "" : "disabled paging-disabled"}>
                                        <Link className="js-nav-button" to="/search" onClick={getNextPage}>Volgende pagina</Link>&nbsp;
                                    </li>
                                    <li className={isGetLastPageEnabled() ? "" : "disabled paging-disabled"}>
                                        <Link className="js-nav-button" to={`/search`} onClick={getLastPage}>Laatste pagina ({maxPages})</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="display-options">
                            <div id="expand-area">
                                <label className="checkbox-inline">
                                    <input id="js-expand-all" className="js-expand-all-evt" type="checkbox" checked={expanded} onChange={handleExpand} />
                                    <span id="js-label-expand-all">Resultaten uitklappen</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <ReportsList records={reports.records} setActiveTab={setActiveTab} expand={expanded} />
            </div>
        </div>
    );
}

export default withTabs(Search);
