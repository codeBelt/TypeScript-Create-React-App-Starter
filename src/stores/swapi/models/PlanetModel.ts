import {BaseModel} from 'sjs-base-model';
import SwapiUtility from '../../../utilities/SwapiUtility';
import CategoryEnum from '../../../constants/CategoryEnum';
import INeededCategoryIds from './INeededCategoryIds';

/*
    // Returned Api Data Sample
    {
      "name": "Alderaan",
      "rotation_period": "24",
      "orbital_period": "364",
      "diameter": "12500",
      "climate": "temperate",
      "gravity": "1 standard",
      "terrain": "grasslands, mountains",
      "surface_water": "40",
      "population": "2000000000",
      "residents": [
        "https://swapi.co/api/people/5/",
      ],
      "films": [
        "https://swapi.co/api/films/6/",
      ],
      "created": "2014-12-10T11:35:48.479000Z",
      "edited": "2014-12-20T20:58:18.420000Z",
      "url": "https://swapi.co/api/planets/2/"
    }
 */
export default class PlanetModel extends BaseModel {

    public readonly name: string = '';
    public readonly rotationPeriod: string = '';
    public readonly orbitalPeriod: string = '';
    public readonly diameter: string = '';
    public readonly climate: string = '';
    public readonly gravity: string = '';
    public readonly terrain: string = '';
    public readonly surfaceWater: string = '';
    public readonly population: string = '';
    public readonly residents: string[] = [];
    public readonly films: string[] = [];
    public readonly url: string = '';

    /*
     * Client-Side properties
     */
    public id: string = '';
    public category: CategoryEnum = CategoryEnum.Planets;
    public people: string[] = []; // Created to be consistent with other models and the categories.
    public imageUrl: string = '';
    public neededCategoryIds: INeededCategoryIds = null;

    constructor(data: Partial<PlanetModel>) {
        super();

        this.update(data);
    }

    public update(data: Partial<PlanetModel>): void {
        super.update(data);

        this.id = SwapiUtility.getIdFromUrl(this.url);
        this.people = this.residents;
        this.imageUrl = `/images/${this.category}/${this.id}.jpg`;
        this.neededCategoryIds = SwapiUtility.getIdsForCategories(this, CategoryEnum);
    }
    
}
