import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'

import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'
import reducer from './reducers'

const middleware = [thunk]

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    keyPrefix: '',
    whitelist: ['app']
}

const pReducer = persistReducer(persistConfig, reducer)

export const store = createStore(pReducer, applyMiddleware(...middleware))
export const persistor = persistStore(store)