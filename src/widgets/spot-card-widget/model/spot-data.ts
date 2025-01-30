import { LatLng } from "leaflet";
import { ActivityTypes } from "../../../shared/api";

export interface SpotData {
    Title: string;
    Activities: ActivityTypes[];
    Description?: string;
    Address?: string;
    Location: LatLng
}