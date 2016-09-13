import React, { PropTypes } from 'react';
import purebem from 'purebem';

import attach from 'app/redux/components/attach';
import { initialize } from 'app/redux/components/menu/actions';


const block = purebem.of('menu-view');

const MenuView = React.createClass({

    render() {
        return (
            <header className={ block() }>[menu]</header>
        );
    }

});

export default attach(MenuView, { initialize, root: 'menu' });
