import { FC, useCallback, useEffect, useState } from "react";
import { LatLng } from "leaflet";
import { Marker, Popup, useMapEvent } from "react-leaflet";

interface CenteredMarkerOptons {
    onPositionChanged?: (location: LatLng) => void;
}

export const CenteredMarker: FC<CenteredMarkerOptons> = ({ onPositionChanged }) => {

    const map = useMapEvent('drag', () => {

        const center = getCenter();
        setPosition(center);

        if (onPositionChanged)
            onPositionChanged(center);
    });

    const getCenter = useCallback(() => {

        return map.getCenter();
    }, [map]);

    useEffect(() => {

        const location = getCenter();
        if (onPositionChanged)
            onPositionChanged(location);
    }, []);

    const [position, setPosition] = useState<LatLng>(getCenter);

    return (
        <Marker position={position}>
            <Popup>
                Drag the map <br />to point out the sketch.
            </Popup>
        </Marker>
    );
}
