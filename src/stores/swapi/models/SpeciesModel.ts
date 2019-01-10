import {BaseModel} from 'sjs-base-model';
import SwapiUtility from '../../../utilities/SwapiUtility';
import CategoryEnum from '../../../constants/CategoryEnum';
import INeededCategoryIds from './INeededCategoryIds';

/*
    // Returned Api Data Sample
    {
      "name": "Hutt",
      "classification": "gastropod",
      "designation": "sentient",
      "average_height": "300",
      "skin_colors": "green, brown, tan",
      "hair_colors": "n/a",
      "eye_colors": "yellow, red",
      "average_lifespan": "1000",
      "homeworld": "https://swapi.co/api/planets/24/",
      "language": "Huttese",
      "people": [
        "https://swapi.co/api/people/16/"
      ],
      "films": [
        "https://swapi.co/api/films/3/",
      ],
      "created": "2014-12-10T17:12:50.410000Z",
      "edited": "2014-12-20T21:36:42.146000Z",
      "url": "https://swapi.co/api/species/5/"
    }
 */
export default class SpeciesModel extends BaseModel {

    public readonly name: string = '';
    public readonly classification: string = '';
    public readonly designation: string = '';
    public readonly averageHeight: string = '';
    public readonly skinColors: string = '';
    public readonly hairColors: string = '';
    public readonly eyeColors: string = '';
    public readonly averageLifespan: string = '';
    public readonly homeworld: string = '';
    public readonly language: string = '';
    public readonly people: string[] = [];
    public readonly films: string[] = [];
    public readonly url: string = '';

    /*
     * Client-Side properties
     */
    public id: string = '';
    public category: CategoryEnum = CategoryEnum.Species;
    public imageUrl: string = '';
    public neededCategoryIds: INeededCategoryIds = null;

    constructor(data: Partial<SpeciesModel>) {
        super();

        this.update(data);
    }

    public update(data: Partial<SpeciesModel>): void {
        super.update(data);

        this.id = SwapiUtility.getIdFromUrl(this.url);
        this.imageUrl = `/images/${this.category}/${this.id}.jpg`;
        this.neededCategoryIds = SwapiUtility.getIdsForCategories(this, CategoryEnum);
    }
    
}
