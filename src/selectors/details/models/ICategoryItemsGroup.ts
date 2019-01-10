import CategoryEnum from '../../../constants/CategoryEnum';
import {SwapiModelUnion} from '../../../stores/swapi/models/CategoryResponseModel';

export default interface ICategoryItemsGroup {
    readonly label: string;
    readonly category: CategoryEnum;
    readonly items: SwapiModelUnion[];
}
