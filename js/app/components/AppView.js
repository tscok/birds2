import React, { PropTypes } from 'react';
import purebem from 'purebem';

import AppAuth from './AppAuth';
import { NavigationView } from 'js/navigation/components';


const block = purebem.of('app-view');

const AppView = React.createClass({

    propTypes: {
        children: PropTypes.node,
        location: PropTypes.object
    },

    render() {
        return (
            <AppAuth pathname={ this.props.location.pathname }>
                <div className={ block() }>
                    <NavigationView />
                    <main className={ block('main') }>
                        { this.props.children }
                    </main>
                </div>
            </AppAuth>
        );
    }

});

export default AppView;
