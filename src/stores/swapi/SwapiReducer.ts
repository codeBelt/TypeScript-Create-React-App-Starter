import ISwapiReducerState from './models/ISwapiReducerState';
import IAction from '../IAction';
import ICategoriesResponse from './models/ICategoriesResponse';
import SwapiAction, {SwapiActionUnion} from './SwapiAction';
import SwapiEnum from '../../constants/SwapiEnum';
import CategoryResponseModel, {SwapiModelUnion} from './models/CategoryResponseModel';

export default class SwapiReducer {
    private static readonly _initialState: ISwapiReducerState = {
        currentCategory: null,
        isLoadingCategories: false,
        categories: null,
        [SwapiEnum.People]: null,
        [SwapiEnum.Planets]: null,
        [SwapiEnum.Starships]: null,
        [SwapiEnum.Vehicles]: null,
        [SwapiEnum.Species]: null,
        [SwapiEnum.Films]: null,
    };

    public static reducer(state: ISwapiReducerState = SwapiReducer._initialState, action: IAction<SwapiActionUnion>): ISwapiReducerState {
        switch (action.type) {
            case SwapiAction.LOAD_CATEGORIES:
                return {
                    ...state,
                    isLoadingCategories: true,
                };
            case SwapiAction.LOAD_CATEGORIES_SUCCESS:
                return {
                    ...state,
                    isLoadingCategories: true,
                    categories: action.payload as ICategoriesResponse,
                };
            case SwapiAction.LOAD_CATEGORY:
                return {
                    ...state,
                    currentCategory: action.payload as SwapiEnum,
                };
            case SwapiAction.LOAD_CATEGORY_SUCCESS:
                const categoryId: SwapiEnum = action.meta;
                const model: CategoryResponseModel<SwapiModelUnion> = action.payload as any;

                return {
                    ...state,
                    [categoryId]: model,
                };
            default:
                return state;
        }
    }

}
