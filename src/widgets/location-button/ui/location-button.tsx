import { FC, useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { IconButton } from '@mui/material';
import { LocationDisabledOutlined, LocationSearchingOutlined, MyLocationOutlined } from '@mui/icons-material';
import { ErrorEvent, LocationEvent } from 'leaflet';
import { LocationButtonOptions } from './location-button-options';
import './location-button.css'

export const LocationButton: FC<LocationButtonOptions> = (options?) => {

    const [icon, setIcon] = useState(<LocationSearchingOutlined fontSize='large' color='primary' />);

    const map = useMap();

    useEffect(() => {

        if (!map) {
            return;
        }

        function onLocationFound(e: LocationEvent) {

            setIcon(<MyLocationOutlined fontSize='large' color='success' />);
            map.flyTo(e.latlng, options?.zoom);
        }

        function onLocationError(e: ErrorEvent) {

            console.error(e);
            setIcon(<LocationDisabledOutlined fontSize='large' color='error' />);
        }

        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);

        return () => {
            map.off('locationfound', onLocationFound);
            map.off('locationerror', onLocationError);
        };
    }, [map, options?.zoom]);

    function locateMe() {

        map.locate({ setView: true, maxZoom: options?.zoom, enableHighAccuracy: true });
    };

    return (
        <div className='leaflet-bottom leaflet-right location-btn-container'>
            <IconButton
                onClick={locateMe}>
                {icon}
            </IconButton>
        </div>
    );
}
