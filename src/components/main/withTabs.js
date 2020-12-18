import React from 'react';

import Tab from './Tab';

const withTabs = (OriginalComponent) => {
    class WrappedComponent extends React.Component {
        render() {
            const { activeTab, setActiveTab } = this.props;
            return (
                <div>
                    <div className="tabs">
                        <Tab hrefPath="/" isActive={activeTab === "home"} name="home" title="Home" setActiveTab={setActiveTab} />
                        <Tab hrefPath="/search" isActive={activeTab === "search"} name="search" title="Uitgebreid zoeken" setActiveTab={setActiveTab} />
                        <Tab hrefPath="/about" isActive={activeTab === "about"} name="about" title="Over deze site" setActiveTab={setActiveTab} />
                        <Tab hrefPath="/contact" isActive={activeTab === "contact"} name="contact" title="Contact" setActiveTab={setActiveTab} />
                    </div>
                    <OriginalComponent activeTab={activeTab} setActiveTab={setActiveTab} {...this.props} />
                </div>
            );
        }
    }

    return WrappedComponent;
};

export default withTabs;
