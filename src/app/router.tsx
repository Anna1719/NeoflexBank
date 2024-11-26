import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/home";
import { MainLayout } from "../layouts";
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
    ],
  },
];

export const router = createBrowserRouter(routes);
