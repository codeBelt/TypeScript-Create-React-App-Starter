import {BaseModel} from 'sjs-base-model';
import PersonModel from './PersonModel';
import IConstructor from '../../../models/IConstructor';
import FilmModel from './FilmModel';
import PlanetModel from './PlanetModel';
import SpeciesModel from './SpeciesModel';
import StarshipModel from './StarshipModel';
import VehicleModel from './VehicleModel';
import CategoryEnum from '../../../constants/CategoryEnum';

export type SwapiModelUnion = FilmModel | PersonModel | PlanetModel | SpeciesModel | StarshipModel | VehicleModel;

/*
    // Returned Api Data Sample
    {
      "count": 87,
      "next": "https://swapi.co/api/people/?page=2",
      "previous": null,
      "results": []
    }
 */
export default class CategoryResponseModel<T> extends BaseModel {

    public readonly count: number = null;
    public readonly next: string = '';
    public readonly previous: string = '';
    public readonly results: SwapiModelUnion[] = [];

    /*
     * Client-Side properties
     */
    public category: CategoryEnum = null;

    constructor(data: Partial<(CategoryResponseModel<T>)>, Model: IConstructor<T>, category: CategoryEnum) {
        super();

        this.results = [Model as any];
        this.category = category;
    
        this.update(data);
    }
    
    public update(data: Partial<(CategoryResponseModel<T>)>): void {
        super.update(data);
    }
    
}
