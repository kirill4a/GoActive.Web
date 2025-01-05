import { components } from "../../../shared/api/v1-prealpha";

export interface Spot {
    Id: string,
    Title: string,
    Activities: components['schemas']['ActivityTypes'][]
}