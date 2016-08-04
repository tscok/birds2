import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { noop } from 'app/utils';
import { find, findIndex } from 'app/lodash';
import { ClickOutside, InputField } from 'app/components';


const block = purebem.of('autocomplete');

const Autocomplete = React.createClass({

    propTypes: {
        expanded: PropTypes.bool.isRequired,
        onChange: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired,
        onExpand: PropTypes.func.isRequired,
        onSelect: PropTypes.func.isRequired,
        // ...
        name: PropTypes.string,
        list: PropTypes.array,
        value: PropTypes.string
    },

    onKeyDown(evt) {
        switch (evt.which) {
            case 9: // tab
            case 27: // esc
                this.handleCollapse();
                break;

            case 13: // enter
            case 32: // space
                evt.stopPropagation();
                evt.preventDefault();
                this.getSelectedItem();
                break;

            case 38: // up
                evt.stopPropagation();
                evt.preventDefault();
                this.handleSelect(-1);
                break;

            case 40: // down
                evt.stopPropagation();
                evt.preventDefault();
                this.handleSelect(1);
                break;
        }
    },

    getSelectedItem() {
        const selectedItem = find(this.props.list, (o) => o.selected);
        if (selectedItem) {
            this.handleClick(selectedItem);
        }
    },

    getSelectedIndex() {
        return findIndex(this.props.list, (o) => o.selected);
    },

    handleSelect(move) {
        const index = this.getSelectedIndex();
        const newIndex = index + move < 0
            ? this.props.list.length - 1
            : (index + move) % this.props.list.length;

        this.props.onSelect(newIndex);
    },

    handleCollapse() {
        this.props.onExpand(false);
    },

    handleClick(item) {
        if (!item) {
            return;
        }
        this.props.onClick(item.size);
        this.handleCollapse();
    },

    renderListItem(item, index) {
        const { selected } = item;
        return (
            <div
                className={ block('item', { selected }) }
                key={ index }
                onClick={ () => this.handleClick(item) }>
                { item.size }
            </div>
        );
    },

    renderList() {
        if (!this.props.expanded) {
            return null;
        }

        return (
            <div className={ block('list') }>
                {
                    [].map.call(this.props.list, this.renderListItem)
                }
            </div>
        );
    },

    render() {
        return (
            <ClickOutside onClick={ this.handleCollapse }>
                <div className={ block() }>
                    <InputField
                        name={ this.props.name }
                        onChange={ this.props.onChange }
                        onFocus={ this.props.onChange }
                        onKeyDown={ this.onKeyDown }
                        value={ this.props.value } />
                    { this.renderList() }
                </div>
            </ClickOutside>
        );
    }

});

export default Autocomplete;
