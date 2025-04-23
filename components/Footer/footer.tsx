'use client';

import Link from 'next/link';
import React from 'react';
import styles from './footer.module.css';
import './footer.css';
import Image from 'next/image';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  Mail,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  Twitter,
} from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { disableNavWithFooter, matchPath } from '@/utils/disableNavWithFooter';
import { usePathname } from 'next/navigation';

export const Footer = () => {
  const pathname = usePathname();

  if (!pathname || matchPath(pathname, disableNavWithFooter)) return null;

  return (
    <>
      <footer>
        <div className="footer-content">
          <ul className="footer-nav">
            <li role="listitem">
              <Link href="/">Home</Link>
            </li>
            <li role="listitem">
              <Link href="/about">About us</Link>
            </li>
            <li role="listitem">
              <Link href="/services">Services</Link>
            </li>
            <li role="listitem">
              <Link href="/career">Career</Link>
            </li>
            <li role="listitem">
              <Link href="/contact">Contact us</Link>
            </li>
            <li role="listitem">
              <Link href="/training">Training</Link>
            </li>
            <li role="listitem">
              <Link href="/coast-craft">Coast Craft</Link>
            </li>
          </ul>

          <div className="social-icons">
            <Link href="https://www.facebook.com/coastechy">
              <FacebookIcon />
            </Link>
            <Link href="https://twitter.com/coast_research">
              <FaXTwitter />
            </Link>
            <Link href="https://www.instagram.com/coastechy">
              <InstagramIcon />
            </Link>
            <Link href="#">
              <LinkedinIcon />
            </Link>
          </div>

          <p>&copy; 2024 All rights reserved</p>
        </div>
      </footer>
    </>
  );
};
