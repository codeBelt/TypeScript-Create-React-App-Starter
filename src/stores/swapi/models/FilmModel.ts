import {BaseModel} from 'sjs-base-model';
import SwapiUtility from '../../../utilities/SwapiUtility';
import CategoryEnum from '../../../constants/CategoryEnum';
import INeededCategoryIds from './INeededCategoryIds';

/*
    // Returned Api Data Sample
    {
      "title": "A New Hope",
      "episode_id": 4,
      "opening_crawl": "It is a period of civil war...",
      "director": "George Lucas",
      "producer": "Gary Kurtz, Rick McCallum",
      "release_date": "1977-05-25",
      "characters": [
        "https://swapi.co/api/people/1/",
      ],
      "planets": [
        "https://swapi.co/api/planets/2/",
      ],
      "starships": [
        "https://swapi.co/api/starships/2/",
      ],
      "vehicles": [
        "https://swapi.co/api/vehicles/4/",
      ],
      "species": [
        "https://swapi.co/api/species/5/",
      ],
      "created": "2014-12-10T14:23:31.880000Z",
      "edited": "2015-04-11T09:46:52.774897Z",
      "url": "https://swapi.co/api/films/1/"
    }
 */
export default class FilmModel extends BaseModel {

    public readonly title: string = '';
    public readonly episodeId: number = null;
    public readonly openingCrawl: string = '';
    public readonly director: string = '';
    public readonly producer: string = '';
    public readonly releaseDate: string = '';
    public readonly characters: string[] = [];
    public readonly planets: string[] = [];
    public readonly starships: string[] = [];
    public readonly vehicles: string[] = [];
    public readonly species: string[] = [];
    public readonly url: string = '';

    /*
     * Client-Side properties
     */
    public id: string = '';
    public category: CategoryEnum = CategoryEnum.Films;
    public name: string = ''; // All other Swapi models have a "name" property. Added to help create display objects.
    public people: string[] = []; // Created to be consistent with other models and the categories.
    public imageUrl: string = '';
    public neededCategoryIds: INeededCategoryIds = null;

    constructor(data: Partial<FilmModel>) {
        super();

        this.update(data);
    }

    public update(data: Partial<FilmModel>): void {
        super.update(data);

        this.id = SwapiUtility.getIdFromUrl(this.url);
        this.name = this.title;
        this.people = this.characters;
        this.imageUrl = `/images/${this.category}/${this.id}.jpg`;
        this.neededCategoryIds = SwapiUtility.getIdsForCategories(this, CategoryEnum);
    }

}
