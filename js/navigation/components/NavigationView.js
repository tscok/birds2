import React, { PropTypes } from 'react';
import purebem from 'purebem';

import attach from 'js/redux/components/attach';
import { initialize } from 'js/redux/components/navigation/actions';

import NavigationMain from './NavigationMain';
import NavigationUser from './NavigationUser';


const block = purebem.of('navigation-view');

const NavigationView = React.createClass({

    propTypes: {
        root: PropTypes.string
    },

    render() {
        return (
            <header className={ block() }>
                <div className={ block('content') }>
                    <NavigationMain />
                    <NavigationUser root={ this.props.root } />
                </div>
            </header>
        );
    }

});

export default attach(NavigationView, { initialize, root: 'navigation' });
