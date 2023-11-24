export type FoundAirport = {
    name: string;
    code: string;
    distance: number;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    municipality: string;
}

export type Airport = {
    selected: boolean;
    name: string;
    code: string;
    distance: number;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    municipality: string;
}

type Decimal = number; // TypeScript does not have a native Decimal type, so we use 'number'

export interface TripGoal {
    readonly source: string;
    readonly destination: string;
    readonly price: Decimal;
    readonly departure: string; // Format: YYYY-MM-DD
    readonly currency_code: string;
}

export interface FoundFlight {
    readonly city_source: string;
    readonly city_destination: string;
    readonly total_price: Decimal;
    readonly departure_date: Date;
    readonly arrival_date: Date;
    readonly currency: string;
    readonly carrier: string;
}
