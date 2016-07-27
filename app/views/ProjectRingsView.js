import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { Button, FormGroup, InputField, ViewHeader } from 'app/components';


const block = purebem.of('project-rings-view');

const ProjectRingsView = React.createClass({

    propTypes: {

    },

    onInput() {

    },

    onSave() {

    },

    render() {
        return (
            <div className={ block() }>
                <ViewHeader title="Rings &amp; Serial Numbers" />
                <form className={ block('form') }>
                    <FormGroup label="Ring Size" type="inline">
                        <InputField onChange={ this.onInput } />
                    </FormGroup>
                    <FormGroup label="Serial Number" type="inline">
                        <InputField onChange={ this.onInput } />
                    </FormGroup>
                    <FormGroup label="&nbsp;" type="inline">
                        <Button style="success">Save</Button>
                    </FormGroup>
                </form>
            </div>
        );
    }
});

export default ProjectRingsView;
