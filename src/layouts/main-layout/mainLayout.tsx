import { Outlet } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import style from "./mainLayout.module.scss";


export const MainLayout = () => {
  return (
    <div className={style.wrappper}>
      <Header/>
      <div className={style.outlet}>
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};
