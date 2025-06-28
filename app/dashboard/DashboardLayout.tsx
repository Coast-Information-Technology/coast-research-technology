// app/dashboard/layout.tsx
'use client';

import { useState } from 'react';
import { DashboardNavBar } from '@/components/DashboardNav/DashboardNavBar';
import { Sidebar } from '@/components/Sidebar/Sidebar';

export default function DashboardLayout({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden transition-all duration-300 ease-in-out">
      <Sidebar isOpen={isSidebarOpen} />

      <div
        className={`flex-1 flex flex-col transform transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'md:ml-[12rem]' : 'md:ml-0'
        }`}
      >
        <DashboardNavBar onToggleSidebar={toggleSidebar} />
        <main className="flex-grow p-4 overflow-y-auto">
          {title && <h1 className="text-2xl font-bold mb-2">{title}</h1>}
          {description && <p className="text-gray-600 mb-4">{description}</p>}
          {children}
        </main>
      </div>
    </div>
  );
}
