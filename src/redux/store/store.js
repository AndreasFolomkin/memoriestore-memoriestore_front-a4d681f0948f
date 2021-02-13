import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import rootSaga from "../sagas/index";
import createSagaMiddleware from "redux-saga";
import { loadState, saveState } from "./localStorage";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const persistedState = loadState();
const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
store.subscribe(() => {
  saveState(store.getState());
});
sagaMiddleware.run(rootSaga);

export default store;
