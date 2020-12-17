import React from 'react';

import Report from './Report';

const ReportsList = ({records, setActiveTab, expand}) => (
    <div className="col-md-11 col-md-offset-1">
        {records?.map(report => (
            <Report
                key={report.uuid}
                titel={report.titel}
                omschrijving={report.omschrijving}
                reportUUID={report.uuid}
                datum={report.datumPublicatie}
                eindverantwoordelijke={report.eindverantwoordelijke}
                setActiveTab={setActiveTab}
                expand={expand}
            />
        ))}
    </div>
);

export default ReportsList;
