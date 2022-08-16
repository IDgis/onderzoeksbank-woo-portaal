import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <div id="footer" className="content_footer">
        <div className="copyright">
            <Link to="/">Onderzoeksbank Provincie Overijssel</Link>
        </div>
        <div className="menu">
            <ul>
                <li className="">
                    <a className="hoeken_3_boven" href="https://www.overijssel.nl/algemene-onderdelen/proclaimer" target="_blank">Proclaimer</a>
                </li>
            </ul>
        </div>
    </div>
);

export default Footer;
