import React, { forwardRef } from 'react';

const SearchForm = forwardRef(({setFilter}, searchRef) => {

    const setSearchFilter = (e) => {
        e.preventDefault();
        setFilter(searchRef.current.value);
    };

    return (
        <form className="search-bar" onSubmit={setSearchFilter}>
            <div className="form-group">
                <span className="search-label">Zoek</span>
            </div>
            <div className="form-group">
                <input className="form-control search-field" type="text" placeholder="Zoek op term" name="text" ref={searchRef} />
            </div>
            <div className="form-group">
                <button id="search-button" className="button-ovs" type="submit">Zoek</button>
            </div>
        </form>
    );
});

export default SearchForm;
