export interface StepStatus {
  status: 'isStepNotActive' | 'isActive' | 'isSent';
}

export interface LoanState {
  applicationId: number | null;
  offers: Offer[];
  currentStep: number;
  applicationData: {
    [step: number]: StepStatus;
  }
}

export interface Offer {
  applicationId: number;
  requestedAmount: number;
  totalAmount: number;
  term: number;
  monthlyPayment: number;
  rate: number;
  isInsuranceEnabled: boolean;
  isSalaryClient: boolean;
}

export interface SetApplicationIdAction {
  type: "SET_APPLICATION_ID";
  payload: number;
}

export interface SetOffersAction {
  type: "SET_OFFERS";
  payload: Offer[];
}

export interface SetCurrentStepAction {
  type: "SET_CURRENT_STEP";
  payload: number;
}

export interface SetStepStatusAction {
  type: "SET_STEP_STATUS";
  payload: { step: number; status: StepStatus };
}

export interface ResetStoreAction {
  type: "RESET_STORE";
}

export interface SyncStateAction {
  type: "SYNC_STATE";
  payload: LoanState;
}

export type LoanAction =
  | SetApplicationIdAction
  | SetOffersAction
  | SetCurrentStepAction
  | SetStepStatusAction
  | ResetStoreAction
  | SyncStateAction;
