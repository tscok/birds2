import React, { PropTypes } from 'react';
import purebem from 'purebem';
import moment from 'moment';

import { capitalize } from 'js/utils';

import { NavLink } from 'js/core/components';


const block = purebem.of('projects-list');

const ProjectsItem = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propTypes: {
        first: PropTypes.bool.isRequired,
        item: PropTypes.object.isRequired,
        last: PropTypes.bool.isRequired
    },

    getDate(timestamp) {
        return moment.unix(timestamp);
    },

    getDueDate(dates) {
        return this.getDate(dates.expire).fromNow();
    },

    getDuration(dates) {
        const start = this.getDate(dates.begin);
        const end = this.getDate(dates.expire);
        const months = Math.round(end.diff(start, 'months', true));
        return `${months} months`;
    },

    onClick(item) {
        if (item.status === 'pending') {
            return;
        }
        this.context.router.push(`project/${item.id}`);
    },

    render() {
        const { first, item, last } = this.props;
        const pending = item.status === 'pending';
        return (
            <div className={ block('item', { first, last, pending }) } onClick={ () => this.onClick(item) }>
                <div className={ block('data', ['title']) }>
                    <div className={ block('label') }>Title</div>
                    <div className={ block('value') }>{ item.title }</div>
                </div>
                <div className={ block('data', ['duration']) }>
                    <div className={ block('label') }>Duration</div>
                    <div className={ block('value') }>
                        { this.getDuration(item.dates) }
                    </div>
                </div>
                <div className={ block('data', ['due']) }>
                    <div className={ block('label') }>Due</div>
                    <div className={ block('value') }>
                        { this.getDueDate(item.dates) }
                    </div>
                </div>
                <div className={ block('data', ['status']) }>
                    <div className={ block('label') }>Access</div>
                    <div className={ block('value', { status: item.status }) }>
                        { capitalize(item.status) }
                    </div>
                </div>
                <div className={ block('data', ['chevron']) }>
                    <svg width="10" height="20" viewBox="0 0 50 100">
                        <polyline className={ block('polyline') } points="10,10 40,50 10,90" />
                    </svg>
                </div>
            </div>
        );
    }

});

export default ProjectsItem;
