import React, { PropTypes } from 'react';

import { Button } from 'js/core/components';


const SearchResultButton = React.createClass({

    propTypes: {
        id: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        root: PropTypes.string.isRequired
    },

    render() {
        return (
            <Button text="Join" />
        );
    }

});

export default SearchResultButton;
