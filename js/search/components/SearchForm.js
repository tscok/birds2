import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';
import filter from 'lodash.filter';

import { ref } from 'js/firebase';
import { debouncer, isNullOrEmpty } from 'js/utils';

import { TextboxContainer } from 'js/core/components';

import { reset, search, update } from 'js/redux/components/search/actions';


const block = purebem.of('search-form');

const SearchForm = React.createClass({

    propTypes: {
        path: PropTypes.string,
        root: PropTypes.string,
        uid: PropTypes.string,
        // redux
        keyword: PropTypes.string,
        onSearch: PropTypes.func,
        onReset: PropTypes.func,
        onResult: PropTypes.func,
        searching: PropTypes.bool
    },

    componentDidMount() {
        this.publicRef = ref('projects').orderByChild('type').equalTo('Public');
    },

    componentWillUpdate(nextProps) {
        if (nextProps.searching) {
            debouncer(() => this.publicRef.once('value').then(this.handleSnap))
        }
    },

    componentWillUnmount() {
        this.props.onReset();
    },

    isMatch(str) {
        const { keyword } = this.props;
        const pattern = new RegExp(`${keyword}`, 'i');

        if (isNullOrEmpty(str) || isNullOrEmpty(keyword)) {
            return false;
        }
        
        return pattern.test(str);
    },

    isOwnProject(ownerId) {
        return ownerId === this.props.uid;
    },

    handleSearch(value) {
        if (isNullOrEmpty(value.trim())) {
            this.props.onReset();
            return;
        }
        this.props.onSearch();
    },

    handleSnap(snap) {
        const projects = snap.val();

        const matches = filter(projects, (project) => {
            const match = this.isMatch(project.owner) || this.isMatch(project.title);
            return match && !this.isOwnProject(project.ownerId);
        });

        this.props.onResult(matches);
    },

    render() {
        return (
            <div className={ block() }>
                <TextboxContainer
                    large={ true }
                    loading={ this.props.searching }
                    onChangeCallback={ this.handleSearch }
                    path={ this.props.path }
                    placeholder="Project title or owner's name…"
                    root={ this.props.root }
                    stretched={ true } />
            </div>
        );
    }

});

const mapStateToProps = (state, props) => {
    const component = state.components[props.root];
    console.log('search-form component', component);
    return {
        keyword: component.keyword.value,
        searching: component.searching
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearch: () => dispatch(search({ searching: true })),
        onReset: () => dispatch(reset()),
        onResult: (result) => dispatch(update({ result }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
