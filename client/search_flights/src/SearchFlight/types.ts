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

export type TripGoal = {
    _id: string;
    name: string;
    airports: Airport[];
    city_origin: string;
}