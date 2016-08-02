import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { firebase } from 'app/firebase';
import { filter } from 'app/lodash';
import { Button } from 'app/components';


const block = purebem.of('rings-list-item');

const RingsListItem = React.createClass({

    propTypes: {
        item: PropTypes.object.isRequired,
        onExpand: PropTypes.func.isRequired,
        projectId: PropTypes.string.isRequired
    },

    handleExpand() {
        const { item } = this.props;
        this.props.onExpand(item.size, item.expanded);
    },

    handleRemove() {
        const { item, projectId } = this.props;
        firebase.database().ref(`rings/${projectId}/${item.id}`).remove();
    },

    renderButtons() {
        if (!this.props.item.expanded) {
            return (
                <Button onClick={ this.handleExpand }>Edit</Button>
            );
        }

        return (
            <div>
                <Button onClick={ this.handleRemove } style="danger">Remove</Button>
                <Button onClick={ this.handleExpand }>Cancel</Button>
            </div>
        );
    },

    render() {
        const { item } = this.props;

        return (
            <div className={ block() }>
                <div className={ block('data', ['size']) }>
                    <span className={ block('label') }>Size:</span>
                    <span className={ block('value') }>{ item.size }</span>
                </div>
                <div className={ block('data', ['serial']) }>
                    <span className={ block('label') }>Serial:</span>
                    <span className={ block('value') }>{ item.serial }</span>
                </div>
                <div className={ block('data', ['actions']) }>
                    { this.renderButtons() }
                </div>
            </div>
        );
    }

});

export default RingsListItem;
