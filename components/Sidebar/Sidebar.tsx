'use client';

import { sidebar } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export const Sidebar = () => {
  const pathname = usePathname(); // Get the current path

  return (
    <aside className="w-[12rem] bg-gray-200 text-primary-text-color flex-shrink-0 h-[100vh]">
      <div>
        <Image
          src="/coastresearch.svg"
          alt="Coast Research Technology Brand Logo"
          width={160}
          height={160}
          className="p-2"
        />
      </div>
      <div className="mt-8 transition-none">
        {sidebar.map((sidebarItems) => {
          const isActive = pathname === sidebarItems.path; // Check if the path is active
          return (
            <Link
              href={sidebarItems.path}
              key={sidebarItems.id}
              className={`flex items-center text-[14px] gap-2 px-6 py-2 ml-4 mb-1 hover:bg-[#3e114e] hover:text-white hover:rounded-l-[30px] transition-none ${
                isActive ? 'bg-[#3e114e] text-white rounded-l-[30px]' : ''
              }`}
            >
              <sidebarItems.icon className="transition-none" size={14} />
              <span>{sidebarItems.title}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};
