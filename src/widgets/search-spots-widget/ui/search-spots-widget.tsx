import { FC, useState } from "react";
import { IconButton } from "@mui/material";
import { SearchOffOutlined, SearchOutlined } from "@mui/icons-material";

import { LatLng, LatLngExpression } from "leaflet";
import { useMap } from "react-leaflet/hooks";
import { Marker } from "react-leaflet";

import { SearchSpotsWidgetOptions } from "./search-spots-widget-options";
import { SearchLookup } from "./search-lookup";
import './search-spots-widget.css';

export const SearchSpotsWidget: FC<SearchSpotsWidgetOptions> = ({ zoom }) => {

    const map = useMap();

    const icons = {
        search: <SearchOutlined fontSize='large' color='primary' />,
        searchOff: <SearchOffOutlined fontSize='large' color='primary' />
    };

    const [showLookup, setShowLookup] = useState(false);
    const [position, setPosition] = useState<LatLngExpression | null>(null);
    const [spotId, setSpotId] = useState<string | null>(null);

    const handleButtonClick = () => setShowLookup(prev => !prev);

    const handleSelected = (spotId: string, latitude: number, longitude: number) => {

        setSpotId(spotId);

        const location = new LatLng(latitude, longitude);
        map.setView(location, zoom, { animate: true });
        setPosition(location);
    };

    return (
        <>
            <div className='leaflet-top leaflet-right search-widget-container'>
                {showLookup && <SearchLookup onSelected={handleSelected} onClear={() => setPosition(null)} />}
                <IconButton onClick={() => handleButtonClick()}>
                    {showLookup ? icons.searchOff : icons.search}
                </IconButton>
            </div>
            {/* //TODO: replace Marker with SpotDetails widget */}
            {position && <Marker position={position}>
            </Marker>}
        </>
    );
}