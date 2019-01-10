/*
    // Returned Api Data Sample
    {
        "films": "https://swapi.co/api/films/",
        "people": "https://swapi.co/api/people/",
        "planets": "https://swapi.co/api/planets/",
        "species": "https://swapi.co/api/species/",
        "starships": "https://swapi.co/api/starships/",
        "vehicles": "https://swapi.co/api/vehicles/"
    }
 */
export default interface ICategoriesResponse {
    readonly films: string;
    readonly people: string;
    readonly planets: string;
    readonly species: string;
    readonly starships: string;
    readonly vehicles: string;
}
