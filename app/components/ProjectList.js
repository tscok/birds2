import React, { PropTypes } from 'react';
import purebem from 'purebem';
import moment from 'moment';

import ContentBox from 'app/components/ContentBox';
import NavLink from 'app/components/NavLink';
import Spinner from 'app/components/Spinner';


const block = purebem.of('project-list');

const ProjectList = React.createClass({

    propTypes: {
        projects: PropTypes.array.isRequired,
        isLoading: PropTypes.bool.isRequired
    },

    contextTypes: {
        router: PropTypes.object
    },

    handleClick(id) {
        this.context.router.push(`project/${id}`);
    },

    getColor(luckyNumber) {
        return {
            backgroundColor: `hsl(${luckyNumber}, 85%, 65%)`
        };
    },

    getStatus(start, end) {
        const now = moment().format('YYYYMMDD');
        return now > start ? ( now < end ? 'Ongoing' : 'Finished' ) : 'Pending';
    },

    renderEmpty() {
        if (this.props.projects.length) {
            return null;
        }

        return (
            <div className={ block('empty') }>
                <p>You are not in any projects yet.<br />You can either <NavLink to="/create">Create</NavLink> one or <NavLink to="/search">Search</NavLink> for projects to join.</p>
            </div>
        );
    },

    renderProject(project, index) {
        let { projectId, title, start, end, sites, luckyNumber } = project;

        const first = index === 0;
        const last = this.props.projects.length - 1 === index;
        const status = this.getStatus(start, end);

        return (
            <div key={ index } className={ block('row', { first, last }) } onClick={ () => this.handleClick(projectId) }>
                <div className={ block('col', ['avatar']) } style={ this.getColor(luckyNumber) }>{ project.title.substring(0,1) }</div>
                <div className={ block('col', ['title']) }>{ project.title }</div>
                <div className={ block('col', ['status']) }>You</div>
                <div className={ block('col', ['status']) }>1</div>
                <div className={ block('col', ['status'], { status: status.toLowerCase() }) }>{ status }</div>
            </div>
        );
    },

    renderProjects() {
        return (
            <div>
                <div className={ block('row', ['header']) }>
                    <div className={ block('col', ['header', 'avatar']) }></div>
                    <div className={ block('col', ['header', 'title']) }>Title</div>
                    <div className={ block('col', ['header', 'status'])}>Owner</div>
                    <div className={ block('col', ['header', 'status'])}>Members</div>
                    <div className={ block('col', ['header', 'status'])}>Status</div>
                </div>
                {
                    [].map.call(this.props.projects, this.renderProject)
                }
            </div>
        );
    },

    renderContent() {
        if (this.props.isLoading) {
            return <Spinner />;
        }

        return this.props.projects.length > 0
            ? this.renderProjects()
            : this.renderEmpty();
    },

    render() {
        return (
            <div className={ block() }>
                <div className="container">
                    <ContentBox title="Projects" background="white" shadow={ true }>
                        { this.renderContent() }
                    </ContentBox>
                </div>
            </div>
        );
    }

});

export default ProjectList;