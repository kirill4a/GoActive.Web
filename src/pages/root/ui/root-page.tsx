import { useRef, useState } from "react";
import { LatLng, Point } from "leaflet";
import { AttributionControl, MapContainer, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import { LocationButton } from "../../../widgets/location-button";
import { AddSketchButton } from "../../../widgets/add-sketch-button";
import { SearchSpotsWidget } from "../../../widgets/search-spots-widget";
import { SpotCard } from "../../../widgets/spot-card-widget";
import { SearchedSpot } from "../../../shared/api";
import './root-page.css'

export const RootPage = () => {

    const maxOsmZoom = 18;
    const defaultZoom = 16;
    const defaultCenter = new LatLng(55.72083, 38.34944);

    var containerRef = useRef<HTMLDivElement | null>(null);

    const [map, setMap] = useState<L.Map | null>(null);
    const [marker, setMarker] = useState<L.Marker | null>(null);

    const [markerPosition, setMarkerPosition] = useState<LatLng | undefined>();
    const [spot, setSpot] = useState<SearchedSpot | undefined>();
    const [cardOpen, setCardOpen] = useState(false);

    const handleSearched = (spot?: SearchedSpot) => {

        if (spot && spot.location) {

            const location = new LatLng(spot.location.latitude!, spot.location.longitude!)
            const shift = (containerRef.current?.clientHeight! / 100 * 38) / 2;

            const originalPoint = map?.latLngToContainerPoint(location);
            const shiftedPoint = new Point(originalPoint!.x, originalPoint!.y + shift);
            const shiftedLocation = map?.containerPointToLatLng(shiftedPoint);

            map?.setView(shiftedLocation!, defaultZoom, { animate: true });
            setMarkerPosition(location);
            setCardOpen(true);
        }

        setSpot(spot);
    };

    const handleSpotLoaded = () => {

        if (markerPosition) {
            marker?.openPopup();
        }
    }

    const handleSpotCardClose = () => setCardOpen(false);

    const displayMap = () => (
        <MapContainer
            ref={setMap}
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
            <ZoomControl position='topright' />
            <LocationButton zoom={defaultZoom} />
            <AddSketchButton />

            {/* TODO: move to the SpotMarker component */}
            {spot && markerPosition && <Marker
                ref={setMarker}
                key={spot.id}
                position={markerPosition}
                eventHandlers={{
                    click: e => {
                        setCardOpen(true);
                    }
                }}
            >
                <Popup>
                    {spot.title}
                </Popup>
            </Marker>}
        </MapContainer>
    );

    return (
        <>
            <div id='main-container' ref={containerRef}>
                {displayMap()}
                <div>
                    <SearchSpotsWidget onSelected={handleSearched} />
                    {spot?.id && <SpotCard spotId={spot.id} isOpen={cardOpen} onClose={handleSpotCardClose} onDataLoaded={handleSpotLoaded} />}
                </div>
            </div>
        </>);

};