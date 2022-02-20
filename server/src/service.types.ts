export interface currency_type {
    [key: string]: number;
}

export interface country_type {
    name: {
        common: string;
        official: string;
    };
    currencies: {
        [key: string]: {
            name: string;
            symbol: string;
        };
    };
    population: number;
    cca2: string;
}

export interface exchange_response {
    success: boolean;
    timestamp: number;
    base: string;
    date: string;
    rates: currency_type;
}

export interface credential {
    username: string;
    password: string;
}
