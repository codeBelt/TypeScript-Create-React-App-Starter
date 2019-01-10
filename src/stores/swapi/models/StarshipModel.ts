import {BaseModel} from 'sjs-base-model';
import SwapiUtility from '../../../utilities/SwapiUtility';
import CategoryEnum from '../../../constants/CategoryEnum';
import INeededCategoryIds from './INeededCategoryIds';

/*
    // Returned Api Data Sample
    {
      "name": "Executor",
      "model": "Executor-class star dreadnought",
      "manufacturer": "Kuat Drive Yards, Fondor Shipyards",
      "cost_in_credits": "1143350000",
      "length": "19000",
      "max_atmosphering_speed": "n/a",
      "crew": "279144",
      "passengers": "38000",
      "cargo_capacity": "250000000",
      "consumables": "6 years",
      "hyperdrive_rating": "2.0",
      "MGLT": "40",
      "starship_class": "Star dreadnought",
      "pilots": [],
      "films": [
        "https://swapi.co/api/films/2/",
        "https://swapi.co/api/films/3/"
      ],
      "created": "2014-12-15T12:31:42.547000Z",
      "edited": "2017-04-19T10:56:06.685592Z",
      "url": "https://swapi.co/api/starships/15/"
    }
 */
export default class StarshipModel extends BaseModel {

    public readonly name: string = '';
    public readonly model: string = '';
    public readonly manufacturer: string = '';
    public readonly costInCredits: string = '';
    public readonly length: string = '';
    public readonly maxAtmospheringSpeed: string = '';
    public readonly crew: string = '';
    public readonly passengers: string = '';
    public readonly cargoCapacity: string = '';
    public readonly consumables: string = '';
    public readonly hyperdriveRating: string = '';
    public readonly mglt: string = '';
    public readonly starshipClass: string = '';
    public readonly pilots: string[] = [];
    public readonly films: string[] = [];
    public readonly url: string = '';

    /*
     * Client-Side properties
     */
    public id: string = '';
    public category: CategoryEnum = CategoryEnum.Starships;
    public people: string[] = []; // Created to be consistent with other models and the categories.
    public imageUrl: string = '';
    public neededCategoryIds: INeededCategoryIds = null;

    constructor(data: Partial<StarshipModel>) {
        super();

        this.update(data);
    }

    public update(data: Partial<StarshipModel>): void {
        super.update(data);

        this.id = SwapiUtility.getIdFromUrl(this.url);
        this.people = this.pilots;
        this.imageUrl = `/images/${this.category}/${this.id}.jpg`;
        this.neededCategoryIds = SwapiUtility.getIdsForCategories(this, CategoryEnum);
    }
    
}
