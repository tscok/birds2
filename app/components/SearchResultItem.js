import React, { PropTypes } from 'react';
import purebem from 'purebem';
import moment from 'moment';

import { JoinButton } from 'app/components';


const block = purebem.of('search-result-item');

const SearchResultItem = React.createClass({

    propTypes: {
        item: PropTypes.object.isRequired
    },

    render() {
        const { item } = this.props;
        const day = moment.unix(item.dates.timestamp);
        const date = day.format('MMMM Do, YYYY');

        return (
            <div className={ block() }>
                <div className={ block('details') }>
                    <div className={ block('title') }>
                        { item.title }
                    </div>
                    <div className={ block('body') }>
                        Created by <span className={ block('owner') }>{ item.owner }</span> on { date }
                    </div>
                </div>
                <div className={ block('action') }>
                    <JoinButton project={ item } />
                </div>
            </div>
        );
    }

});

export default SearchResultItem;
