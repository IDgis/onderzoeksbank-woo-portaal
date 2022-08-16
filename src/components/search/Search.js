import React, { useRef, useState } from 'react';

import CreationYearSearch from './advanced/CreationYearSearch'
import ResearchTypesSearch from './advanced/ResearchTypesSearch';
import TextSearch from './TextSearch';
import ThemesSearch from './advanced/ThemesSearch';

const Search = ({setTextFilter, setTypeFilter, setThemeFilter, setCreationYearFilter, themes, researchTypes}) => {
    const textRef = useRef(null);
    const researchTypeRef = useRef(null);
    const themeRef = useRef(null);
    const creationYearRef = useRef(null);
    const [activeTab, setActiveTab] = useState("search");

    const searchResults = (e) => {
        e.preventDefault();

        setTextFilter(textRef.current.value);

        const allResearchTypes = researchTypeRef.current === null || researchTypeRef.current?.value === "all";
        setTypeFilter(allResearchTypes ? "" : researchTypeRef.current.value);

        const allThemes = themeRef.current === null || themeRef.current?.value === "all";
        setThemeFilter(allThemes ? "" : themeRef.current.value);

        let creationYear = 0;
        if (creationYearRef.current && creationYearRef.current.value !== "") {
            creationYear = parseInt(creationYearRef.current.value);
        }
        setCreationYearFilter(creationYear);
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
                                                    <ResearchTypesSearch researchTypes={researchTypes} ref={researchTypeRef} />
                                                    <ThemesSearch themes={themes} ref={themeRef} />
                                                    <CreationYearSearch ref={creationYearRef} />
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
