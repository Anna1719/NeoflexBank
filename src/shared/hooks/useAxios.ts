import { useState, useEffect } from "react";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "./axiosInstance";

interface UseAxiosState<T> {
  loading: boolean;
  error: Error | null;
  data: T | null;
  success: boolean;
}

export const useAxios = <T>(
  axiosConfig: AxiosRequestConfig | null
): UseAxiosState<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!axiosConfig) return;

    setLoading(true);
    setError(null);
    setData(null);
    setSuccess(false);

    const fetchData = async () => {
      try {
        const response = await axiosInstance(axiosConfig);
        setData(response.data as T);
        setSuccess(true);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err : new Error("Unknown error occurred")
        );
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosConfig]);

  return { loading, error, data, success };
};
