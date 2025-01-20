import { store } from "@/store/store";

export const isValidApplicationId = (): void => {
   const currentAppId = store.getState().applicationId;
   const pathname = window.location.pathname;
   const match = pathname.match(/\/loan\/([^/]+)/);
   const applicationId = match ? match[1] : ""; 
 
   const currentAppIdStr = currentAppId !== null ? String(currentAppId) : "";
   const applicationIdStr = applicationId || "";
 
   if (currentAppIdStr !== applicationIdStr && applicationIdStr) {
     window.location.href = "/";
   }
};