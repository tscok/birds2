import React, { PropTypes } from 'react';
import purebem from 'purebem';

import {
    Tab,
    Tabs
} from 'src/core/components';

import EntryForm from './EntryForm';


const block = purebem.of('project-entry');

const EntryView = React.createClass({

    propTypes: {
        root: PropTypes.string
    },

    renderTabs() {
        return (
            <Tabs
                path="entry.tabs"
                root={ this.props.root }>
                <Tab name="new">New Ring</Tab>
                <Tab name="old">Control</Tab>
            </Tabs>
        );
    },

    render() {
        return (
            <div className={ block() }>
                <h1>EntryView</h1>
                { this.renderTabs() }
                <EntryForm
                    path="entry"
                    root={ this.props.root } />
            </div>
        );
    }

});

export default EntryView;
