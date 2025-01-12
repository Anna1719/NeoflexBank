import { useEffect, useMemo, useState } from "react";
import {
  PaymentSchedule,
  useApplicationData,
} from "@/shared/hooks/useApplicationData";
import { Table } from "@/shared/ui/table";
import style from "./documentPage.module.scss";
import { useAxios } from "@/shared/hooks/useAxios";
import { AxiosRequestConfig } from "axios";
import { Modal } from "@/components/modal";
import { useNavigate } from "react-router";
import { LoanState } from "@/store/types";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "@/shared/ui/loader";
import { SuccessMessage } from "@/shared/ui/successMessage";
import { ButtonMain } from "@/shared/ui/buttonMain";
import { Checkbox } from "@/shared/ui/checkbox";
import { sortData } from "@/utils/sortData";
import { setCurrentStep, setStepStatus } from "@/store/actions";
import { AppDispatch } from "@/store/store";

export const DocumentPage = () => {
  const navigate = useNavigate();

  const currentAppId = useSelector((state: LoanState) => state.applicationId);
  const stepStatus = useSelector(
    (state: LoanState) => state.applicationData[4]?.status
  );

  const { getPaymentSchedule } = useApplicationData();
  const paymentSchedule = useMemo(
    () => getPaymentSchedule() || [],
    [getPaymentSchedule]
  );

  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [axiosConfig, setAxiosConfig] = useState<AxiosRequestConfig | null>(
    null
  );

  const { loading: sending, success } = useAxios(axiosConfig);

  const dispatch = useDispatch<AppDispatch>();

  const columns: { key: keyof PaymentSchedule; label: string }[] = [
    { key: "number", label: "NUMBER" },
    { key: "date", label: "DATE" },
    { key: "totalPayment", label: "TOTAL PAYMENT" },
    { key: "interestPayment", label: "INTEREST PAYMENT" },
    { key: "debtPayment", label: "DEBT PAYMENT" },
    { key: "remainingDebt", label: "REMAINING DEBT" },
  ];

  const [sortBy, setSortBy] = useState<{
    key: keyof PaymentSchedule;
    direction: "asc" | "desc";
  }>({
    key: "number",
    direction: "asc",
  });

  const handleSort = (
    key: keyof PaymentSchedule,
    direction: "asc" | "desc"
  ) => {
    setSortBy({ key, direction });
  };

  const sortedData = useMemo(() => {
    return sortData(paymentSchedule, sortBy.key, sortBy.direction);
  }, [paymentSchedule, sortBy]);

  const handleSend = () => {
    setAxiosConfig({ method: "POST", url: `/document/${currentAppId}` });
  };

  const handleDeny = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    if (success) {
      dispatch(setCurrentStep(5));
      dispatch(setStepStatus(4, { status: "isSent" }));
      dispatch(setStepStatus(5, { status: "isActive" }));
    }
  }, [success, dispatch]);

  if (sending) {
    return (
      <div className={style.documentPage}>
        <div className={style.documentPage__loaderCenter}>
          <Loader />
        </div>
      </div>
    );
  }

  return stepStatus === "isSent" ? (
    <SuccessMessage
      title="Documents are formed"
      subtitle="Documents for signing have been sent to your email"
    />
  ) : (
    <div className={style.documentPage}>
      <div className={style.documentPage__top}>
        <h2 className={style.documentPage__title}>Payment Schedule</h2>
        <p className={style.documentPage__subtitle}>Step 3 of 5</p>
      </div>
      <Table
        data={sortedData}
        columns={columns}
        onSort={handleSort}
        sortBy={sortBy}
      />
      <div className={style.documentPage__actions}>
        <ButtonMain
          radius={8}
          height={40}
          width={96}
          color="red"
          onClick={handleDeny}
        >
          Deny
        </ButtonMain>
        <div className={style.documentPage__agreementWrapper}>
          <Checkbox
            id="paymentAgree"
            label="I agree with the payment schedule"
            checked={isChecked}
            onChange={setIsChecked}
          />
          <ButtonMain
            radius={8}
            height={40}
            width={96}
            disabled={!isChecked || sending}
            onClick={handleSend}
          >
            Send
          </ButtonMain>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onGoHome={() => navigate("/")}
          onDenyConfirm={() => {}}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};
