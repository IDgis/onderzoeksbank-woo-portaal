import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({activeTab, setActiveTab}) => (
    <div id="header">
        <div className="label">Provincie Overijssel</div>
        <div className="overlay"></div>
        <div className="afbeeldingen">
            <img src="/clouds.png" alt="Onderzoeksbank Provincie Overijssel" title="Onderzoeksbank Provincie Overijssel"/>
        </div>
        <div className="titelbalk">Onderzoeksbank Overijssel</div>
        <div className="navigatie">
            <ul>
                <li className={activeTab === "home" ? "active" : ""}>
                    <Link className="hoeken_3_boven" to="/" onClick={() => setActiveTab("home")}>Home</Link>
                </li>
                <li className={activeTab === "onderzoeken" ? "active" : ""}>
                    <Link className="hoeken_3_boven" to="/onderzoeksbank" onClick={() => setActiveTab("onderzoeken")}>Onderzoeken</Link>
                </li>
                <li className={activeTab === "contact" ? "active" : ""}>
                    <Link className="hoeken_3_boven" to="/contact" onClick={() => setActiveTab("contact")}>Contact</Link>
                </li>
            </ul>
        </div>
    </div>
);

export default Header;
