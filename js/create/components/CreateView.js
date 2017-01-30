import React from 'react';
import purebem from 'purebem';

import CreateForm from './CreateForm';

import { Attach } from 'js/core/components';

import { initialize } from 'js/redux/components/create/actions';


const block = purebem.of('create-view');

const CreateView = React.createClass({

    render() {
        return (
            <div className={ block() }>
                <h1>CreateView</h1>
                <CreateForm root="create" />
            </div>
        );
    }

});

export default Attach(CreateView, { initialize, root: 'create' });
