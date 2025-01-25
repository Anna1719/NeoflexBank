import { LoanState, LoanAction } from "./types";

export enum StepsInfo {
  Prescoring = 1,
  Offer = 2,
  Scoring = 3,
  Document = 4,
  Sign = 5,
  Code = 6,
}

export const initialState: LoanState = {
  applicationId: null,
  offers: [],
  currentStep: StepsInfo.Prescoring,
  applicationData: {
    [StepsInfo.Prescoring]: { status: "isActive" },
    [StepsInfo.Offer]: { status: "isStepNotActive" },
    [StepsInfo.Scoring]: { status: "isStepNotActive" },
    [StepsInfo.Document]: { status: "isStepNotActive" },
    [StepsInfo.Sign]: { status: "isStepNotActive" },
    [StepsInfo.Code]: { status: "isStepNotActive" },
  },
};

export const loanReducer = (
  state: LoanState = initialState,
  action: LoanAction
): LoanState => {
  switch (action.type) {
    case "RESET_STORE":
      return initialState;

    case "SET_APPLICATION_ID":
      return { ...state, applicationId: action.payload };

    case "SET_OFFERS":
      return { ...state, offers: action.payload };

    case "SET_CURRENT_STEP":
      return { ...state, currentStep: action.payload };

    case "SET_STEP_STATUS": {
      const { step, status } = action.payload;
      return {
        ...state,
        applicationData: {
          ...state.applicationData,
          [step]: status,
        },
      };
    }
    case "SYNC_STATE":
      return { ...action.payload };

    default:
      return state;
  }
};
