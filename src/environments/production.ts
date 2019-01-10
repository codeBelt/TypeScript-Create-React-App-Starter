import CacheService from '../utilities/CacheService';

export default {
    apiCacheTime: {
        duration: 7,
        unit: CacheService.DAYS,
    },
    api: {
        categories: 'https://swapi.co/api/',
        people: 'https://swapi.co/api/people/',
        planets: 'https://swapi.co/api/planets/',
        films: 'https://swapi.co/api/films/',
        species: 'https://swapi.co/api/species/',
        vehicles: 'https://swapi.co/api/vehicles/',
        starships: 'https://swapi.co/api/starships/',
        topics: '/data/content.json',
    },
    isProduction: true,
    isDevelopment: false,
};
