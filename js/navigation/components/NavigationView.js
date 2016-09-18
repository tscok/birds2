import React, { PropTypes } from 'react';
import purebem from 'purebem';

import attach from 'js/redux/components/attach';
import { initialize } from 'js/redux/components/navigation/actions';

import NavigationMain from './NavigationMain';
import NavigationUser from './NavigationUser';


const block = purebem.of('navigation-view');

const NavigationView = React.createClass({

    render() {
        return (
            <header className={ block() }>
                <NavigationMain />
                <NavigationUser />
            </header>
        );
    }

});

export default attach(NavigationView, { initialize, root: 'navigation' });
