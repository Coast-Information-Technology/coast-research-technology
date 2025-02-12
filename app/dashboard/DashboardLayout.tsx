// components/layouts/DashboardLayout.tsx

import { DashboardNavBar } from '@/components/DashboardNav/DashboardNavBar';
import { MetaData } from '@/components/MetaTags/MetaData';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { DashboardLayoutProps } from '@/lib/type';
import React, { ReactNode } from 'react';

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  description,
}) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <DashboardNavBar />

        {/* Meta Tags */}
        <MetaData title={title} description={description} />

        {/* Page Content */}
        <main className="flex-grow p-4">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
