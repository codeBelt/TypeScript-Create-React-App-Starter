import {BaseModel} from 'sjs-base-model';
import StarshipModel from './StarshipModel';
    
/*
    // Returned Api Data Sample
    {
      "count": 37,
      "next": "https://swapi.co/api/starships/?page=2",
      "previous": null,
      "results": [
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
        },
      ]
    }
 */
export default class StarshipsResponseModel extends BaseModel {

    public readonly count: number = null;
    public readonly next: string = '';
    public readonly previous: string = '';
    public readonly results: StarshipModel[] = [StarshipModel as any];

    constructor(data: Partial<StarshipsResponseModel>) {
        super();
    
        this.update(data);
    }
    
    public update(data: Partial<StarshipsResponseModel>): void {
        super.update(data);
    }
    
}
