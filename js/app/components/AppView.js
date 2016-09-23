import React, { PropTypes } from 'react';
import purebem from 'purebem';

import auth from 'js/redux/user/auth';
import { NavigationView } from 'js/navigation/components';


const block = purebem.of('app-view');

const AppView = React.createClass({

    propTypes: {
        children: PropTypes.node
    },

    render() {
        return (
            <div className={ block() }>
                <header className={ block('header') }>
                    <NavigationView />
                </header>
                <main className={ block('main') }>
                    { this.props.children }
                </main>
            </div>
        );
    }

});

export default auth(AppView);
