import { LatLng } from "leaflet";

export interface CenteredMarkerOptons {
    onPositionChanged?: (location: LatLng) => void;
}