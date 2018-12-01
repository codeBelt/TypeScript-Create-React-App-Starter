import {combineReducers, Reducer, ReducersMapObject} from 'redux';
import {connectRouter} from 'connected-react-router';
import MetaReducer from './meta/MetaReducer';
import ContentReducer from './content/ContentReducer';
import ErrorReducer from './errors/ErrorReducer';
import ModalReducer from './modal/ModalReducer';
import IStore from './IStore';
import {History} from 'history';

export default (history: History): Reducer<IStore> => {
    const reducerMap: ReducersMapObject = {
        contentReducer: ContentReducer.reducer,
        errorReducer: ErrorReducer.reducer,
        metaReducer: MetaReducer.reducer,
        modalReducer: ModalReducer.reducer,
        router: connectRouter(history),
    };

    return combineReducers(reducerMap);
};
