import React, { PropTypes } from 'react';

import { Button } from 'js/core/components';


const SearchResultButton = React.createClass({

    propTypes: {
        id: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        root: PropTypes.string.isRequired
    },

    handleClick() {
        // ...
    },

    render() {
        return (
            <Button
                onClick={ this.handleClick }
                stretched={ true }
                text="Join" />
        );
    }

});

export default SearchResultButton;
