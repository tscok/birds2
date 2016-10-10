import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';
import filter from 'lodash.filter';

import { ref } from 'js/firebase';
import { debouncer, isNullOrEmpty } from 'js/utils';

import { TextboxContainer } from 'js/core/components';

import { loading, update } from 'js/redux/components/search/actions';


const block = purebem.of('search-form');

const SearchForm = React.createClass({

    propTypes: {
        path: PropTypes.string,
        root: PropTypes.string,
        uid: PropTypes.string,
        // redux
        keyword: PropTypes.string,
        onMatch: PropTypes.func
    },

    componentDidMount() {
        this.publicRef = ref('projects').orderByChild('type').equalTo('Public');
    },

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        
        if (!isNullOrEmpty(nextProps.keyword.trim())) {
            console.log('has keyword');
            this.props.onSearch();
            debouncer(this.handleSearch);
        } else {
            console.log('no keyword');
            this.props.onMatch([]);
        }

        // if (!hasKeyword && nextProps.result.length) {
        //     console.log('!hasKeyword && result');
        //     this.props.onMatch([]);
        // }
    },

    isMatch(str) {
        const pattern = new RegExp(`${this.props.keyword}`, 'i');
        return isNullOrEmpty(str) ? false : pattern.test(str);
    },

    isOwner(project) {
        return project.ownerId === this.props.uid;
    },

    handleSearch() {
        console.log('handleSearch');
        this.publicRef.once('value').then(this.handleSnap);
    },

    handleSnap(snap) {
        const projects = snap.val();

        const matches = filter(projects, (project) => {
            const match = this.isMatch(project.owner) || this.isMatch(project.title);
            return match && !this.isOwner(project);
        });

        this.props.onMatch(matches);
    },

    render() {
        return (
            <div className={ block() }>
                <p className={ block('body') }>Search for projects by title or name of project owner. Any projects you own will be omitted from results.<br />Clicking the Join button will notify the project's owner of your request. You may Cancel pending requests at any time.</p>
                <TextboxContainer
                    path={ this.props.path }
                    placeholder="Project title or name of owner…"
                    root={ this.props.root }
                    stretched={ true } />
            </div>
        );
    }

});

const mapStateToProps = (state, props) => {
    const component = state.components[props.root];
    return {
        keyword: component.keyword.value
        // result: component.result
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMatch: (result) => dispatch(update({ result })),
        onSearch: () => dispatch(loading())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
