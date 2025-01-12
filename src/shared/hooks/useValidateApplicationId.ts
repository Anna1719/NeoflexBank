import { LoanState } from "@/store/types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const useValidateApplicationId = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const currentAppId = useSelector((state: LoanState) => state.applicationId);

  useEffect(() => {
    const currentAppIdStr = currentAppId !== null ? String(currentAppId) : "";
    const applicationIdStr = applicationId || "";

    if (currentAppIdStr !== applicationIdStr) {
      navigate("/");
    }
  }, [applicationId, currentAppId, navigate]);
};
