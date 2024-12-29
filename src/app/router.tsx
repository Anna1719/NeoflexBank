import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "@/pages/home";
import { LoanPage } from "@/pages/loan";
import { MainLayout } from "@/layouts";
import { ROUTES } from "./routes";

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
        element: <LoanPage />
      }
    ],
  },
];

export const router = createBrowserRouter(routes);
