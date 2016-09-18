import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';


const block = purebem.of('navigation-user');

const NavigationUser = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propTypes: {
        visible: PropTypes.bool
    },

    render() {
        if (!this.props.visible) {
            return null;
        }

        return (
            <nav>[user navigation]</nav>
        );
    }

});

const mapStateToProps = (state) => {
    return {
        visible: state.user && state.user.uid !== ''
    };
};

export default connect(mapStateToProps)(NavigationUser);
