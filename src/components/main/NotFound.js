import React from 'react';

import withTabs from './withTabs';

const NotFound = ({activeTab, setActiveTab}) => (
    <div>
        <h1>404: Not Found</h1>
    </div>
);

export default withTabs(NotFound);
