import { Avatar } from "@heroui/react";
import './DashboardNavBar.css';

export const DashboardNavBar = () => {
  return (
    <header className="flex items-center justify-between px-4">
      <div className="text-lg">Navbar</div>
      <Avatar className="rounded-full border cursor-pointer" size="sm" />
    </header>
  );
};
