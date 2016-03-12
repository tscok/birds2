import React, { PropTypes } from 'react';
import purebem from 'purebem';

import ContentBox from 'app/components/ContentBox';


const block = purebem.of('greeting');

const Greeting = React.createClass({

    propTypes: {
        user: PropTypes.object.isRequired,
        onSubmit: PropTypes.func.isRequired
    },

    onSubmit(evt) {
        evt.preventDefault();
        const name = this.name.value;
        if (name === '' || name.trim() === '') {
            return;
        }
        this.props.onSubmit(name);
    },

    renderForm() {
        return (
            <form className={ block('form') } onSubmit={ this.onSubmit }>
                <input type="text" placeholder="Enter name here…" ref={ (ref) => this.name = ref } />
                <button className="button-primary">Save</button>
            </form>
        );
    },

    render() {
        const { email, name } = this.props.user;

        return (
            <div className={ block() }>
                <ContentBox>
                    <h3 className={ block('title') }>Welcome<br />{ email }</h3>
                    <p className={ block('body') }>Your email is currently your username.<br />To change this, add your name or a nickname.</p>
                    { this.renderForm() }
                </ContentBox>
            </div>
        );
    }

});

export default Greeting;