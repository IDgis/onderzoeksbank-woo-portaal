import React from 'react';
import RecentReports from '../report/RecentReports';

const Home = ({setActiveTab}) => (
    <>
        <div className="content_main">
            <div className="page_home">
                <h1>
                    <strong>Welkom bij de Onderzoeksbank Overijssel</strong>
                </h1>
                <p>
                    De provincie Overijssel laat onderzoek doen op allerlei gebieden waar Overijssel bij betrokken is. Dat kan 
                    gaan over het (provinciale) beleid, de uitvoering ervan of een evaluatie. Doel van de onderzoeken is het 
                    vergroten van de effectiviteit en/ of efficiency bij projecten waar de provincie bij betrokken is. Daarbij gaat 
                    het meestal over het effect van beleid, de behaalde doelstellingen of het proces hoe daar gekomen is.
                </p>
                <p>
                    De onderzoeken bevatten veel informatie die vaak ook voor derden van belang is. Om deze kennis te delen, 
                    publiceert de provincie een openbaar doorzoekbaar register met onderzoeken: de Onderzoeksbank Overijssel.
                </p>
                <p>
                    Ben je op zoek naar een specifiek onderzoek? Wil je weten of er op een bepaald terrein al eens onderzoek is 
                    gedaan? Dan ben je hier aan het juiste adres.
                </p>
            </div>
        </div>
        <RecentReports setActiveTab={setActiveTab} />
    </>
);

export default Home;
