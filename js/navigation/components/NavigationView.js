import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';
import debounce from 'lodash.debounce';

import { isNullOrEmpty } from 'js/utils';

import attach from 'js/redux/components/attach';
import { initialize, logout, toggle } from 'js/redux/components/navigation/actions';

import NavigationMenu from './NavigationMenu';
import NavigationUser from './NavigationUser';
import { ClickOutside } from 'js/core/components';


const block = purebem.of('navigation-view');

const NavigationView = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propTypes: {
        auth: PropTypes.object.isRequired,
        root: PropTypes.string.isRequired,
        // ...
        expanded: PropTypes.any,
        onCollapse: PropTypes.func,
        onExpand: PropTypes.func,
        onLogout: PropTypes.func
    },

    componentDidMount() {
        window.addEventListener('resize', this.handleReset);
    },

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleReset);
    },

    handleReset() {
        if (this.props.expanded === null) {
            return;
        }
        this.props.onReset();
    },

    handleToggle() {
        this.props.onToggle(this.props.expanded);
    },

    render() {
        const { expanded } = this.props;
        const collapsed = expanded === false;

        return (
            <div className={ block({ expanded }) }>
                <div className={ block('burger') } onClick={ this.handleToggle } />
                <ClickOutside onClick={ () => expanded && this.handleToggle() }>
                    <div className={ block('content', { expanded, collapsed }) }>
                        <NavigationMenu
                            onLogout={ this.props.onLogout }
                            root={ this.props.root } />
                        <NavigationUser
                            onLogout={ this.props.onLogout }
                            root={ this.props.root }
                            user={ this.props.auth } />
                    </div>
                </ClickOutside>
            </div>
        );
    }

});

const mapStateToProps = (state, props) => {
    const component = state.components[props.root];
    return {
        expanded: component.expanded
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLogout: () => dispatch(logout()),
        onToggle: (expanded) => dispatch(toggle({
            root: props.root,
            path: 'expanded',
            expanded: !expanded
        })),
        onReset: () => dispatch(initialize())
    };
};

const NavigationViewContainer = connect(mapStateToProps, mapDispatchToProps)(NavigationView);

export default attach(NavigationViewContainer, { initialize, root: 'navigation' });
