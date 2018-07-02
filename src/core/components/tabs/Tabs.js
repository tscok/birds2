import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { tab } from 'src/redux/core/actions';


const block = purebem.of('tabs');

const Tabs = React.createClass({

    propTypes: {
        onClick: PropTypes.func.isRequired,
        path: PropTypes.string.isRequired,
        root: PropTypes.string.isRequired,
        // ---
        children: PropTypes.node
    },

    render() {
        const { children, ...rest } = this.props;
        const childrenWithProps = React.Children
            .map(children, (child) => React.cloneElement(child, { ...rest }));

        return (
            <div className={ block() }>
                { childrenWithProps }
            </div>
        );
    }

});

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onClick: ({ name }) => dispatch(tab({
            active: true,
            name,
            path: props.path,
            root: props.root
        }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
