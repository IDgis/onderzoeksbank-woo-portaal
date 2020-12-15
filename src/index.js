import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Contact from './components/contact/Contact';
import Header from './components/main/Header';
import Home from './components/home/Home';
import NotFound from './components/main/NotFound';
import Report from './components/report/Report';

import './index.css';

const Main = () => {

    const [activeTab, setActiveTab] = useState(window.location.href.split("/")[3] === "" ? "home" : window.location.href.split("/")[3]);

    return (
        <div className="page">
            <div className="logo">
                <a><img src="/logo_overijssel.png" alt="logo"></img></a>
            </div>
            <Header activeTab={activeTab} />
            <div className="grid">
                <Switch>
                    <Route path="/" exact component={ (props) => <Home activeTab={activeTab} setActiveTab={setActiveTab} {...props} /> } />
                    <Route path="/contact" exact component={ (props) => <Contact activeTab={activeTab} setActiveTab={setActiveTab} {...props} /> } />
                    <Route path="/report/:reportUUID" exact component={ (props) => <Report activeTab={activeTab} {...props} /> } />
                    <Route path="/404" exact component={ (props) => <NotFound activeTab={activeTab} setActiveTab={setActiveTab} {...props} /> } />
                    <Route component={ (props) => <NotFound activeTab={activeTab} setActiveTab={setActiveTab} {...props} /> } />
                </Switch>
            </div>
        </div>
    );
};

ReactDOM.render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>, document.getElementById('root')
);
