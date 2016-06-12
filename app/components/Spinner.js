import React, { PropTypes } from 'react';
import purebem from 'purebem';


const Spinner = React.createClass({

    propTypes: {
        color: PropTypes.string,
        show: PropTypes.bool,
        type: PropTypes.oneOf(['linear', 'circle'])
    },

    getDefaultProps() {
        return {
            color: null,
            show: true,
            type: 'linear'
        };
    },

    renderCircle() {
        const block = purebem.of('sk-circle');
        const { color } = this.props;
        return (
            <div className={ block({ color }) }>
                <div className="sk-circle1 sk-child"></div>
                <div className="sk-circle2 sk-child"></div>
                <div className="sk-circle3 sk-child"></div>
                <div className="sk-circle4 sk-child"></div>
                <div className="sk-circle5 sk-child"></div>
                <div className="sk-circle6 sk-child"></div>
                <div className="sk-circle7 sk-child"></div>
                <div className="sk-circle8 sk-child"></div>
                <div className="sk-circle9 sk-child"></div>
                <div className="sk-circle10 sk-child"></div>
                <div className="sk-circle11 sk-child"></div>
                <div className="sk-circle12 sk-child"></div>
            </div>
        );
    },

    renderLinear() {
        const block = purebem.of('spinner');
        const { color } = this.props;
        return (
            <div className={ block({ color }) }>
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
        );
    },

    render() {
        const { show, type } = this.props;

        if (!show) {
            return null;
        }

        return type === 'linear' ? this.renderLinear() : this.renderCircle();
    }

});

export default Spinner;
