import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';


const SiteView = React.createClass({
    render() {
        return (
            <div>
                <h1>Site</h1>
                <Link to="/app">Try it out!</Link>
            </div>
        );
    }
});

export default SiteView;
