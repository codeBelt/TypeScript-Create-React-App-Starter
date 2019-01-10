declare module 'environment' {
    const value: {
        isProduction: boolean;
        isDevelopment: boolean;
        apiCacheTime: {
            duration: number;
            unit: 'seconds' | 'minutes' | 'hours' | 'days';
        }
        api: {
            categories: string;
            people: string;
            planets: string;
            films: string;
            species: string;
            vehicles: string;
            starships: string;
            topics: string;
        }
    };

    export default value;
}

declare module 'uuid/v3';
declare module 'redux-freeze';
