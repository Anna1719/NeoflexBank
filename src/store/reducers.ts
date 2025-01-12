import { LoanState, LoanAction } from "./types";

export const initialState: LoanState = {
  applicationId: null,
  offers: [],
  currentStep: 1,
  applicationData: {
    1: { status: "isActive" },
    2: { status: "isNotOpen" },
    3: { status: "isNotOpen" },
    4: { status: "isNotOpen" },
    5: { status: "isNotOpen" },
    6: { status: "isNotOpen" },
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

    default:
      return state;
  }
};
