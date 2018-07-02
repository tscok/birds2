import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { Attach } from 'src/core/components';

import NavigationMainMenu from './NavigationMainMenu';
import NavigationUserMenu from './NavigationUserMenu';

import { ClickOutside, ScreenResize } from 'src/core/components';

import { collapse, expand, initialize, logout, reset } from 'redux/components/navigation/actions';

import './NavigationView.less';


const block = purebem.of('navigation-view');

const NavigationView = React.createClass({

    propTypes: {
        auth: PropTypes.object,
        // hoc
        root: PropTypes.string,
        // redux
        expanded: PropTypes.shape({
            mainMenu: PropTypes.bool,
            userMenu: PropTypes.bool
        }),
        onCollapse: PropTypes.func,
        onExpand: PropTypes.func,
        onLogout: PropTypes.func,
        onReset: PropTypes.func
    },

    handleCollapse(path) {
        this.props.onCollapse({ path });
    },

    handleExpand(path) {
        this.props.onExpand({ path });
    },

    renderBurger() {
        return (
            <div className={ block('burger') } onClick={ () => this.handleExpand('mainMenu') } />
        );
    },

    renderMainMenu() {
        const expanded = this.props.expanded.mainMenu;

        return (
            <ClickOutside onClick={ () => expanded && this.handleCollapse('mainMenu') }>
                <div className={ block('content', { expanded, collapsed: !expanded }) }>
                    <NavigationMainMenu
                        onLogout={ this.props.onLogout }
                        onReset={ this.props.onReset } />
                </div>
            </ClickOutside>
        );
    },

    renderUserMenu() {
        const expanded = this.props.expanded.userMenu;

        return (
            <ClickOutside onClick={ () => expanded && this.handleCollapse('userMenu') }>
                <div className={ block('content', { expanded, collapsed: !expanded }) }>
                    <NavigationUserMenu
                        auth={ this.props.auth }
                        onExpand={ this.handleExpand }
                        onLogout={ this.props.onLogout }
                        onReset={ this.props.onReset } />
                </div>
            </ClickOutside>
        );
    },

    render() {
        const { expanded } = this.props;

        return (
            <ScreenResize onResize={ this.props.onCollapse }>
                <div className={ block() }>
                    { this.renderMainMenu() }
                    { this.renderUserMenu() }
                    { this.renderBurger() }
                </div>
            </ScreenResize>
        );
    }

});

const mapStateToProps = (state, props) => {
    const component = state.components[props.root];
    return {
        expanded: {
            mainMenu: component.mainMenu.expanded,
            userMenu: component.userMenu.expanded
        }
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onCollapse: ({ path }) => dispatch(collapse({ path, root: props.root })),
        onExpand: ({ path }) => dispatch(expand({ path, root: props.root })),
        onLogout: () => dispatch(logout()),
        onReset: () => dispatch(reset())
    };
};

const NavigationViewContainer = connect(mapStateToProps, mapDispatchToProps)(NavigationView);

export default Attach(NavigationViewContainer, { initialize, root: 'navigation' });
