import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { capitalize } from 'js/utils';


const block = purebem.of('status');

const Status = React.createClass({

    propTypes: {
        status: PropTypes.string
    },

    getDefaultProps() {
        return {
            status: ''
        };
    },

    render() {
        const { status } = this.props;

        if (status === '') {
            return null;
        }

        return (
            <div className={ block({ status }) }>
                { capitalize(status) }
            </div>
        );
    }

});

export default Status;
