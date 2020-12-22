import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import PageDisplayOptions from '../page/PageDisplayOptions';
import PageInformation from '../page/PageInformation';
import PageNavigation from '../page/PageNavigation';
import ReportsList from '../reportslist/ReportsList';
import SearchForm from './SearchForm';
import Subject from './Subject';

const Search = ({setActiveTab}) => {

    const resultsPerPage = 10;

    const searchRef = useRef(null);
    const [reports, setReports] = useState({});
    const [numResults, setNumResults] = useState(0);
    const [maxPages, setMaxPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [expanded, setExpanded] = useState(true);
    const [filter, setFilter] = useState("");
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const subjectList = {
            "inlandwaters": "Binnenwater",
            "structure" : "Civiele structuren",
            "society": "Cultuur, maatschappij en demografie",
            "economy": "Economie",
            "biota": "Flora en fauna",
            "geoscientificInformation": "Geowetenschappelijke data",
            "health": "Gezondheid",
            "boundaries": "Grenzen",
            "elevation": "Hoogte",
            "climatologyMeteorologyAtmosphere": "Klimatologie, metereologie en atmosfeer",
            "farming": "Landbouw en veeteelt",
            "location": "Locatie",
            "intelligenceMilitary": "Militair",
            "environment": "Natuur en milieu",
            "utilitiesCommunication": "Nutsvoorzieningen en communicatie",
            "oceans": "Oceanen",
            "imageryBaseMapsEarthCover": "Referentiemateriaal aardbedekking",
            "planningCadastre": "Ruimtelijke ordening en kadaster",
            "transportation": "Transport en logistiek"
        };

        const subjectArr = [];
        for (const s in subjectList) {
            subjectArr.push({
                "id": s,
                "title": subjectList[s],
                "checked": true
            });
        }
        setSubjects(subjectArr);
    }, []);

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
    }, [currentPage, filter, subjects]);

    const selectAllSubjects = () => {
        setSubjects(s => s.map(sub => {
            sub.checked = true;
            return sub;
        }));
    };

    const deselectAllSubjects = () => {
        setSubjects(s => s.map(sub => {
            sub.checked = false;
            return sub;
        }));
    };

    const handleSubjectChange = (subjectId) => {
        setSubjects(s => s.map(sub => {
            if (sub.id === subjectId) {
                sub.checked = !sub.checked;
            }
            return sub;
        }));
    };

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
                            <div id="nav-top">
                                <PageNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} maxPages={maxPages} />
                            </div>
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
                            <button className="button-ovs js-subject-select-all" type="button" onClick={selectAllSubjects}>Alles selecteren</button>&nbsp;
                            <button className="button-ovs js-subject-select-none" type="button" onClick={deselectAllSubjects}>Niets selecteren</button>
                        </div>
                        { subjects.map(subject => <Subject key={subject.id} subjectId={subject.id} subjectTitle={subject.title} isChecked={subject.checked} handleChange={handleSubjectChange} />) }
                    </div>
                    <ReportsList records={reports.records} setActiveTab={setActiveTab} classNames="col-md-7" expand={expanded} />
                    <div id="nav-bottom" className="col-md-7 col-md-offset-4">
                        <PageNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} maxPages={maxPages} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Search;
