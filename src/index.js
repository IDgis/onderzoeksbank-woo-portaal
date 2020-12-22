import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';

import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import Header from './components/main/Header';
import Home from './components/home/Home';
import NotFound from './components/main/NotFound';

import './index.css';

const Main = () => {

    const [activeTab, setActiveTab] = useState("");

    const location = useLocation();
    useEffect(() => {
        const { pathname } = location;

        if (pathname.split("/")[1] === "") {
            setActiveTab("home");
        } else if (pathname.split("/")[1] === "onderzoeksbank") {
            setActiveTab("onderzoeksbank");
        } else if (pathname.split("/")[1] === "contact") {
            setActiveTab("contact")
        } else {
            setActiveTab("");
        }
    }, []);

    return (
        <div className={`body-normal ${process.env.REACT_APP_DEPLOYMENT_ACCEPTANCE ? 'body-acceptance' : ''}`}>
            <div id="wrapper">
                <Header activeTab={activeTab} setActiveTab={setActiveTab} />
                <Switch>
                    <Route path="/" exact>
                        <Home setActiveTab={setActiveTab} />
                    </Route>
                    <Route path="/404">
                        <NotFound setActiveTab={setActiveTab} />
                    </Route>
                    <Route>
                        <NotFound setActiveTab={setActiveTab} />
                    </Route>
                </Switch>
                <Footer />
            </div>
        </div>
    );
};

ReactDOM.render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>, document.getElementById('root')
);
