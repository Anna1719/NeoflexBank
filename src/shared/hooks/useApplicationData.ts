import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "@/shared/hooks/axiosInstance";
import { LoanState } from "@/store/types";

export type PaymentSchedule = {
  number: number;
  date: string;
  totalPayment: number;
  interestPayment: number;
  debtPayment: number;
  remainingDebt: number;
};

type Credit = {
  paymentSchedule: Array<PaymentSchedule> | null;
};

type ApplicationData = {
  id: number;
  credit: Credit | null;
};

export const useApplicationData = () => {
  const currentAppId = useSelector((state: LoanState) => state.applicationId);

  const [data, setData] = useState<ApplicationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!currentAppId) {
      setData(null);
      setError(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get<ApplicationData>(
          `/admin/application/${currentAppId}`
        );
        setData(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentAppId]);

  const getPaymentSchedule = (): Credit["paymentSchedule"] => {
    return data?.credit?.paymentSchedule || [];
  };

  return { loading, error, getPaymentSchedule };
};
