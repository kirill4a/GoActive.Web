import { FC, useEffect, useState } from "react";
import { LatLng } from "leaflet";
import { Marker, Popup, useMapEvent } from "react-leaflet";
import { CenteredMarkerOptons } from "./centered-marker-options";

export const CenteredMarker: FC<CenteredMarkerOptons> = (options) => {

    const getCenter = () => map.getCenter();

    const map = useMapEvent('drag', () => {

        const center = getCenter();
        setPosition(center);

        if (options?.onPositionChanged)
            options.onPositionChanged(center);
    });

    useEffect(() => {

        const location = getCenter();
        if (options?.onPositionChanged)
            options.onPositionChanged(location);
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
