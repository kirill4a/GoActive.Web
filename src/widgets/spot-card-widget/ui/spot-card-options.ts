export interface SpotCardOptions {
    spotId: string;
    isOpen: boolean;
    onDataLoaded?: () => void;
    onClose?: () => void;
}