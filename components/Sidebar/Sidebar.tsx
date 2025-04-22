'use client';

import { sidebar } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const pathname = usePathname(); // Get the current path

  return (
    <aside
      className={`${
        isOpen ? 'block' : 'hidden'
      } md:flex w-[12rem] bg-gray-200 text-primary-text-color flex-shrink-0 h-screen transform transition-transform duration-300 ease-in-out`}
    >
      <div>
        <Image
          src="/coastresearch.svg"
          alt="Coast Research Technology Brand Logo"
          width={250}
          height={250}
          className=""
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
