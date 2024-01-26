import React from 'react';

import DocumentList from '../documents/recent/DocumentList';

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
                        Stuur je email naar: <a className="link" href="mailto:kennishub@overijssel.nl">kennishub@overijssel.nl</a>
                    </p>
                </div>
            </div>
        </div>
        <DocumentList setActiveTab={setActiveTab} />
    </>
);

export default Contact;
