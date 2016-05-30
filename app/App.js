import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { LoginView, Navigation } from './views';


const block = purebem.of('app-view');

const App = React.createClass({

    propTypes: {
        children: PropTypes.node
    },

    render() {
        return (
            <div className={ block() }>
                <Navigation { ...this.props } />
                <main className={ block('main') }>
                    { this.props.children }
                </main>
            </div>
        );
    }

});

export default App;
