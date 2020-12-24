import React, { useRef, useState } from 'react';

import Onderwerpen from './advanced/OnderwerpenSearch';
import TextSearch from './TextSearch';

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
