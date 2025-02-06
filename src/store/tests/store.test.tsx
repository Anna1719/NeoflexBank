import { describe, test, beforeEach, vi, expect } from "vitest";
import { legacy_createStore as createStore } from "redux";
import { loanReducer, initialState } from "../reducers";
import { clearStore} from "../store";
import { setApplicationId } from "../actions";

describe("Redux Store", () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation((key, value) => {
      localStorage.setItem(key, value);
    });
    vi.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      return localStorage.getItem(key);
    });
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should initialize with the correct state", () => {
    const testStore = createStore(loanReducer, initialState);
    expect(testStore.getState()).toEqual(initialState);
  });

  test("should reset state when clearStore is called", () => {
    const testStore = createStore(loanReducer, initialState);

    testStore.dispatch({
      type: "SET_APPLICATION_ID",
      payload: 1111,
    });

    expect(testStore.getState()).not.toEqual(initialState);

    clearStore(testStore);

    expect(testStore.getState()).toEqual(initialState);
  });

  test("should handle dispatching actions", () => {
    const testStore = createStore(loanReducer, initialState);

    const dispatchSpy = vi.spyOn(testStore, "dispatch");

    testStore.dispatch(setApplicationId(5555));

    expect(dispatchSpy).toHaveBeenCalledWith({
      type: "SET_APPLICATION_ID",
      payload: 5555,
    });

    expect(testStore.getState().applicationId).toBe(5555);
  });
});
