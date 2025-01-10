export interface SearchLookupOptions {

    onSelected(spotId: string, latitude: number, longitude: number): void;
    onClear(): void;
}