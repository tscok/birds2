import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { isNullOrEmpty } from 'js/utils';

import { Attach } from 'js/core/components';
import { initialize, logout, reset, toggle } from 'js/redux/components/navigation/actions';

import links from 'js/navigation/links';

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

    getDefaultProps() {
        return {
            project: {}
        };
    },

    componentDidMount() {
        window.addEventListener('resize', this.handleReset);
    },

    componentWillUnmount() {
        this.props.onReset();
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
        const { expanded, project } = this.props;
        const collapsed = expanded === false;

        return (
            <div className={ block({ expanded }) }>
                <div className={ block('burger') } onClick={ this.handleToggle } />
                <ClickOutside onClick={ () => expanded && this.handleToggle() }>
                    <div className={ block('content', { expanded, collapsed }) }>
                        <NavigationMenu
                            links={ links(project.id) }
                            onLogout={ this.props.onLogout }
                            onReset={ this.props.onReset }
                            root={ this.props.root } />
                        <NavigationUser
                            links={ links() }
                            onLogout={ this.props.onLogout }
                            onReset={ this.props.onReset }
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
        expanded: component.expanded,
        project: state.components.project
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLogout: () => {
            console.log('dispatch logout');
            dispatch(logout());
        },
        onReset: () => dispatch(reset()),
        onToggle: (expanded) => dispatch(toggle({
            root: props.root,
            path: 'expanded',
            expanded: !expanded
        }))
    };
};

const NavigationViewContainer = connect(mapStateToProps, mapDispatchToProps)(NavigationView);

export default Attach(NavigationViewContainer, { initialize, root: 'navigation' });
