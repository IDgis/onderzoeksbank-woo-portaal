import React from 'react';
import RecentReports from '../report/RecentReports';

const Contact = ({setActiveTab}) => (
    <>
        <div className="content_main">
            <div className="page_default">
                <div>
                    <h1>Contactgegevens</h1>
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
            </div>
        </div>
        <RecentReports setActiveTab={setActiveTab} />
    </>
);

export default Contact;
