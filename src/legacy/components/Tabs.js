import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('tabs');

const Tabs = React.createClass({

    propTypes: {
        activeTab: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        tabs: PropTypes.array.isRequired
    },

    renderTab(tab, index) {
        const active = this.props.activeTab === tab;
        return (
            <div key={ index } className={ block('tab', { active }) } onClick={ () => this.props.onClick(tab) }>{ tab }</div>
        );
    },

    render() {
        return (
            <div className={ block() }>
                {
                    [].map.call(this.props.tabs, this.renderTab)
                }
            </div>
        );
    }

});

export default Tabs;
