import {BaseModel} from 'sjs-base-model';
import SwapiUtility from '../../../utilities/SwapiUtility';
import CategoryEnum from '../../../constants/CategoryEnum';
import INeededCategoryIds from './INeededCategoryIds';

/*
    // Returned Api Data Sample
    {
      "name": "Sand Crawler",
      "model": "Digger Crawler",
      "manufacturer": "Corellia Mining Corporation",
      "cost_in_credits": "150000",
      "length": "36.8",
      "max_atmosphering_speed": "30",
      "crew": "46",
      "passengers": "30",
      "cargo_capacity": "50000",
      "consumables": "2 months",
      "vehicle_class": "wheeled",
      "pilots": [],
      "films": [
        "https://swapi.co/api/films/5/",
      ],
      "created": "2014-12-10T15:36:25.724000Z",
      "edited": "2014-12-22T18:21:15.523587Z",
      "url": "https://swapi.co/api/vehicles/4/"
    }
 */
export default class VehicleModel extends BaseModel {

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
    public readonly vehicleClass: string = '';
    public readonly pilots: string[] = [];
    public readonly films: string[] = [];
    public readonly url: string = '';

    /*
     * Client-Side properties
     */
    public id: string = '';
    public category: CategoryEnum = CategoryEnum.Vehicles;
    public people: string[] = []; // Created to be consistent with other models and the categories.
    public imageUrl: string = '';
    public neededCategoryIds: INeededCategoryIds = null;

    constructor(data: Partial<VehicleModel>) {
        super();
    
        this.update(data);
    }
    
    public update(data: Partial<VehicleModel>): void {
        super.update(data);

        this.id = SwapiUtility.getIdFromUrl(this.url);
        this.people = this.pilots;
        this.imageUrl = `/images/${this.category}/${this.id}.jpg`;
        this.neededCategoryIds = SwapiUtility.getIdsForCategories(this, CategoryEnum);
    }
    
}
