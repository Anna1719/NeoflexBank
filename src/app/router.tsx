import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "@/pages/home";
import { LoanPage } from "@/pages/loan";
import { MainLayout } from "@/layouts";
import { ROUTES } from "@/utils/routesInfo";
import { ApplicationForm } from "@/pages/application/ui/applicationPage";
import { DocumentPage } from "@/pages/document";

const routes = [
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    children: [
      {
        element: <HomePage />,
        index: true,
      },
      {
        path: ROUTES.CREDIT,
        element: <LoanPage />,
      },
      {
        path: ROUTES.APPLICATION,
        element: <ApplicationForm />,
      },
      {
        path: ROUTES.DOCUMENT,
        element: <DocumentPage />,
      },
      {
        path: ROUTES.SIGN,
        element: <></>,
      },
      {
        path: ROUTES.CODE,
        element: <></>,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
