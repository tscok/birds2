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
        members: PropTypes.array.isRequired
    },

    contextTypes: {
        router: PropTypes.object.isRequired
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
        return now > start ? ( now < end ? 'Ongoing' : 'Closed' ) : 'Pending';
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

    renderPending(index) {
        const { pendingCount } = this.props.members[index];

        if (pendingCount === 0) {
            return null;
        }

        return (
            <span className={ block('pending') }>{ pendingCount }</span>
        );
    },

    renderProject(data, index) {
        const { title, start, end, luckyNumber, projectId } = data;
        const { memberCount } = this.props.members[index];

        const first = index === 0;
        const last = this.props.projects.length - 1 === index;

        return (
            <div key={ index } className={ block('row', { first, last }) } onClick={ () => this.handleClick(projectId) }>
                <div className={ block('col', ['avatar']) }>
                    <div className={ block('avatar') } style={ this.getColor(luckyNumber) }>{ title.substring(0,1) }</div>
                </div>
                <div className={ block('col', ['title']) }>{ title }</div>
                <div className={ block('col', ['members']) }>{ memberCount }{ this.renderPending(index) }</div>
                <div className={ block('col', ['status'], { status: status.toLowerCase() }) }>{ this.getStatus(start, end) }</div>
            </div>
        );
    },

    renderProjects() {
        return (
            <div>
                <div className={ block('row', ['header']) }>
                    <div className={ block('col', ['header', 'avatar']) }></div>
                    <div className={ block('col', ['header', 'title']) }>Title</div>
                    <div className={ block('col', ['header', 'members'])}>Members</div>
                    <div className={ block('col', ['header', 'status'])}>Status</div>
                </div>
                {
                    [].map.call(this.props.projects, this.renderProject)
                }
            </div>
        );
    },

    render() {
        if (!this.props.projects.length || !this.props.members.length) {
            return null;
        }

        return (
            <div className={ block() }>
                <div className="container">
                    <ContentBox title="Projects" background="white" shadow={ true }>
                        {
                            this.props.projects.length > 0
                                ? this.renderProjects()
                                : this.renderEmpty()
                        }
                    </ContentBox>
                </div>
            </div>
        );
    }

});

export default ProjectList;