/** @format */

'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X, Moon, Sun, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { disableNavWithFooter } from '@/utils/disableNavWithFooter';

// Define the type for navigation links
interface NavLinkData {
  href: string;
  label: string;
  submenu?: NavLinkData[];
}

// Define the data for the navigation links, including submenus
const navLinks: NavLinkData[] = [
  { href: '/', label: 'Home' },
  {
    href: '/training',
    label: 'Training',
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
  // { href: '/career', label: 'Career' },
  // { href: '/coast`-craft', label: 'Coast Craft' },
];

// Dropdown component
const DropdownMenu: React.FC<{ 
  items: NavLinkData[]; 
  isOpen: boolean; 
  onClose: () => void;
  mobile?: boolean;
}> = ({ items, isOpen, onClose, mobile }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`absolute ${mobile ? 'left-0 w-full' : 'left-0 w-48'} top-full mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 animate-fade-in`}
      role="menu"
    >
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
          onClick={onClose}
          tabIndex={0}
          role="menuitem"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

// Component for individual navigation links or dropdown triggers
const NavLink = ({ link, isActive, onClose, mobile }: { link: NavLinkData; isActive: boolean; onClose: () => void; mobile?: boolean }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const isCurrentActive = isActive || pathname === link.href;
  
  if (link.submenu) {
    return (
      <div 
        className="relative"
        onMouseEnter={() => !mobile && setIsDropdownOpen(true)}
        onMouseLeave={() => !mobile && setIsDropdownOpen(false)}
      >
        <button
          onClick={() => setIsDropdownOpen((v) => !v)}
          className={`flex items-center gap-1 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${isCurrentActive ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-gray-800" : "text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          tabIndex={0}
          type="button"
        >
          {link.label}
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
        </button>
        <DropdownMenu items={link.submenu} isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} mobile={mobile} />
      </div>
    );
  }
  
  return (
    <Link
      href={link.href}
      onClick={onClose}
      className={`block px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${isCurrentActive ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-gray-800" : "text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
      tabIndex={0}
    >
      {link.label}
    </Link>
  );
};

// Theme toggle component
const ThemeToggle: React.FC<{ isDark: boolean; onToggle: () => void }> = ({ 
  isDark, 
  onToggle 
}) => {
  return (
    <button
      onClick={onToggle}
      className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      type="button"
    >
      <Sun className={`w-5 h-5 transition-all duration-300 ${
        isDark ? 'rotate-0 scale-100 text-yellow-500' : 'rotate-90 scale-0'
      }`} />
      <Moon className={`w-5 h-5 transition-all duration-300 absolute top-2 left-2 ${
        isDark ? 'rotate-90 scale-0' : 'rotate-0 scale-100 text-gray-600'
      }`} />
    </button>
  );
};

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark' || 
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  // Check if navbar should be hidden
  const shouldHideHeader = disableNavWithFooter.some((route) => {
    const pattern = route.replace(/\[.*\]/g, '[^/]+');
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(pathname || '');
  });

  if (shouldHideHeader) return null;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700' 
        : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 group"
            onClick={closeMenu}
          >
            <div className="relative w-10 h-10">
              <Image
                src="/logoCoast.png"
                alt="Coast Research Technology"
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-200"
              />
            </div>
            <span className="hidden sm:block text-lg font-bold text-gray-900 dark:text-white border-l-2 border-purple-600 pl-3">
              COAST RESEARCH TECHNOLOGY
            </span>
            <span className="sm:hidden text-lg font-bold text-gray-900 dark:text-white">
              CRT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                link={link}
                isActive={pathname === link.href}
                onClose={() => {}}
              />
            ))}
          </div>

          {/* Desktop Theme Toggle */}
          <div className="hidden lg:block">
            <ThemeToggle isDark={isDarkMode} onToggle={toggleTheme} />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle isDark={isDarkMode} onToggle={toggleTheme} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              type="button"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-screen opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 rounded-lg mt-2 shadow-lg border border-gray-200 dark:border-gray-700">
            {navLinks.map((link, index) => (
              <div key={index} className="block">
                <NavLink
                  link={link}
                  isActive={pathname === link.href}
                  onClose={closeMenu}
                  mobile
                />
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};
