import React, { useRef, useState } from 'react';

import CreationYearSearch from './advanced/CreationYearSearch'
import DocumentTypesSearch from './advanced/DocumentTypesSearch';
import TextSearch from './TextSearch';
import ThemesSearch from './advanced/ThemesSearch';

const Search = ({themes, wooThemes, documentTypes, setTextFilter, setTypeFilter, setThemeFilter, setCreationYearFilter}) => {
    const textRef = useRef(null);
    const documentTypeRef = useRef(null);
    const themeRef = useRef(null);
    const creationYearRef = useRef(null);
    const [activeTab, setActiveTab] = useState("search");
    const typeApp = process.env.REACT_APP_TYPE_APP;
    
    const searchResults = (e) => {
        e.preventDefault();

        setTextFilter(textRef.current.value);

        const allDocumentTypes = documentTypeRef.current === null || documentTypeRef.current?.value === "all";
        setTypeFilter(allDocumentTypes ? "" : documentTypeRef.current.value);

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
                                                    {typeApp === "ob" && <DocumentTypesSearch documentTypes={documentTypes} ref={documentTypeRef} />}
                                                    <ThemesSearch typeApp={typeApp} themes={themes} wooThemes={wooThemes} ref={themeRef} />
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
