import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger'
import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";
import { combineReducers } from "redux";

// components
import authReducer from "./reducers/authReducer";
import asyncReducer from "./reducers/asyncReducer";
import homeReducer from "./reducers/homeReducer";
import commonReducer from "./reducers/commonReducer"
import { localStorageMiddleware, promiseMiddleware } from "./middleware";

const {createReduxHistory,
routerMiddleware,
routerReducer
} = createReduxHistoryContext ({
    history: createBrowserHistory () });

    export const store = configureStore({
        reducer: combineReducers({
            router: routerReducer,
            common: commonReducer,
            home: homeReducer,
            auth: authReducer,
            async: asyncReducer
        }),
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            logger,
            routerMiddleware,
            promiseMiddleware,
            localStorageMiddleware,
        )
    })

    export const history = createReduxHistory(store)