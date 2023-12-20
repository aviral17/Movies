import React from "react";

import "./style.scss";

// We are wrapping components in this, using this like Higher Order Component (HOC), so to keep other elements at Center

const ContentWrapper = ({ children }) => {
  return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;
