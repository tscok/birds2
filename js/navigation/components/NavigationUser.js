import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { Avatar, Divider, NavLink } from 'js/core/components';


const block = purebem.of('navigation-user');

const NavigationUser = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propTypes: {
        root: PropTypes.string,
        // ...
        user: PropTypes.shape({
            email: PropTypes.string,
            name: PropTypes.string,
            photoUrl: PropTypes.string,
            uid: PropTypes.string
        })
    },

    render() {
        const { user } = this.props;

        return (
            <div className={ block() }>
                <Avatar
                    photoUrl={ user.photoUrl }
                    userName={ user.name || user.email } />
            </div>
        );
    }

});

const mapStateToProps = (state) => {
    return {
        user: state.user.auth
    };
};

export default connect(mapStateToProps)(NavigationUser);
