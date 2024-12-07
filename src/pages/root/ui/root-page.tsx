import { LatLng } from "leaflet";
import { AttributionControl, MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import { LocationButton } from "../../../widgets/location-button";
import { AddSketchButton } from "../../../widgets/add-sketch-button";
import './root-page.css'

export const RootPage = () => {

    const maxOsmZoom = 18;
    const defaultZoom = 16;
    const defaultCenter = new LatLng(55.72083, 38.34944);

    return (
        <>
            <MapContainer
                id='main-map'
                center={defaultCenter}
                zoom={defaultZoom}
                scrollWheelZoom={true}
                maxZoom={maxOsmZoom}
                zoomControl={false}
                attributionControl={false}>
                <TileLayer
                    attribution='GoActive | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <AttributionControl position='topleft' />
                <ZoomControl position='bottomright' />
                <LocationButton zoom={defaultZoom} />
                <AddSketchButton />
            </MapContainer>
        </>);
};