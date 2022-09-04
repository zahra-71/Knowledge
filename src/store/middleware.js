import { asyncStart, asyncEnd } from "./reducers/asyncReducer"
import agent from "./agent";
import { removeUserLocal, setUserLocal } from "../storage/Storage";

const promiseMiddleware = store => next => action => {
    // console.log("promiseMiddleware", action.payload)
    if (isPromise(action.payload)) {
      store.dispatch(asyncStart({subtype : action.type}) );
    
      // const currentView = store.getState().common.viewChangeCounter;  
      // const skipTracking = action.payload;
      // console.log(skipTracking)
  
      action.payload.then(
        res => {
          // const currentState = store.getState()
          // if (!skipTracking && currentState.common.viewChangeCounter !== currentView) {
          //   return
          // }
          console.log('RESULT', res);
          action.payload = res;
          store.dispatch(asyncEnd({promise :  action.payload}));
          store.dispatch(action);
        },
        error => {
          // const currentState = store.getState()
          // if (!skipTracking && currentState.common.viewChangeCounter !== currentView) {
          //   return
          // }
          console.log('ERROR', error);
          action.error = true;
          action.payload = error.response.body;
          if (!action.skipTracking) {
            store.dispatch(asyncEnd(), {promise : action.payload });
          }
          store.dispatch(action);
        }
      );
  
      
    }
  
    return next(action);
  };

  const localStorageMiddleware = store => next => action => {
    // console.log("localstorage middleware",action.type)
    if (action.type === "auth/login" || action.type === "auth/register") {
      if (!action.error) {
        const authState = store.getState();
        console.log(authState)
       setUserLocal(action.payload.user.token, action.payload.user.username)
        agent.setToken(action.payload.user.token)
      }
    }else if (action.type === "common/logOut") {
      removeUserLocal('token')
      removeUserLocal('user')
      agent.setToken("")
    }
    return  next(action)
  }

  function isPromise(v) {
    return v && typeof v.then === 'function';
  }
  
  
  export { promiseMiddleware, localStorageMiddleware }