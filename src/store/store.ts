import { legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { loanReducer } from "./reducers";
import { LoanState } from "./types";
import { resetStore } from "./actions";

const loadState = (): LoanState | undefined => {
  try {
    const serializedState = localStorage.getItem("loanState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch {
    return undefined;
  }
};

const saveState = (state: LoanState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("loanState", serializedState);
  } catch {
    new Error("Unknown error occurred");
  }
};

const persistedState = loadState();

export const store = createStore(
  loanReducer,
  persistedState,
  composeWithDevTools()
);

export type AppDispatch = typeof store.dispatch;

store.subscribe(() => saveState(store.getState()));

export const clearStore = () => {
  store.dispatch(resetStore());
};
