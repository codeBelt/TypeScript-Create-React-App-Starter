import ErrorAction from '../errors/ErrorAction';
import {all, call, put, select} from 'redux-saga/effects';
import SwapiService from './SwapiService';
import ICategoriesResponse from './models/ICategoriesResponse';
import SwapiAction from './SwapiAction';
import IAction from '../IAction';
import IDetailsRequest from './models/IDetailsRequest';
import CategoryResponseModel, {SwapiModelUnion} from './models/CategoryResponseModel';
import ICategoryRequest from './models/ICategoryRequest';
import IStore from '../IStore';
import SwapiUtility from '../../utilities/SwapiUtility';
import ISwapiReducerState from './models/ISwapiReducerState';
import INeededCategoryIds from './models/INeededCategoryIds';

export default class SwapiSaga {

    public static* loadCategories() {
        try {
            const responseModel: ICategoriesResponse = yield call(SwapiService.loadCategories);

            yield put(SwapiAction.loadCategoriesSuccess(responseModel));
        } catch (error) {
            yield put(ErrorAction.requestFailure(error, 'SwapiSaga.loadCategories'));
        }
    }

    public static* loadCategory(action: IAction<ICategoryRequest>) {
        const {category, apiEndpoint} = action.payload;

        try {
            const responseModel: CategoryResponseModel<SwapiModelUnion> = yield call(SwapiService.loadCategory, apiEndpoint, category);

            yield put(SwapiAction.loadCategorySuccess(responseModel));
        } catch (error) {
            yield put(ErrorAction.requestFailure(error, 'SwapiSaga.loadCategory'));
        }
    }

    // TODO: clean up
    public static* loadDetails(action: IAction<IDetailsRequest>) {
        const {itemId, category} = action.payload;
        const swapiReducer: ISwapiReducerState = yield select(((state: IStore) => state.swapiReducer));
        const model: SwapiModelUnion = swapiReducer[category].entity.entities[itemId];

        const categoryIdsRequest: INeededCategoryIds = SwapiUtility.getCategoryIdsForDetails(model, swapiReducer);
        const detailsRequests: IDetailsRequest[] = SwapiUtility.getDetailRequests(categoryIdsRequest);

        try {
            const models: SwapiModelUnion[] = yield all(
                detailsRequests.map((detailsRequest: IDetailsRequest) => call(SwapiService.loadDetails, detailsRequest))
            );

            yield put(SwapiAction.loadDetailsSuccess(models));
        } catch (error) {
            yield put(ErrorAction.requestFailure(error, 'SwapiSaga.loadDetails'));
        }
    }

}
