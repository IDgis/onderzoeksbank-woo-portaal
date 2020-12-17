import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ReportsList from '../reportslist/ReportsList';
import withTabs from '../main/withTabs';

const Home = ({activeTab, setActiveTab}) => {

    const [reports, setReports] = useState({});
    const [filter, setFilter] = useState("");
    const searchRef = useRef(null);

    useEffect(async () => {
        const cancelTokenSource = axios.CancelToken.source();
        
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/report/query?sort=dateDesc&limit=5`, {
                cancelToken: cancelTokenSource.token
            });

            if (filter !== "") {
                const filteredReports = response.data.records.filter(record =>
                    record.titel.indexOf(filter) !== -1 || record.omschrijving.indexOf(filter) !== -1);
                
                    setReports({count: filteredReports.length, records: filteredReports});
            } else {
                setReports(response.data);
            }
        } catch (err) {
            console.log(err);
        }

        return () => {
            cancelTokenSource.cancel();
        };
    }, [filter]);

    const filterReports = async (e) => {
        e.preventDefault();
        setFilter(searchRef.current.value);
    };



    return (
        <div>
            <div id="index-extra-text">
                In de Onderzoeksbank van Overijssel vindt u rapporten van datasets. 
                Het beheer van data en de bijbehorende beschrijvingen worden regelmatig uitgevoerd. 
                Hieronder staan de meest actuele rapporten. U kunt meteen beginnen met zoeken. 
                Bij <Link className="link" to="/search" onClick={() => {setActiveTab("search")}}>uitgebreid zoeken</Link> of <Link className="link" to="/browse" onClick={() => {setActiveTab("browse")}}>bladeren</Link> vindt u nog meer zoekmogelijkheden.
            </div>
            <div className="intro">
                <p>
                    Zoek en download actuele rapporten en beschrijvingen van de provincie Overijssel.
                </p>
            </div>
            <form className="search-bar" onSubmit={filterReports}>
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
            <div className="header-recent-files">
                <div className="col-md-12">
                    <span className="files-info">
                        Vijf meest recente rapporten:
                    </span>
                </div>
            </div>
            <ReportsList records={reports.records} setActiveTab={setActiveTab} expand={true} />
        </div>
    );
};

export default withTabs(Home);
