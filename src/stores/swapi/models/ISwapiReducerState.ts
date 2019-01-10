import ICategoriesResponse from './ICategoriesResponse';
import CategoryEnum from '../../../constants/CategoryEnum';
import ILoadMoreEntity from './ILoadMoreEntity';

export default interface ISwapiReducerState {
    readonly [CategoryEnum.People]: ILoadMoreEntity;
    readonly [CategoryEnum.Planets]: ILoadMoreEntity;
    readonly [CategoryEnum.Starships]: ILoadMoreEntity;
    readonly [CategoryEnum.Vehicles]: ILoadMoreEntity;
    readonly [CategoryEnum.Species]: ILoadMoreEntity;
    readonly [CategoryEnum.Films]: ILoadMoreEntity;
    readonly currentCategory: CategoryEnum;
    readonly isLoadingCategories: boolean;
    readonly isLoadingCategory: boolean;
    readonly isLoadingDetails: boolean;
    readonly categories: ICategoriesResponse | null;
}
