export type Airport = {
    name: string;
    code: string;
    distance: number;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    municipality: string;
}