import React from 'react';
import { Link } from 'react-router-dom';

const Tab = ({hrefPath, isActive, name, title, setActiveTab}) => (
    <Link to={hrefPath} onClick={() => {setActiveTab(name)}}>
        <div id="js-element-index" className="task-element">
            <div className="task-outer">
                <div className={isActive ? "task-inner-active" : "task-inner"}>
                    <div id={`${name}-icon`} className="tab-element" style={{backgroundImage: `url(/${name}.png)`}}>
                        <span className="task-title">{title}</span>
                    </div>
                </div>
            </div>
        </div>
    </Link>
);

export default Tab;
