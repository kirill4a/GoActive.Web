import { LatLng } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import './root-page.css'
import { LocationButton } from "../../../widgets/location";

export const RootPage = () => {

    const maxOsmZoom = 18;
    const defaultZoom = 16;
    const defaultCenter = new LatLng(55.72083, 38.34944);

    return (
        <>
            <MapContainer center={defaultCenter} zoom={defaultZoom} scrollWheelZoom={true} maxZoom={maxOsmZoom} id="main-map">
                <TileLayer
                    attribution='GoActive | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={defaultCenter}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <LocationButton zoom={defaultZoom} />
            </MapContainer>
        </>);
};