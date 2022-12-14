import React from 'react';

const SearchBox = (props) => {
    return (
        <>
            <input 
                className="form-control mr-sm-2 mb-3"
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="search"
                value={props.search}
                onChange={props.handleSearch}
                autoComplete="off"
            />
        </>
    )
}

export default SearchBox;