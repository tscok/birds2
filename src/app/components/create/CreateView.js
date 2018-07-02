import React, { PropTypes } from 'react';
import purebem from 'purebem';

import CreateForm from './CreateForm';

import { Attach } from 'src/core/components';

import { initialize } from 'src/redux/components/create/actions';


const block = purebem.of('create-view');

const CreateView = React.createClass({

    propTypes: {
        root: PropTypes.string
    },

    render() {
        return (
            <div className={ block() }>
                <h1>CreateView</h1>
                <CreateForm root={ this.props.root } />
            </div>
        );
    }

});

export default Attach(CreateView, { initialize, root: 'create' });
