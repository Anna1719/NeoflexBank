import { describe, test, expect } from "vitest";
import { loanReducer, initialState } from "../reducers";
import { LoanAction, Offer, StepStatus } from "../types";

describe("loanReducer", () => {
  test("should handle SET_APPLICATION_ID action", () => {
    const action: LoanAction = { type: "SET_APPLICATION_ID", payload: 12345 };
    const newState = loanReducer(initialState, action);
    expect(newState.applicationId).toBe(12345);
  });

  test("should handle SET_OFFERS action", () => {
    const offer: Offer = {
      applicationId: 555,
      requestedAmount: 160000,
      totalAmount: 160000,
      term: 12,
      monthlyPayment: 55555,
      rate: 555,
      isInsuranceEnabled: false,
      isSalaryClient: false,
    };
    const action: LoanAction = { type: "SET_OFFERS", payload: [offer] };
    const newState = loanReducer(initialState, action);
    expect(newState.offers[0]).toEqual(offer);
  });

  test("should handle SET_CURRENT_STEP action", () => {
    const action: LoanAction = { type: "SET_CURRENT_STEP", payload: 2 };
    const newState = loanReducer(initialState, action);
    expect(newState.currentStep).toBe(2);
  });

  test("should handle SET_STEP_STATUS action", () => {
    const step = 'isActive' as unknown as StepStatus;
    const action: LoanAction = {
      type: "SET_STEP_STATUS",
      payload: { step: 1, status: step  },
    };
    const newState = loanReducer(initialState, action);
    expect(newState.applicationData[1]).toBe(step);
  });

  test("should handle RESET_STORE action", () => {
    const modifiedState = {
      ...initialState,
      applicationId: 12345,
    };
    const resetAction: LoanAction = { type: "RESET_STORE" };
    const newState = loanReducer(modifiedState, resetAction);
    expect(newState).toEqual(initialState);
  });
});
