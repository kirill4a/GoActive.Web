import { components } from "../../../shared/api/v1-prealpha";

export interface Spot {
    Id: string,
    Latitude: number;
    Longitude: number;
    Title: string,
    Address?: string | null | undefined,
    Activities: components['schemas']['ActivityTypes'][]
}