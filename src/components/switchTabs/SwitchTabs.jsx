import React, { useState } from "react";

import "./style.scss";

const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0); // for moving that selected color between daily,weekly,etc

  // Lemme clear the things, if we want to set activeTab from Day to Week, like we need to move that tab, so we have given width to `tabItem` and `movingBg` as 100px and we know index will be    0,1,... for Day,Week,...etc via "map" method, we move left of `position:absolute` by setting left: 2*100 or index*100

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab, index);
  };

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tab, index) => (
          <span
            key={index}
            className={`tabItem ${selectedTab === index ? "active" : ""}`}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}

        {/* already position:left defined in movingBg, with left:left (of useState) */}
        <span className="movingBg" style={{ left }} />
      </div>
    </div>
  );
};

export default SwitchTabs;
