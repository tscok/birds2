import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { isNullOrEmpty } from 'js/utils';

import auth from 'js/redux/user/auth';
import { NavigationView } from 'js/navigation/components';


const block = purebem.of('app-view');

const AppView = React.createClass({

    propTypes: {
        auth: PropTypes.object,
        children: PropTypes.node
    },

    isUser() {
        return !isNullOrEmpty(this.props.auth.uid);
    },

    renderNavigation() {
        if (!this.isUser()) {
            return null;
        }

        return (<NavigationView user={ this.props.auth } />);
    },

    render() {
        const childrenWithProps = React.Children.map(this.props.children, 
            (child) => React.cloneElement(child, { user: this.props.auth })
        );

        return (
            <div className={ block() }>
                <header className={ block('header') }>
                    { this.renderNavigation() }
                </header>
                <main className={ block('main') }>
                    { childrenWithProps }
                </main>
            </div>
        );
    }

});

export default auth(AppView);
