export enum ROUTES {
  HOME = "/",
  CREDIT = "loan",
  PRODUCT = "/product",
  ACCOUNT = "/account",
  RESOURSES = "/resourses",
  APPLICATION = ":applicationId",
  DOCUMENT = ":applicationId/document",
  SIGN = ":applicationId/document/sign",
  CODE = ":applicationId/code"
}
export type stepRouting = {
  step: number;
  route: string;
};
export const stepsRouting: stepRouting[] = [
  { step: 3, route: "" },
  { step: 4, route: "/document" },
  { step: 5, route: "/document/sign" },
  { step: 6, route: "/code" },
];

export const getRouteByStep = (step: number): string => {
  const route = stepsRouting.find((entry) => entry.step === step)?.route;
  return route || "";
};
