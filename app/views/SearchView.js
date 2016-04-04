import React from 'react';
import purebem from 'purebem';

import { delayAction } from 'app/utils';

import firebaseRef from 'app/firebaseRef';

import ContentBox from 'app/components/ContentBox';
import InputField from 'app/components/InputField';


const block = purebem.of('search-view');

const SearchView = React.createClass({

    getInitialState() {
        return {
            needle: '',
            results: []
        };
    },

    componentWillMount() {
        this.projectsRef = firebaseRef.child('projects').orderByChild('public').equalTo(true);
        this.sitesRef = firebaseRef.child('sites');
    },

    handleSearch() {
        // this.projectsRef.child('title')
    },

    handleChange(evt) {
        const needle = evt.target.value;
        this.setState({ needle });

        delayAction(() => {
            this.handleSearch()
        });
    },

    renderResults() {
        if (!this.state.results.length) {
            return null;
        }

        return (
            <div className="container">
                <ContentBox title="Results">
                    [results]
                </ContentBox>
            </div>
        );
    },

    render() {
        return (
            <div className={ block() }>
                <div className={ block('intro') }>
                    <div className={ block('title') }>Find &amp; Join</div>
                    <div className={ block('body') }>
                        <p>Here you can search for existing projects to join.</p>
                        <InputField
                            autoFocus={ true }
                            iconClass="icon-search"
                            iconClick={ this.handleSearch }
                            onChange={ this.handleChange }
                            value={ this.state.needle } />
                    </div>
                </div>
                { this.renderResults() }
            </div>
        );
    }

});

export default SearchView;
