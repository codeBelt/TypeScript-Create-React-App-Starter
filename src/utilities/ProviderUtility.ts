import {createStore, applyMiddleware, Middleware} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import {History} from 'history';
import rootReducer from '../stores/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction';
import createSagaMiddleware, {END, SagaMiddleware} from 'redux-saga';
import rootSaga from '../stores/rootSaga';
import IStore from '../stores/IStore';
import ISagaStore from '../stores/ISagaStore';
import reduxFreeze from "redux-freeze";
import environment from 'environment';

export default class ProviderUtility {

    public static createProviderStore(initialState: Partial<IStore> = {}, history: History = null, isServerSide: boolean = false): ISagaStore {

        const sagaMiddleware: SagaMiddleware<any> = createSagaMiddleware();

        const middleware: Middleware[] = [
            environment.isDevelopment ? reduxFreeze : null,
            routerMiddleware(history),
            sagaMiddleware,
        ].filter(Boolean);

        const store: any = createStore(
            rootReducer(history),
            initialState,
            composeWithDevTools(
                applyMiddleware(...middleware),
            ),
        );

        if (isServerSide) {
            // TODO: figure out how to do SSR or use https://github.com/codeBelt/typescript-hapi-react-hot-loader-example
            store.runSaga = sagaMiddleware.run;
            store.endSaga = () => store.dispatch(END);
        } else {
            sagaMiddleware.run(rootSaga);
        }

        return store;
    }

}
