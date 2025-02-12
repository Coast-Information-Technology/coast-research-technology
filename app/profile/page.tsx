// pages/profile.tsx
'use client';

import DashboardLayout from '@/app/dashboard/DashboardLayout';

const page = () => {
  return (
    <>
      <DashboardLayout
        title="Profile - Dashboard"
        description="Manage your profile settings here"
      >
        <h1 className="text-2xl">Profile Settings</h1>
      </DashboardLayout>
    </>
  );
};

export default page;
