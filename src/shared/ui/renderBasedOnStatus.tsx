import { LoanState } from "@/store/types";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Loader } from "./loader";
import { SuccessMessage } from "./successMessage";
import { SuccessMessageText } from "@/utils/successMessageText";
import { NotFound } from "@/pages/notFound";
import { ErrorMessage } from "./errorMessage";

type TProps = {
  loading: boolean;
  step: number;
  error?: Error | boolean | null ;
};

export const RenderBasedOnStatus = ({ loading, step, error = null, children }: TProps & { children: ReactNode }) => {
  const stepStatus = useSelector(
    (state: LoanState) => state.applicationData[step]?.status
  );

  if (loading) return <Loader />;

  if (step === 1) return <>{children}</>;

  if (stepStatus === "isSent") {
    const message = SuccessMessageText.find((item) => item.step === step);
    const title = message?.title || "Title";
    const subtitle = message?.subtitle || "Subtitle";
    const additionalProps = {
      border: step === 2,
      final: step === 6,
    };

    return (
      <SuccessMessage
        title={title}
        subtitle={subtitle}
        {...additionalProps}
      />
    );
  }

  if (step >= 3 && step <= 6 && stepStatus === "isStepNotActive") {
    return <NotFound />;
  }

  if(error) return <ErrorMessage/>

  return <>{children}</>;
};
