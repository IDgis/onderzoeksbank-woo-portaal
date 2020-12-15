import React from 'react';

import Report from './Report';

const ReportsList = ({reports, setActiveTab}) => (
    <div className="col-md-11 col-md-offset-1">
        {reports.records?.map(report => (
            <Report
                key={report.uuid}
                titel={report.titel}
                omschrijving={report.omschrijving}
                reportUUID={report.uuid}
                datum={report.datumPublicatie}
                eindverantwoordelijke={report.eindverantwoordelijke}
                setActiveTab={setActiveTab}
            />
        ))}
    </div>
);

export default ReportsList;
