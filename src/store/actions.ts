import {
  SetApplicationIdAction,
  SetOffersAction,
  SetCurrentStepAction,
  Offer,
  ResetStoreAction,
  StepStatus,
  SetStepStatusAction,
  LoanState,
} from "./types";

export const setApplicationId = (
  applicationId: number
): SetApplicationIdAction => ({
  type: "SET_APPLICATION_ID",
  payload: applicationId,
});

export const setOffers = (offers: Offer[]): SetOffersAction => ({
  type: "SET_OFFERS",
  payload: offers,
});

export const setCurrentStep = (step: number): SetCurrentStepAction => ({
  type: "SET_CURRENT_STEP",
  payload: step,
});

export const setStepStatus = (
  step: number,
  status: StepStatus
): SetStepStatusAction => ({
  type: "SET_STEP_STATUS",
  payload: { step, status },
});

export const resetStore = (): ResetStoreAction => ({
  type: "RESET_STORE",
});

export interface SyncStateAction {
  type: "SYNC_STATE";
  payload: LoanState;
}

export const syncState = (state: LoanState): SyncStateAction => ({
  type: "SYNC_STATE",
  payload: state,
});
