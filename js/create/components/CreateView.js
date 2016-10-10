import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('create-view');

const CreateView = React.createClass({

    render() {
        return (
            <div className={ block() }>
                <h1>CreateView</h1>
            </div>
        );
    }

});

export default CreateView;
