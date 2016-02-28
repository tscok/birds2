import React, { PropTypes } from 'react';

import Navigation from 'app/components/Navigation';


const App = React.createClass({

    propTypes: {
        children: PropTypes.node
    },

    render() {
        return (
            <div>
                <Navigation { ...this.props } />
                { this.props.children }
            </div>
        );
    }

});

export default App;
