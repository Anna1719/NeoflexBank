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
import { ButtonMain } from "@/shared/ui/buttonMain";
import { Checkbox } from "@/shared/ui/checkbox";
import { sortData } from "@/utils/sortData";
import { setCurrentStep, setStepStatus } from "@/store/actions";
import { AppDispatch, clearStore } from "@/store/store";
import { RenderBasedOnStatus } from "@/shared/ui/renderBasedOnStatus";
import { documentTableColumns } from "@/utils/tableColumnNames";

export const DocumentPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDenied, setIsDenied] = useState(false);
  const [axiosConfig, setAxiosConfig] = useState<AxiosRequestConfig | null>(
    null
  );

  const navigate = useNavigate();

  const currentAppId = useSelector((state: LoanState) => state.applicationId);

  const { getPaymentSchedule } = useApplicationData();
  const paymentSchedule = useMemo(
    () => getPaymentSchedule() || [],
    [getPaymentSchedule]
  );

  const { loading: sending, success, error } = useAxios(axiosConfig);

  const dispatch = useDispatch<AppDispatch>();

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

  const handleDenyConfirm = () => {
    setAxiosConfig({
      method: "POST",
      url: `/application/${currentAppId}/deny`,
    });
    setIsDenied(true);
  };

  const handleGoHome = () => {
    clearStore();
    navigate("/");
  };

  useEffect(() => {
    if (success && !isDenied) {
      dispatch(setCurrentStep(5));
      dispatch(setStepStatus(4, { status: "isSent" }));
      dispatch(setStepStatus(5, { status: "isActive" }));
    }
  }, [success, dispatch, isDenied, paymentSchedule]);

  return (
    <RenderBasedOnStatus
      loading={sending}
      step={4}
      error={error || paymentSchedule.length===0}
    >
      <section className={style.documentPage}>
        <div className={style.documentPage__top}>
          <h2 className={style.documentPage__title}>Payment Schedule</h2>
          <p className={style.documentPage__subtitle}>Step 3 of 5</p>
        </div>
        <Table
          data={sortedData}
          columns={documentTableColumns}
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
            denied={isDenied}
            isOpen={isModalOpen}
            onGoHome={handleGoHome}
            onDenyConfirm={handleDenyConfirm}
            onClose={() => setModalOpen(false)}
          />
        )}
      </section>
    </RenderBasedOnStatus>
  );
};
