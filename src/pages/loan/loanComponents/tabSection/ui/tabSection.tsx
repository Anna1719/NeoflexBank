import { AboutCardTab } from "../components/aboutCardTab";
import { CashbackTab } from "../components/cashbackTab";
import { ConditionsTab } from "../components/conditionsTab";
import style from "./tabSection.module.scss";
import { Tabs } from "@/shared/ui/tabs";
import { useState } from "react";
import { FAQTab } from "../components/FAQTab";

export const TabSection = () => {
  const tabs = [
    {
      id: 1,
      label: "About card",
    },
    {
      id: 2,
      label: "Rates and conditions",
    },
    {
      id: 3,
      label: "Cashback",
    },
    {
      id: 4,
      label: "FAQ",
    },
  ];

  const [tab, setTab] = useState(tabs[0].id);

  const handleTabClick = (id: number) => {
    setTab(id);
  };

  function renderTabContent() {
    switch (tab) {
      case 1: {
        return <AboutCardTab />;
      }
      case 2: {
        return <ConditionsTab />;
      }
      case 3: {
        return <CashbackTab />;
      }
      case 4: {
        return <FAQTab />;
      }
      default: {
        return <AboutCardTab />;
      }
    }
  }

  return (
    <section className={style.tabSection}>
      <Tabs selectedId={tab} tabs={tabs} onClick={handleTabClick}>
        <div className={style.tabSection__content}>{renderTabContent()}</div>
      </Tabs>
    </section>
  );
};
