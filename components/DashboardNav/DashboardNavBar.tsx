'use client';

import { Avatar } from '@heroui/react';
import { Menu } from 'lucide-react'; // You can use any icon
import './DashboardNavBar.css';

interface DashboardNavBarProps {
  onToggleSidebar: () => void;
}

export const DashboardNavBar = ({ onToggleSidebar }: DashboardNavBarProps) => {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      {/* Collapse icon - only shows on small screens */}
      <button
        onClick={onToggleSidebar}
        className="md:hidden text-gray-700 hover:text-black"
      >
        <Menu size={24} />
      </button>

      <div className="text-lg font-semibold hidden md:block">Dashboard</div>

      <Avatar className="rounded-full border cursor-pointer" size="sm" />
    </header>
  );
};
