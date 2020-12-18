import React from 'react';

const PageDisplayOptions = ({expanded, setExpanded}) => {

    const handleExpand = () => {
        setExpanded(expand => !expand);
    };

    return (
        <div className="display-options">
            <div id="expand-area">
                <label className="checkbox-inline">
                    <input id="js-expand-all" className="js-expand-all-evt" type="checkbox" checked={expanded} onChange={handleExpand} />
                    <span id="js-label-expand-all">Resultaten uitklappen</span>
                </label>
            </div>
        </div>
    );
};

export default PageDisplayOptions;
