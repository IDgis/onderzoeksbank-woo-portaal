import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ReportsList from '../reportslist/ReportsList';
import withTabs from '../main/withTabs';

const Browse = ({setActiveTab}) => {

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

        console.log('ZOEKEN');
    };

    return (
        <>
            <div className="intro">
                <p>
                    Zoek naar rapporten en maak eventueel gebruik van één of meerdere trefwoorden.
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
            <div className="js-browse-results-all">
                <div className="col-md-12">
                    <div className="data-navigation">
                        <div className="row">
                            <span className="col-md-3">669 resultaten, pagina 1</span>
                            <div className="pull-right">
                                <div id="nav-top" className="row">
                                    <nav>
                                        <ul id="pager-adjusted" className="pager">
                                            <li className="disabled paging-disabled">
                                                <Link to="/browse">Eerste pagina</Link>&nbsp;
                                            </li>
                                            <li className="disabled paging-disabled">
                                                <Link to="/browse">Vorige pagina</Link>&nbsp;
                                            </li>
                                            <li className="">
                                                <Link to="/browse">Volgende pagina</Link>&nbsp;
                                            </li>
                                            <li className="">
                                                <Link to="/browse">Laatste pagina (67)</Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                <div id="expand-area" className="row">
                                    <label className="checkbox-inline">
                                        <input id="js-expand-all" className="js-expand-all-evt" type="checkbox" checked={true} />
                                        <span id="js-label-expand-all">Resultaten uitklappen</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="header-subjects" className="row">
                    <div className="col-md-12">
                        <span id="browse-info">Trefwoorden (groepen) waar je uit kan kiezen:</span>
                    </div>
                </div>
                <div className="row">
                    <div id="subjects-list" className="col-md-4">
                        <div id="subject-selection-buttons">
                            <button className="button-ovs js-subject-select-all" type="button">Alles selecteren</button>&nbsp;
                            <button className="button-ovs js-subject-select-none" type="button">Niets selecteren</button>
                        </div>
                        <div>
                            <label className="checkbox-inline">
                                <input className="js-data-subject" data-md-subject="inlandwaters" type="checkbox" checked={true} />
                                <span>Binnenwater</span>
                            </label>
                        </div>
                    </div>
                    <ReportsList records={reports.records} setActiveTab={setActiveTab} classNames="col-md-7" expand={expanded} />
                </div>
            </div>
        </>
    );
}

export default withTabs(Browse);
