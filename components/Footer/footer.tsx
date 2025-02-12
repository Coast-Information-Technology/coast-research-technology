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
import { disableNavWithFooter } from '@/utils/disableNavWithFooter';
import { usePathname } from 'next/navigation';

export const Footer = () => {
  const path = usePathname();

  return (
    <>
      {!disableNavWithFooter.includes(path) && (
        <footer>
          {/* <section className={`${styles.footer}`}>
      <div className="lg:px-20 lg:py-16 px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-20 lg:gap-12 text-background">
          <div className={`${styles.footerGroup}`}>
            <div className="logo">
              <Image
                src="/footer_logo.svg"
                alt="coast research technology brand logo"
                width={120}
                height={120}
              />
            </div>
            <div className="flex items-center gap-8 pt-8">
              <h3 className="text-[12px] py-4 font-[500]">Follow Us:</h3>

              <div className={`${styles.socialLinks} flex items-center gap-4`}>
                <Link
                  className="icons hover:bg-background hover:rounded-full hover:p-2 hover:text-foreground hover:ease-in-out hover:duration-100"
                  href="https://www.facebook.com/coastechy/"
                >
                  <FacebookIcon size={18} />
                </Link>
                <Link
                  className="icons hover:bg-background hover:rounded-full hover:p-2 hover:text-foreground hover:ease-in-out hover:duration-100"
                  href="https://instagram.com/coastechy?utm_medium=copy_link"
                >
                  <InstagramIcon size={18} />
                </Link>
                <Link
                  className="icons hover:bg-background hover:rounded-full hover:p-2 hover:text-foreground hover:ease-in-out hover:duration-100"
                  href="https://www.facebook.com/coastechy/"
                >
                  <Twitter size={18} />
                </Link>
                <Link
                  className="icons hover:bg-background hover:rounded-full hover:p-2 hover:text-foreground hover:ease-in-out hover:duration-100"
                  href="https://instagram.com/coastechy?utm_medium=copy_link"
                >
                  <LinkedinIcon size={18} />
                </Link>
              </div>
            </div>
          </div>

          <div id="company" className={`${styles.footerGroup}`}>
            <h3 className={`${styles.footerHeading}`}>Company</h3>
            <Link
              className={`${styles.footerLink} hover:translate-x-2 duration-300`}
              href="#about"
            >
              About
            </Link>
            <Link
              className={`${styles.footerLink} hover:translate-x-2 duration-300`}
              href="https://coastresearchtechnology1.netlify.app/"
            >
              App Development
            </Link>
            <Link
              className={`${styles.footerLink} hover:translate-x-2 duration-300`}
              href="https://coastresearchtechnology2.netlify.app/"
            >
              Training
            </Link>
            <Link
              className={`${styles.footerLink} hover:translate-x-2 duration-300`}
              href="#"
            >
              Coast Craft
            </Link>
            <Link
              className={`${styles.footerLink} hover:translate-x-2 duration-300`}
              href="#jobOffers"
            >
              Job Offers
            </Link>
            <Link
              className={`${styles.footerLink} hover:translate-x-2 duration-300`}
              href="#contact"
            >
              Contact{" "}
            </Link>
          </div>

          <div id="contact" className={`${styles.footerGroup}`}>
            <h3 className={`${styles.footerHeading}`}>Contact</h3>
            <div className="flex items-center gap-4">
              <MapPinIcon size={50} />
              <p className="text-[12px]">
                7, Adegboyega Close, Olopomewa Bus Stop, off Sango Eleyele Road,
                200282, Ibadan, Oyo State, Nigeria
              </p>
            </div>
            <div className="flex items-center gap-4 py-3">
              <MailIcon size={20} />
              <p className="text-[12px]">
                {" "}
                hello@coastresearchtechnology.com.ng
              </p>
            </div>
            <div className="flex items-center gap-4">
              <PhoneIcon size={18} />
              <p className="text-[12px]">+(234) 807 299-1328 </p>
            </div>
          </div>

          <form className={`${styles.newsletter}`}>
            <label
              className={`${styles.footerInputLabel}`}
              htmlFor="newsletter"
            >
              Subscribe to our Newsletter
            </label>
            <div className="newsletter flex">
              <input
                id="newsletter"
                name="newsletter"
                type="email"
                className="newsletterInput py-2 px-3 text-[12px] rounded-l-sm outline-none text-foreground"
                placeholder="Enter your email"
              />
              <button
                className="button py-2 px-3 text-[12px] rounded-r-sm"
                type="submit"
                style={{
                  backgroundImage:
                    "linear-gradient(45.08deg, #3e0344 5.27%, #5b0256 135.49%)",
                }}
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="px-12 lg:px-20 lg:flex-row py-4 border-t flex flex-col w-full items-center justify-between text-background text-[12px]">
        <p>All rights reserved. &copy; Coast Research Technology</p>
        <p>
          {" "}
          <Link href="./privacy_policy.html" style={{ color: "#fff" }}>
            {" "}
            Privacy Policy{" "}
          </Link>{" "}
        </p>
        <p>Terms & Conditions</p>
      </div>

      <button className="back-to-top hidden">
        <svg
          width="18"
          height="10"
          viewBox="0 0 18 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.9688 9.21875L9 0.78125L1.03125 9.21875"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>  */}
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
      )}
    </>
  );
};
