import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { getComponent } from 'src/redux/utils';


const block = purebem.of('tabs');

const Tab = React.createClass({

    propTypes: {
        name: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        path: PropTypes.string.isRequired,
        root: PropTypes.string.isRequired,
        // redux
        active: PropTypes.bool.isRequired,
        // ---
        children: PropTypes.any
    },

    handleClick() {
        this.props.onClick({ name: this.props.name });
    },

    render() {
        const { active, onClick } = this.props;
        return (
            <div className={ block('tab', { active }) } onClick={ this.handleClick }>
                { this.props.children }
            </div>
        );
    }
});

const mapStateToProps = (state, props) => {
    const component = getComponent(state.components, props);
    return {
        active: component[props.name].active
    };
};

export default connect(mapStateToProps)(Tab);
