import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { isNullOrEmpty } from 'js/utils';

import auth from 'js/redux/user/auth';
import { NavigationView } from 'js/navigation/components';


const block = purebem.of('app-view');

const AppView = React.createClass({

    propTypes: {
        auth: PropTypes.object,
        children: PropTypes.node,
        location: PropTypes.object
    },

    isUser() {
        return !isNullOrEmpty(this.props.auth.uid);
    },

    renderNavigation(props) {
        if (!this.isUser()) {
            return null;
        }

        return (
            <NavigationView { ...props } />
        );
    },

    render() {
        const { children, ...rest } = this.props;
        const childrenWithProps = React.Children.map(children, (child) => React.cloneElement(child, { ...rest }));

        return (
            <div className={ block() }>
                <header className={ block('header') }>
                    { this.renderNavigation({ ...rest }) }
                </header>
                <main className={ purebem.many(block('main'), 'container') }>
                    { childrenWithProps }
                </main>
            </div>
        );
    }

});

export default auth(AppView);
