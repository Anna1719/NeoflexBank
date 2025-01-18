import { selectorType } from "../general";

export type FormField <T>= {
  id: keyof T;
  req: boolean;
  label: string;
  type: string;
  placeholder?: string;
  options?: selectorType[];
  validation?: Record<string, unknown>;
  order?: number;
  formatter?: (value: string) => string;
};