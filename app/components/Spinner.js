import React from 'react';


const Spinner = React.createClass({

    render() {
        return (
            <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
        );
    }

});

export default Spinner;
