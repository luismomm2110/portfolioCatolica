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

export type FlightArea = {
    _id: string;
    name: string;
    airports: Airport[];
    travel_agent_id: string;
    city_origin: string;
}