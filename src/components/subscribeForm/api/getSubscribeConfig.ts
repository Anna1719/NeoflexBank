import { AxiosRequestConfig } from "axios";

export interface SubscribeRequest {
  email: string;
}

export interface SubscribeResponse {
  message: string;
}

export const getSubscribeConfig = (email: string): AxiosRequestConfig => ({
  method: "POST",
  url: "/email",
  data: { email } as SubscribeRequest,
});
