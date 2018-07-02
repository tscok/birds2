import React, { PropTypes } from 'react';
import purebem from 'purebem';

import './Spinner.less';


const block = purebem.of('spinner');

const Spinner = React.createClass({

    propTypes: {
        color: PropTypes.string,
        show: PropTypes.bool,
        type: PropTypes.oneOf([
            'linear',
            'circle'
        ])
    },

    getDefaultProps() {
        return {
            color: null,
            show: true,
            type: 'linear'
        };
    },

    renderCircle() {
        const { color } = this.props;
            {/*
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
            */}
        let children = [];
        for (let i = 1; i <= 12; i++) {
            const child = (<div key={ i } className={ block('child', { i }) }></div>);
            children = [ ...children, child ];
        }

        return (
            <div className={ block(['circle'], { color }) }>
                { children }
            </div>
        );
    },

    renderLinear() {
        const { color } = this.props;
        return (
            <div className={ block(['linear'], { color }) }>
                <div className={ block('child', [1]) }></div>
                <div className={ block('child', [2]) }></div>
                <div className={ block('child', [3]) }></div>
            </div>
        );
    },

    render() {
        if (!this.props.show) {
            return null;
        }

        return this.props.type === 'linear'
            ? this.renderLinear()
            : this.renderCircle();
    }

});

export default Spinner;
