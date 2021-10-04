import React, { useRef, useState } from 'react';

import Onderwerpen from './advanced/OnderwerpenSearch';
import TextSearch from './TextSearch';

const rapportTypen = [
    {
        "id": "rapport",
        "label": "Rapport"
    },
    {
        "id": "beleidsrapport",
        "label": "Beleidsrapport"
    },
    {
        "id": "onderzoeksrapport",
        "label": "Onderzoeksrapport"
    },
    {
        "id": "overigerapporten",
        "label": "Overige rapporten"
    }
];

const Search = ({setTextFilter, onderwerpen, setOnderwerpFilter}) => {
    const textRef = useRef(null);
    const onderwerpRef = useRef(null);
    const [activeTab, setActiveTab] = useState("search");

    const searchResults = (e) => {
        e.preventDefault();

        setTextFilter(textRef.current.value);

        const allOnderwerpen = onderwerpRef.current === null || onderwerpRef.current?.value === "all";
        setOnderwerpFilter(allOnderwerpen ? "" : onderwerpRef.current.value);
    };

    return (
        <div className="content_right">
            <div id="zoeken_widget">
                <div className="tabs">
                    <div className="tabkoppen">
                        <div className={`tab hoeken_3_boven ${activeTab === "search" ? "actief" : ""}`} onClick={() => setActiveTab("search")}>Zoeken</div>
                        <div className={`tab hoeken_3_boven ${activeTab === "advanced" ? "actief" : ""}`} onClick={() => setActiveTab("advanced")}>Uitgebreid zoeken</div>
                    </div>
                    <div className="tabbladen">
                        <div id="kortzoeken" className="tabblad">
                            <div className="advanced_search" style={{padding:"10px"}}>
                                <form onSubmit={searchResults}>
                                    <table width="100%" cellSpacing="0" cellPadding="0">
                                        <tbody>
                                            <TextSearch ref={textRef} />
                                            {activeTab === "advanced" &&
                                                <>
                                                    <Onderwerpen onderwerpen={onderwerpen} ref={onderwerpRef} />
                                                    <tr>
                                                        <td>
                                                            <label htmlFor="typen">Rapport typen</label>
                                                            <select id="typen" className="zoekselect" name="typen">
                                                                <option value="all">Alle typen</option>
                                                                {
                                                                    rapportTypen?.map(rapportType =>
                                                                        <option key={rapportType.id} value={rapportType.id}>{ rapportType.label }</option>
                                                                    )
                                                                }
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label htmlFor="geldigVan">Geldig van</label>
                                                            <input id="geldigVan" className="zoekselect" type="date" name="geldigVan"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label htmlFor="geldigTot">Geldig tot</label>
                                                            <input id="geldigTot" className="zoekselect" type="date" name="geldigTot"/>
                                                        </td>
                                                    </tr>
                                                </>
                                            }

                                        </tbody>
                                    </table>
                                    <button className="button" type="submit">
                                        Zoeken <img src="/search.png" width="10px" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
