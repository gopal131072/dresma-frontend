import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const persistConfig = {
    key: 'root',
    storage:storageSession,
    blackList:[]
}

const pReducer = persistReducer(persistConfig,rootReducer);

let store = createStore(pReducer,applyMiddleware(thunk));
let persistor = persistStore(store);

export default  {
    store, persistor
}