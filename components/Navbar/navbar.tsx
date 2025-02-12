/** @format */

'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import './navbar.css';
import { disableNavWithFooter } from '@/utils/disableNavWithFooter';
import { usePathname } from 'next/navigation';

// Define the type for navigation links
interface NavLinkData {
  href: string;
  label: string;
  submenu?: NavLinkData[]; // Optional submenu for dropdowns
}

// Define the data for the navigation links, including submenus
const navLinks: NavLinkData[] = [
  { href: '/', label: 'Home' },
  {
    href: '/training',
    label: 'Training',
    submenu: [
      { href: '/training/courses', label: 'Courses' },
      { href: 'javascript:void(0)', label: 'Admission' },
    ],
  },
  {
    href: '',
    label: 'About Us',
    submenu: [
      { href: '/about-us/our-vision', label: 'Our Vision' },
      { href: '/about-us/our-mission', label: 'Our Mission' },
    ],
  },
  { href: '/contact', label: 'Contact Us' },
  { href: '/services', label: 'Services' },
  { href: '/career', label: 'Career' },
  { href: '/coast-craft', label: 'Coast Craft' },
];

// Component for individual navigation links or dropdown triggers
const NavLink: React.FC<{ link: NavLinkData }> = ({ link }) => {
  if (link.submenu) {
    return (
      <div className="relative group">
        <Link
          href={link.href}
          className="flex items-center gap-1 text-black hover:text-gray-700"
        >
          {link.label} <FaCaretDown className="ml-1" />
        </Link>
        <div className="absolute left-0 mt-2 w-48 bg-[#610083] text-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-[10]">
          {link.submenu.map((sublink, index) => (
            <Link
              key={index}
              href={sublink.href}
              className="block px-4 py-2 hover:bg-white hover:text-[#610083] z-50"
            >
              {sublink.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Link href={link.href} className="text-black hover:text-gray-700">
      {link.label}
    </Link>
  );
};

export const Navbar: React.FC = () => {
  const [animationParent] = useAutoAnimate();
  const path = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  const renderedNavLinks = useMemo(
    () =>
      navLinks.map((link, index) => (
        <li key={index} role="listitem">
          <NavLink link={link} />
        </li>
      )),
    []
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';
    if (isDark) {
      document.body.classList.add('dark');
    }
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    document.body.classList.toggle('dark');
    const currentTheme = document.body.classList.contains('dark')
      ? 'dark'
      : 'light';
    localStorage.setItem('theme', currentTheme);
    setIsDarkMode(currentTheme === 'dark'); // Update state based on the theme
  };

  return (
    <>
      {!disableNavWithFooter.includes(path) && (
        <header className={`${showMenu ? 'active' : ''}`}>
          <nav className="nav-bar">
            {/* Menu hamburger */}
            <button onClick={toggleMenu}>
              <Menu className="fa-solid fa-bars-staggered sidebarOpen" />
            </button>
            {/* Coast Research Technology Logo */}
            <Link href="/" className="logo">
              <Image
                src="/logoCoast.png"
                alt="Coast Logo"
                width={50}
                height={50}
              />
              <span>COAST RESEARCH TECHNOLOGY</span>
            </Link>

            <div className="menu">
              <div className="menu-mobile-logo">
                <Link href="#" className="logo">
                  <Image
                    src="/logoCoast.png"
                    alt="Coast Logo"
                    width={50}
                    height={50}
                  />
                  <span>CRT</span>
                </Link>
                <button>
                  <X
                    className="fa-solid fa-circle-xmark siderbarClose"
                    onClick={toggleMenu}
                  />
                </button>
              </div>

              <ul role="list" className="nav-links" onClick={toggleMenu}>
                {renderedNavLinks}
              </ul>
            </div>

            <button className="theme-toggle" onClick={toggleTheme}>
              {isDarkMode ? (
                <Sun className="fa-solid fa-sun sun" />
              ) : (
                <Moon className="fa-solid fa-moon moon text-gray-600" />
              )}
            </button>
          </nav>
        </header>
      )}
    </>
  );
};
