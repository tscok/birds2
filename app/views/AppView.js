import React, { PropTypes } from 'react';
import purebem from 'purebem';

import {
    Navigation
} from 'app/components';


const block = purebem.of('app-view');

const AppView = React.createClass({

    propTypes: {
        children: PropTypes.node
    },

    render() {
        return (
            <div className={ block() }>
                <Navigation { ...this.props } />
                <main className={ block('main') }>
                    { this.props.children }
                </main>
            </div>
        );
    }

});

export default AppView;
