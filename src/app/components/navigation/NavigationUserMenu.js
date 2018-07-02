import React, { PropTypes } from 'react';
import purebem from 'purebem';

import NavigationAvatar from './NavigationAvatar';

import './NavigationUserMenu.less';


const block = purebem.of('navigation-user-menu');

const NavigationUserMenu = React.createClass({

    propTypes: {
        auth: PropTypes.object,
        onExpand: PropTypes.func,
        onLogout: PropTypes.func,
        onReset: PropTypes.func
    },

    renderAvatar() {
        const { auth } = this.props;
        return (
            <div className={ block('avatar') }>
                {/*<NavigationAvatar
                    photoUrl={ auth.photoUrl }
                    userName={ auth.name } />*/}
            </div>
        );
    },

    renderExpanded() {
        return (
            <div className={ block('expanded') }>[expanded]</div>
        );
    },

    render() {
        return (
            <div className={ block() }>
                { this.renderAvatar() }
                { this.renderExpanded() }
            </div>
        );
    }

});

export default NavigationUserMenu;
