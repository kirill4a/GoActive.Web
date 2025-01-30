import { SearchedSpot } from "../../../shared/api";

export interface SearchSpotsWidgetOptions {
    onSelected?: (spot?: SearchedSpot) => void;
}