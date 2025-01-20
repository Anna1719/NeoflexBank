import { PaymentSchedule } from "@/shared/hooks/useApplicationData";

 export const documentTableColumns: { key: keyof PaymentSchedule; label: string }[] = [
    { key: "number", label: "NUMBER" },
    { key: "date", label: "DATE" },
    { key: "totalPayment", label: "TOTAL PAYMENT" },
    { key: "interestPayment", label: "INTEREST PAYMENT" },
    { key: "debtPayment", label: "DEBT PAYMENT" },
    { key: "remainingDebt", label: "REMAINING DEBT" },
  ];