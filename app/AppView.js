import React, { PropTypes } from 'react';
import purebem from 'purebem';

import AppInit from './AppInit';
import { MenuView } from './menu/components';


const block = purebem.of('app-view');

const AppView = React.createClass({

    propTypes: {
        children: PropTypes.node,
        location: PropTypes.object,
    },

    render() {
        return (
            <AppInit pathname={ this.props.location.pathname }>
                <div className={ block() }>
                    <MenuView />
                    <main className={ block('main') }>
                        { this.props.children }
                    </main>
                </div>
            </AppInit>
        );
    }

});

export default AppView;
