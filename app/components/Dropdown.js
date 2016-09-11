import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { noop, getSelectedIndex, getSelectedItem } from 'app/utils';
import { ClickOutside } from 'app/components';

// import { handleUpdate } from 'app/redux/components/update';


const block = purebem.of('dropdown');

const Dropdown = React.createClass({

    propTypes: {
        expanded: PropTypes.bool.isRequired,
        // ...
        onClick: PropTypes.func,
        onExpand: PropTypes.func,
        onSelect: PropTypes.func,
        // ...
        list: PropTypes.array,
        value: PropTypes.string,
        // redux
        onUpdate: PropTypes.func
    },

    getDefaultProps() {
        return {
            onClick: noop,
            onExpand: noop,
            onSelect: noop
        };
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
                this.handleSelectItem();
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

    handleClick(item) {
        if (!item) {
            return;
        }
        this.props.onClick(item.name);
        this.handleCollapse();
    },

    handleCollapse() {
        this.props.onExpand(false);
    },

    handleExpand() {
        this.props.onUpdate();
        
        // if (this.props.list.length) {
        //     this.props.onExpand(true);
        // }
    },

    handleSelect(move) {
        const index = getSelectedIndex(this.props.list);
        const newIndex = index + move < 0
            ? this.props.list.length - 1
            : (index + move) % this.props.list.length;

        this.props.onSelect(newIndex);
    },

    handleSelectItem() {
        const selectedItem = getSelectedItem(this.props.list);
        if (selectedItem) {
            this.handleClick(selectedItem);
        }
    },

    renderListItem(item, index) {
        const { selected } = item;
        return (
            <div
                className={ block('item', { selected }) }
                key={ index }
                onClick={ () => this.handleClick(item) }>
                { item.name }
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
                <div className={ block() } onClick={ this.handleExpand }>
                    <div className={ block('control') } tabIndex="0" onKeyDown={ this.onKeyDown }>
                        <div className={ block('value') }>
                            { this.props.value }
                        </div>
                        <div className={ block('button') }>
                            <i className="icon-circle-plus" />
                        </div>
                    </div>
                    { this.renderList() }
                </div>
            </ClickOutside>
        );
    }

});

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdate: () => dispatch(handleUpdate(props.root, props.path, { test: 'abc' }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
