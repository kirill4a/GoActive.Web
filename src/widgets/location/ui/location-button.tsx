import { useState } from 'react';
import { useMap } from 'react-leaflet';
import { IconButton } from '@mui/material';
import { LocationDisabledOutlined, LocationSearchingOutlined, MyLocationOutlined } from '@mui/icons-material';
import { LocationEvent } from 'leaflet';
import './location.css'

export const LocationButton = ({ zoom }: { zoom: number | undefined }) => {

    const [icon, setIcon] = useState(<LocationSearchingOutlined fontSize='large' color='primary' />);

    const map = useMap();
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    function locateMe() {

        map.locate({ setView: true, maxZoom: zoom, enableHighAccuracy: true });
    };

    function onLocationFound(e: LocationEvent) {

        setIcon(<MyLocationOutlined fontSize='large' color='success' />);
        map.flyTo(e.latlng, zoom);
    }

    function onLocationError() {

        setIcon(<LocationDisabledOutlined fontSize='large' color='error' />);
    }

    return (
        <div className='leaflet-bottom leaflet-right location-btn-container'>
            <IconButton
                onClick={locateMe}>
                {icon}
            </IconButton>
        </div>
    );
}