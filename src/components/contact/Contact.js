import React from 'react';

import withTabs from '../main/withTabs';

const Contact = ({activeTab, setActiveTab}) => (
    <div className="content">
        <p>
            De informatie in de Onderzoeksbank wordt beschikbaar gesteld door het team Beleidsinformatie van de provincie Overijssel.
        </p>
        <p>
            Heb je vragen, suggesties of tips, aarzel dan niet contact op te nemen.
        </p>
        <p>
            Stuur je email naar: <a className="link" href="mailto:beleidsinformatie@overijssel.nl">beleidsinformatie@overijssel.nl</a>
        </p>
    </div>
);

export default withTabs(Contact);
