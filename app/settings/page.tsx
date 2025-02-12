// pages/settings.tsx
'use client';

import DashboardLayout from '@/app/dashboard/DashboardLayout';

const page = () => {
  return (
    <DashboardLayout
      title="Settings - Dashboard"
      description="Adjust your application settings"
    >
      <h1 className="text-2xl">Application Settings</h1>
    </DashboardLayout>
  );
};

export default page;
