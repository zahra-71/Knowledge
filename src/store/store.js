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
import articlesListReducer from "./reducers/articlesListReducer";
import authorProfileReducer from "./reducers/authorProfileReducer";
import articleReducer from "./reducers/articleReducer";
import articlesByTagReducer from "./reducers/articlesByTagReducer";

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext ({
  history: createBrowserHistory () 
});

// for combine reducers and display middleware
export const store = configureStore({
  reducer: combineReducers({
    router: routerReducer,
    common: commonReducer,
    home: homeReducer,
    articlesList: articlesListReducer,
    article: articleReducer,
    articlesListByTag: articlesByTagReducer,
    authorProfile: authorProfileReducer,
    auth: authReducer,
    async: asyncReducer
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      logger, 
      routerMiddleware,          /* display chang directory in console */
      promiseMiddleware,         /* display asyncStart and asyncEnd middleware inconsole*/
      localStorageMiddleware,    /* save in localStorage */
    )
})

  export const history = createReduxHistory(store)