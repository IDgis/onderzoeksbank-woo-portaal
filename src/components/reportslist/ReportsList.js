import React from 'react';

import Report from './Report';

const ReportsList = ({records, setActiveTab, classNames, expand}) => (
    <div className={classNames}>
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
