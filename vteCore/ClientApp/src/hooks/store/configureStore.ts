import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import dmFormReducer from './dmFormSlice'
import { createLogger } from 'redux-logger'
import sessionStorage from 'redux-persist/es/storage/session'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore'
import hardSet from 'redux-persist/es/stateReconciler/hardSet'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

const logger = createLogger()

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: [],
  // hardset can locate the useSelector error if happens in publish
  stateReconciler: hardSet,
}

const rootReducer = combineReducers({
  dmFile: dmFormReducer,
})
const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
})

setupListeners(store.dispatch)

export const persistor = persistStore(store)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {auth: AuthState, form: FormState, weather: WeatherState}
export type AppDispatch = typeof store.dispatch
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
