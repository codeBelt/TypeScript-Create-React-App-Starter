import IAction from '../IAction';
import ICategoriesResponse from './models/ICategoriesResponse';
import CategoryEnum from '../../constants/CategoryEnum';
import IDetailsRequest from './models/IDetailsRequest';
import CategoryResponseModel, {SwapiModelUnion} from './models/CategoryResponseModel';
import ICategoryRequest from './models/ICategoryRequest';

export type SwapiActionUnion = void | string | ICategoriesResponse | ICategoryRequest | CategoryResponseModel<SwapiModelUnion> | SwapiModelUnion[];

export default class SwapiAction {
    public static readonly LOAD_CATEGORIES: string = 'SwapiAction.LOAD_CATEGORIES';
    public static readonly LOAD_CATEGORIES_SUCCESS: string = 'SwapiAction.LOAD_CATEGORIES_SUCCESS';
    public static readonly LOAD_CATEGORY: string = 'SwapiAction.LOAD_CATEGORY';
    public static readonly LOAD_CATEGORY_SUCCESS: string = 'SwapiAction.LOAD_CATEGORY_SUCCESS';
    public static readonly LOAD_DETAILS: string = 'SwapiAction.LOAD_DETAILS';
    public static readonly LOAD_DETAILS_SUCCESS: string = 'SwapiAction.LOAD_DETAILS_SUCCESS';

    public static loadCategories(): IAction<void> {
        return {
            type: SwapiAction.LOAD_CATEGORIES,
        };
    }

    public static loadCategoriesSuccess(model: ICategoriesResponse): IAction<ICategoriesResponse> {
        return {
            type: SwapiAction.LOAD_CATEGORIES_SUCCESS,
            payload: model,
        };
    }

    public static loadCategory(request: ICategoryRequest): IAction<ICategoryRequest> {
        return {
            type: SwapiAction.LOAD_CATEGORY,
            payload: request,
        };
    }

    public static loadCategorySuccess(models: CategoryResponseModel<SwapiModelUnion>): IAction<CategoryResponseModel<SwapiModelUnion>> {
        return {
            type: SwapiAction.LOAD_CATEGORY_SUCCESS,
            payload: models,
        };
    }

    public static loadDetails(itemId: string, category: CategoryEnum): IAction<IDetailsRequest> {
        return {
            type: SwapiAction.LOAD_DETAILS,
            payload: {
                itemId,
                category,
            },
        };
    }

    public static loadDetailsSuccess(models: SwapiModelUnion[]): IAction<SwapiModelUnion[]> {
        return {
            type: SwapiAction.LOAD_DETAILS_SUCCESS,
            payload: models,
        };
    }
}
