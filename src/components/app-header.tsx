import React from "react";
import { SidebarTrigger } from "./ui/sidebar";

const AppHeader = () => {
  return (
    <header className="h-14  flex items-center gap-0 shrink-0 bg-background">
      <SidebarTrigger className="hidden md:flex" />
    </header>
  );
};

export default AppHeader;
