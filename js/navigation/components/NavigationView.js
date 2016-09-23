import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';
import debounce from 'lodash.debounce';

import { isNullOrEmpty } from 'js/utils';

import attach from 'js/redux/components/attach';
import { initialize, toggle } from 'js/redux/components/navigation/actions';

import NavigationMenu from './NavigationMenu';
import NavigationUser from './NavigationUser';
import { ClickOutside } from 'js/core/components';


const block = purebem.of('navigation-view');

const NavigationView = React.createClass({

    propTypes: {
        expanded: PropTypes.any,
        onCollapse: PropTypes.func,
        onExpand: PropTypes.func,
        root: PropTypes.string,
        visible: PropTypes.bool
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
        if (!this.props.visible) {
            return (<div className={ block() } />);
        }

        const { expanded } = this.props;
        const collapsed = expanded === false;

        return (
            <div className={ block({ expanded }) }>
                <div className={ block('burger') } onClick={ this.handleToggle } />
                <ClickOutside onClick={ () => expanded && this.handleToggle() }>
                    <div className={ block('content', { expanded, collapsed }) }>
                        <NavigationMenu root={ this.props.root } />
                        <NavigationUser root={ this.props.root } />
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
        visible: !!state.user.auth && !isNullOrEmpty(state.user.auth.uid)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onToggle: (expanded) => dispatch(toggle({ expanded: !expanded })),
        onReset: () => dispatch(initialize())
    };
};

const NavigationViewContainer = connect(mapStateToProps, mapDispatchToProps)(NavigationView);

export default attach(NavigationViewContainer, { initialize, root: 'navigation' });
