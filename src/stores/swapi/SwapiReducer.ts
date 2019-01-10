import ISwapiReducerState from './models/ISwapiReducerState';
import IAction from '../IAction';
import ICategoriesResponse from './models/ICategoriesResponse';
import SwapiAction, {SwapiActionUnion} from './SwapiAction';
import CategoryEnum from '../../constants/CategoryEnum';
import CategoryResponseModel, {SwapiModelUnion} from './models/CategoryResponseModel';
import EntityUtility from '../../utilities/EntityUtility';
import IEntityState from '../../models/IEntityState';
import ICategoryRequest from './models/ICategoryRequest';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';

export default class SwapiReducer {
    private static readonly _initialState: ISwapiReducerState = {
        currentCategory: null,
        isLoadingCategories: false,
        isLoadingCategory: false,
        isLoadingDetails: false,
        categories: null,
        [CategoryEnum.People]: null,
        [CategoryEnum.Planets]: null,
        [CategoryEnum.Starships]: null,
        [CategoryEnum.Vehicles]: null,
        [CategoryEnum.Species]: null,
        [CategoryEnum.Films]: null,
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
                    isLoadingCategories: false,
                    categories: action.payload as ICategoriesResponse,
                };
            case SwapiAction.LOAD_CATEGORY:
                return {
                    ...state,
                    isLoadingCategory: true,
                    currentCategory: (action.payload as ICategoryRequest).category,
                };
            case SwapiAction.LOAD_CATEGORY_SUCCESS:
                const model: CategoryResponseModel<SwapiModelUnion> = action.payload as CategoryResponseModel<SwapiModelUnion> ;
                const currentEntity: IEntityState<SwapiModelUnion> = get(state[model.category], 'entity', null);
                const entity: IEntityState<SwapiModelUnion> = EntityUtility.add(model.results, 'id', currentEntity);

                return {
                    ...state,
                    isLoadingCategory: false,
                    [model.category]: {
                        totalCount: model.count,
                        loadMoreUrl: model.next,
                        entity,
                    },
                };
            case SwapiAction.LOAD_DETAILS:
                return {
                    ...state,
                    isLoadingDetails: true,
                };
            case SwapiAction.LOAD_DETAILS_SUCCESS:
                const models: SwapiModelUnion[] = action.payload as SwapiModelUnion[];
                const group: {[categoryEnum: string]: SwapiModelUnion[]} = groupBy(models, 'category');

                const categoryState: Partial<ISwapiReducerState> = Object.entries(group)
                    .reduce((obj: Partial<ISwapiReducerState>, [category, models]: [any, any]) => {
                        const currentEntity: IEntityState<SwapiModelUnion> = get(state[category], 'entity', null);

                        return {
                            ...obj,
                            [category]: {
                                ...state[category],
                                entity: EntityUtility.add(models, 'id', currentEntity),
                            },
                        }
                    }, {});

                return {
                    ...state,
                    ...categoryState,
                    isLoadingDetails: false,
                };
            default:
                return state;
        }
    }

}
