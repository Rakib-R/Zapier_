import AppHeader from "@/components/app-header";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex items-center p-2 md:hidden">
      <AppHeader />
      <div>{children}</div>
    </main>
  );
};

export default layout;
