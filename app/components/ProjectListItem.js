import React, { PropTypes } from 'react';
import purebem from 'purebem';
import moment from 'moment';

import { capitalize } from 'app/utils';


const block = purebem.of('project-list-item');

const ProjectListItem = React.createClass({

    contextTypes: {
        router: PropTypes.object.isRequired
    },

    propTypes: {
        item: PropTypes.object.isRequired
    },

    handleClick() {
        if (this.props.item.role === 'pending') {
            return;
        }
        this.context.router.push(`project/${this.props.item.id}`);
    },

    getOwner() {
        const { item } = this.props;
        const owner = item.role === 'owner' ? 'you' : item.owner;

        return (
            <span className={ block('owner') }>{ owner }</span>
        );
    },

    render() {
        const { item } = this.props;
        const day = moment.unix(item.dates.timestamp);
        const date = day.format('MMMM Do, YYYY');
        const role = item.role;

        return (
            <div className={ block({ role }) } onClick={ this.handleClick }>
                <div className={ block('details') }>
                    <div className={ block('title') }>
                        { item.title }
                    </div>
                    <div className={ block('body') }>
                        Created by { this.getOwner() } on { date }
                    </div>
                </div>
                <div className={ block('status', { role }) }>
                    { capitalize(role) }
                </div>
            </div>
        );
    }

});

export default ProjectListItem;
