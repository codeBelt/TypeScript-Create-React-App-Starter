import {all, fork, ForkEffect, takeEvery, takeLatest} from 'redux-saga/effects';
import ContentSaga from './content/ContentSaga';
import SwapiSaga from './swapi/SwapiSaga';
import SwapiAction from './swapi/SwapiAction';

export default function* rootSaga() {
    const sagas: ForkEffect[] = [
        fork(ContentSaga.loadContent),
        takeLatest(SwapiAction.LOAD_CATEGORIES, SwapiSaga.loadCategories),
        takeLatest(SwapiAction.LOAD_DETAILS, SwapiSaga.loadDetails),
        takeEvery(SwapiAction.LOAD_CATEGORY, SwapiSaga.loadCategory),
    ];

    yield all(sagas);
}
