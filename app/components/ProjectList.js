import React, { PropTypes } from 'react';
import purebem from 'purebem';
import moment from 'moment';

import ContentBox from 'app/components/ContentBox';


const block = purebem.of('project-list');

const ProjectList = React.createClass({

    propTypes: {
        projects: PropTypes.array.isRequired,
        userId: PropTypes.string.isRequired
    },

    contextTypes: {
        router: PropTypes.object.isRequired
    },

    handleClick(id) {
        this.context.router.push(`project/${id}`);
    },

    getAvatar(title, status) {
        const letter = title.substring(0,1);
        status = status.toLowerCase();
        return (
            <div className={ block('avatar', { status }) }>{ letter }</div>
        );
    },

    renderPending(project) {
        if (project.ownerId !== this.props.userId || project.members.pending === 0) {
            return null;
        }

        return (
            <span className={ block('pending') }>{ project.members.pending }</span>
        );
    },

    renderProject(project, index) {
        const { id, title, start, end, members, status } = project;

        const first = index === 0;
        const last = this.props.projects.length - 1 === index;

        return (
            <div key={ index } className={ block('row', { first, last }) } onClick={ () => this.handleClick(id) }>
                <div className={ block('col', ['avatar']) }>{ this.getAvatar(title, status) }</div>
                <div className={ block('col', ['title']) }>{ title }</div>
                <div className={ block('col', ['members']) }>{ members.active }{ this.renderPending(project) }</div>
                <div className={ block('col', ['status']) }>{ status }</div>
            </div>
        );
    },

    renderProjects() {
        this.props.projects.sort((a, b) => {
            return a.status.localeCompare(b.status);
        });

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
        if (!this.props.projects.length) {
            return null;
        }

        return (
            <div className={ block() }>
                <div className="container">
                    <ContentBox title="Projects" background="white" shadow={ true }>
                        { this.renderProjects() }
                    </ContentBox>
                </div>
            </div>
        );
    }

});

export default ProjectList;
