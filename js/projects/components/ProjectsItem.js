import React, { PropTypes } from 'react';
import purebem from 'purebem';
import moment from 'moment';

import { capitalize } from 'js/utils';

import { NavLink } from 'js/core/components';


const block = purebem.of('projects-item');

const ProjectsItem = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propTypes: {
        item: PropTypes.object.isRequired
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
        return end.from(start, true);
    },

    onClick(id) {
        this.context.router.push(`project/${id}`);
    },

    render() {
        const { item } = this.props;
        console.log(item);
        return (
            <div className={ block() } onClick={ () => this.onClick(item.id) }>
                <div className={ block('data', ['name']) }>
                    <div className={ block('title') }>{ item.title }</div>
                    <div className={ block('value') }>{ item.owner }</div>
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
                    <div className={ block('label') }>Status</div>
                    <div className={ block('value', { status: item.status }) }>
                        { capitalize(item.status) }
                    </div>
                </div>
                <div className={ block('data', ['chevron']) }>
                    <svg width="20" height="40" viewBox="0 0 50 100">
                        <polyline className={ block('polyline') } points="10,10 40,50 10,90" />
                    </svg>
                </div>
            </div>
        );
    }

});

export default ProjectsItem;
