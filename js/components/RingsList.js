import React, { PropTypes } from 'react';

import { orderBy } from 'app/lodash';
import { List, RingsListHeader, RingsListItem } from 'app/components';


const RingsList = React.createClass({

    propTypes: {
        list: PropTypes.array.isRequired,
        listItemProps: PropTypes.object.isRequired
    },

    render() {
        const { list, listItemProps } = this.props;

        return (
            <List
                list={ orderBy(list, ['size']) }
                listItem={ RingsListItem }
                listItemProps={ listItemProps }
                listHeader={ RingsListHeader } />
        );
    }

});

export default RingsList;
