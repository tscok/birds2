import React from 'react';
import purebem from 'purebem';
import promise from 'promise';
import moment from 'moment';

import filter from 'lodash.filter';
import uniqBy from 'lodash.uniqby';
import forEach from 'lodash.foreach';

import {
    delayAction,
    getStatus,
    isEmpty,
    sortByKey
} from 'app/utils';

import firebaseRef from 'app/firebaseRef';

import ContentBox from 'app/components/ContentBox';
import InputField from 'app/components/InputField';
import ViewHeader from 'app/components/ViewHeader';
import Table from 'app/components/Table';


const block = purebem.of('search-view');

const SearchView = React.createClass({

    getInitialState() {
        return {
            isLoading: false,
            loadTime: 0,
            needle: '',
            results: []
        };
    },

    componentWillMount() {
        this.projectsRef = firebaseRef.child('projects').orderByChild('isPublic').equalTo(true);
    },

    getMatch(sample) {
        const pattern = new RegExp(this.state.needle, 'i');
        return pattern.test(sample);
    },

    getList(snap) {
        let arr = [], obj = {};
        snap.forEach(child => {
            obj = child.val();
            obj.status = getStatus(obj.dateStart, obj.dateEnd);
            obj.id = child.key();

            if (this.getMatch(obj.title)) {
                arr.push(obj);
            }
            
            if (!!obj.sites) {
                forEach(obj.sites, site => {
                    if (this.getMatch(site.name)) {
                        arr.push(obj);
                    }
                });
            }
        });
        return arr;
    },

    handleSearch() {
        let results = [];

        if (isEmpty(this.state.needle)) {
            this.setState({ results, isLoading: false });
            return;
        }

        const a = moment();
        const projects = new promise((resolve, reject) => {
            this.projectsRef.once('value', (snap) => {
                resolve(this.getList(snap));
            });
        });

        projects.then(list => {
            const b = moment();
            const loadTime = b.diff(a, 'seconds', true);
            results = uniqBy(list, 'id');
            sortByKey(results, 'status');
            this.setState({ results, loadTime, isLoading: false });
        });
    },

    handleChange(evt) {
        const needle = evt.target.value;
        this.setState({ needle, isLoading: !isEmpty(needle) });
        delayAction(() => this.handleSearch());
    },

    renderResults() {
        const data = this.state.results;
        const headers = ['avatar', 'title', 'ownerName', 'status', 'join'];

        if (data.length === 0) {
            return null;
        }

        return (
            <ContentBox className={ block('results') }>
                <Table
                    data={ data }
                    headers={ headers } />
            </ContentBox>
        );
    },

    renderInfo() {
        const { isLoading, loadTime, needle, results } = this.state;
        const count = results.length;
        const wording = count !== 1 ? 'results' : 'result';
        

        if (isEmpty(needle) && !isLoading && !count || isLoading && !count) {
            return null;
        }

        return (
            <span>{ count } { wording } ({ loadTime } seconds).</span>
        );
    },

    render() {
        return (
            <div className={ block() }>
                <div className="container">
                    <ViewHeader title="Find &amp; Join">
                        <p>Here you can search for projects to join.</p>
                        <InputField
                            autoFocus={ true }
                            iconClass="icon-search"
                            iconClick={ this.handleSearch }
                            isLoading={ this.state.isLoading }
                            onChange={ this.handleChange }
                            placeholder="Project title, site name, etc."
                            value={ this.state.needle } />
                        <div className={ block('info') }>
                            { this.renderInfo() }
                        </div>
                    </ViewHeader>
                    { this.renderResults() }
                </div>
            </div>
        );
    }

});

export default SearchView;
