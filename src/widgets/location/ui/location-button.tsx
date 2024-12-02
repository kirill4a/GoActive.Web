import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { IconButton } from '@mui/material';
import { LocationDisabledOutlined, LocationSearchingOutlined, MyLocationOutlined } from '@mui/icons-material';
import { LocationEvent } from 'leaflet';
import { LocationButtonOptions } from './location-button-options';
import './location.css'

export const LocationButton = ({ zoom }: LocationButtonOptions) => {

    const [icon, setIcon] = useState(<LocationSearchingOutlined fontSize='large' color='primary' />);

    const map = useMap();

    useEffect(() => {

        if (!map) {
            return;
        }

        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);

        return () => {
            map.off('locationfound', onLocationFound);
            map.off('locationerror', onLocationError);
        };
    }, [map]);

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
