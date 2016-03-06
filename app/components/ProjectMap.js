import React, { PropTypes } from 'react';
import purebem from 'purebem';
import ReactDOM from 'react-dom';


const block = purebem.of('project-map');
const handol = new google.maps.LatLng(63.25847135123485, 12.447509765625)
const options = {
    zoom: 3,
    center: handol,
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    streetViewControl: false,
    zoomControl: false,
    scaleControl: false
}

const ProjectMap = React.createClass({

    propTypes: {
        onMapClick: PropTypes.func.isRequired,
        sites: PropTypes.array.isRequired
    },

    componentDidMount() {
        this.map = new google.maps.Map(this.canvas, options);

        google.maps.event.addListener(this.map, 'click', evt => {
            this.addMarker(evt.latLng);
        });
    },

    componentDidUpdate() {
        this.props.sites.map((site, index) => {
            if (!site.map) {
                site.setMap(this.map);
            }
            site.setLabel(`${index + 1}`);
        });
    },

    addMarker(location) {
        const marker = new google.maps.Marker({
            position: location
        });

        this.props.onMapClick(marker);
    },

    render() {
        return (
            <div className={ block() }>
                <div className={ block('canvas') } ref={ (canvas) => this.canvas = canvas } />
            </div>
        );
    }
});

export default ProjectMap;