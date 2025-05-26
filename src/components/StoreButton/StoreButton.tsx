import React, { useState } from "react";
import "./StoreButton.scss";
import CustomButton from "../CustomButton/CustomButton";

interface StoreButtonProps {
  activeTabDefault?: string;
}

const tabs = ["Visão geral", "Informações", "Itens", "Avaliações", "Chat"];

const StoreButton: React.FC<StoreButtonProps> = ({ activeTabDefault = "Visão geral" }) => {
  const [activeTab, setActiveTab] = useState(activeTabDefault);

  const handleClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="store-tabs-container">
      <div className="store-tabs-nav">
        {tabs.map((tab) => (
          <div 
            key={tab} 
            className={`tab-item ${activeTab === tab ? 'active' : ''}`}
          >
            <CustomButton
              text={tab}
              onClick={() => handleClick(tab)}
              styles={{
                backgroundColor: 'transparent',
                color: activeTab === tab ? '#000' : '#000',
                fontWeight: activeTab === tab ? '500' : 'normal',
                padding: '12px 0',
                textTransform: 'none',
                borderRadius: 0,
                minWidth: '80px',
                boxShadow: 'none',
                fontSize: '17.5px',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#000',
                  boxShadow: 'none'
                }
              }}
              type="button"
            />
            {activeTab === tab && <div className="active-line"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreButton;
