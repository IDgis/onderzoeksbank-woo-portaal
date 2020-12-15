import React, { useEffect, useState } from 'react';

const Header = ({activeTab}) => {
    const [headerText, setHeaderText] = useState("404: Not Found");

    useEffect(() => {
        if (activeTab === "home") {
            setHeaderText("Welkom bij de Onderzoeksbank Overijssel");
        } else if (activeTab === "search") {
            setHeaderText("Uitgebreid zoeken");
        } else if (activeTab === "browse") {
            setHeaderText("Bladeren");
        } else if (activeTab === "about") {
            setHeaderText("Over deze site");
        } else if (activeTab === "contact") {
            setHeaderText("Contact");
        } else if (activeTab === "report") {
            setHeaderText("Beschrijving Onderzoeksbank Rapport");
        } else {
            setHeaderText("404: Not Found");
        }
    }, [activeTab]);

    return (
        <div className="header">
            <h1 className="header">{ headerText }</h1>
        </div>
    );
};

export default Header;
