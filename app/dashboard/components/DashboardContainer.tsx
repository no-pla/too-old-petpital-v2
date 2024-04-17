import React from "react";

const DashboardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute top-0 left-0 z-20 w-full last:absolute last:top-0 last:left-0">
      {children}
    </div>
  );
};

export default DashboardContainer;
