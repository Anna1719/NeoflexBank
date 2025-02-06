import { describe, test, expect, vi } from "vitest";
import { isValidApplicationId } from "../isValidApplicationId";
import { store } from "@/store/store";
import { initialState } from "@/store/reducers";

describe("isValidApplicationId", () => {
  test("should redirect if applicationId from store doesn't match ID in URL", () => {
    vi.spyOn(store, "getState").mockReturnValue({
      ...initialState,
      applicationId: 12345,
    });

    const mockLocation = {
      pathname: "/loan/67890",
    };

    global.window = Object.create(window);
    Object.defineProperty(window, "location", {
      value: mockLocation,
      writable: true,
    });

    const mockHref = vi.fn();
    Object.defineProperty(window.location, "href", {
      set: mockHref,
    });

    isValidApplicationId();
    expect(mockHref).toHaveBeenCalledWith("/");
  });

  test("should not redirect if applicationId from store matches ID in URL", () => {
    vi.spyOn(store, "getState").mockReturnValue({
      ...initialState,
      applicationId: 12345,
    });

    const mockLocation = {
      pathname: "/loan/12345",
    };

    global.window = Object.create(window);
    Object.defineProperty(window, "location", {
      value: mockLocation,
      writable: true,
    });

    const mockHref = vi.fn();
    Object.defineProperty(window.location, "href", {
      set: mockHref,
    });

    isValidApplicationId();
    expect(mockHref).not.toHaveBeenCalled();
  });

  test("should redirect if applicationId from store is null", () => {
    vi.spyOn(store, "getState").mockReturnValue({
      ...initialState,
      applicationId: null,
    });

    const mockLocation = {
      pathname: "/loan/12345",
    };

    global.window = Object.create(window);
    Object.defineProperty(window, "location", {
      value: mockLocation,
      writable: true,
    });
    const mockHref = vi.fn();
    Object.defineProperty(window.location, "href", {
      set: mockHref,
    });
    isValidApplicationId();
    expect(mockHref).toHaveBeenCalledWith("/");
  });
});
