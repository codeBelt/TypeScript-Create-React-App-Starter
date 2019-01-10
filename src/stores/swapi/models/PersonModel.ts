import {BaseModel} from 'sjs-base-model';
import SwapiUtility from '../../../utilities/SwapiUtility';
import CategoryEnum from '../../../constants/CategoryEnum';
import INeededCategoryIds from './INeededCategoryIds';

/*
    // Returned Api Data Sample
    {
      "name": "Luke Skywalker",
      "height": "172",
      "mass": "77",
      "hair_color": "blond",
      "skin_color": "fair",
      "eye_color": "blue",
      "birth_year": "19BBY",
      "gender": "male",
      "homeworld": "https://swapi.co/api/planets/1/",
      "films": [
        "https://swapi.co/api/films/2/",
      ],
      "species": [
        "https://swapi.co/api/species/1/"
      ],
      "vehicles": [
        "https://swapi.co/api/vehicles/14/",
      ],
      "starships": [
        "https://swapi.co/api/starships/12/",
      ],
      "created": "2014-12-09T13:50:51.644000Z",
      "edited": "2014-12-20T21:17:56.891000Z",
      "url": "https://swapi.co/api/people/1/"
    }
 */
export default class PersonModel extends BaseModel {

    public readonly name: string = '';
    public readonly height: string = '';
    public readonly mass: string = '';
    public readonly hairColor: string = '';
    public readonly skinColor: string = '';
    public readonly eyeColor: string = '';
    public readonly birthYear: string = '';
    public readonly gender: string = '';
    public readonly homeworld: string = '';
    public readonly films: string[] = [];
    public readonly species: string[] = [];
    public readonly vehicles: string[] = [];
    public readonly starships: string[] = [];
    public readonly url: string = '';

    /*
     * Client-Side properties
     */
    public id: string = '';
    public category: CategoryEnum = CategoryEnum.People;
    public imageUrl: string = '';
    public neededCategoryIds: INeededCategoryIds = null;

    constructor(data: Partial<PersonModel>) {
        super();

        this.update(data);
    }

    public update(data: Partial<PersonModel>): void {
        super.update(data);

        this.id = SwapiUtility.getIdFromUrl(this.url);
        this.imageUrl = `/images/${this.category}/${this.id}.jpg`;
        this.neededCategoryIds = SwapiUtility.getIdsForCategories(this, CategoryEnum);
    }
    
}
