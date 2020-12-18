import React from 'react';
import { Link } from 'react-router-dom';

const PageNavigation = ({currentPage, setCurrentPage, maxPages}) => {

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

    return (
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
    );
};

export default PageNavigation;
