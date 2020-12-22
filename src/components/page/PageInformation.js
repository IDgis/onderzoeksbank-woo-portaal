import React from 'react';

const PageInformation = ({numResults, currentPage}) => (
    <div className="page-information">
        {   numResults > 0 ?
            <span>{ numResults } resultaten, pagina { currentPage }</span> :
            <span>Geen resultaten gevonden</span>
        }
    </div>
);

export default PageInformation;
