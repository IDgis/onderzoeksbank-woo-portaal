import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import PageDisplayOptions from '../page/PageDisplayOptions';
import PageInformation from '../page/PageInformation';
import PageNavigation from '../page/PageNavigation';
import ReportsList from '../reportslist/ReportsList';
import SearchForm from './SearchForm';
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

    return (
        <>
            <div className="intro">
                <p>
                    Zoek naar rapporten en maak eventueel gebruik van één of meerdere trefwoorden.
                </p>
            </div>
            <SearchForm setFilter={setFilter} ref={searchRef} />
            <div id="js-search-results-all">
                <div className="col-md-12">
                    <div className="data-control">
                        <div className="pull-left">
                            <PageInformation numResults={numResults} currentPage={currentPage} />
                        </div>
                        <div className="pull-right">
                            <PageNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} maxPages={maxPages} />
                            <PageDisplayOptions expanded={expanded} setExpanded={setExpanded} />
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
                        <div>
                            <label className="checkbox-inline">
                                <input className="js-data-subject" data-md-subject="structure" type="checkbox" checked={true} />
                                <span>Civiele structuren</span>
                            </label>
                        </div>
                    </div>
                    <ReportsList records={reports.records} setActiveTab={setActiveTab} classNames="col-md-7" expand={expanded} />
                </div>
            </div>
        </>
    );
}

export default withTabs(Search);
