import React from 'react';

const Loader = ({ isLoading }) => {
    return isLoading ? (
        <>
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    {/* <span className="sr-only">Loading...</span> */}
                </div>
            </div>
        </>
    ) : (
        null
    )
}

export default Loader;