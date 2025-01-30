import { SearchedSpot } from "../../../shared/api";

export interface SearchLookupOptions {

    onSelected(selectedSpot: SearchedSpot): void;
    onClear(): void;
}