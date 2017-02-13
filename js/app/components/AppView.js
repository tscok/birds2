import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { isNullOrEmpty } from 'js/utils';

import { Auth } from 'js/core/components';
import { NavigationView } from 'js/navigation/components';


const block = purebem.of('app-view');

const AppView = React.createClass({

    propTypes: {
        auth: PropTypes.object,
        children: PropTypes.node
    },

    renderNavigation(auth, location) {
        if (isNullOrEmpty(auth.uid)) {
            return null;
        }

        return (
            <NavigationView
                auth={ auth }
                location={ location } />
        );
    },

    render() {
        const { auth, children } = this.props;
        const childrenWithProps = React.Children.map(children, (child) => React.cloneElement(child, { auth }));

        return (
            <div className={ block() }>
                <header className={ block('header') }>
                    { this.renderNavigation(auth, children.props.location) }
                </header>
                <main className={ block('main') }>
                    { childrenWithProps }
                </main>
            </div>
        );
    }

});

export default Auth(AppView);
