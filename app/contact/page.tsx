'use client';

import Image from 'next/image';
import React from 'react';
import './contact.css';
import Link from 'next/link';
import { FacebookIcon, InstagramIcon, LinkedinIcon } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';

const ContactPage: React.FC = () => {
  return (
    <main className="first-section">
      <section className="contact-section">
        <div className="contact-container">
          <h1>Contact</h1>
          <div className="attach">
            <Image
              src="/phone.png"
              alt="Phone"
              className="phone"
              width={1000}
              height={1000}
            />
            <Image
              src="/headset.png"
              alt="Headset"
              className="headset"
              width={1000}
              height={1000}
            />
            <div className="headset-mobile">
              <Image
                src="/headset-mobile.png"
                alt="Headset"
                width={1000}
                height={1000}
              />
            </div>
          </div>
          <div className="contact-content">
            <form className="contact-form">
              <div className="form-control">
                <input type="text" required />
                <label>
                  <span style={{ transitionDelay: '0ms' }}>En</span>
                  <span style={{ transitionDelay: '50ms' }}>te</span>
                  <span style={{ transitionDelay: '100ms' }}>r</span>
                  <span style={{ transitionDelay: '150ms' }}></span>
                  <span style={{ transitionDelay: '200ms' }}>n</span>
                  <span style={{ transitionDelay: '250ms' }}>a</span>
                  <span style={{ transitionDelay: '300ms' }}>m</span>
                  <span style={{ transitionDelay: '350ms' }}>e</span>
                </label>
              </div>

              <div className="form-control">
                <input type="text" required />
                <label>
                  <span style={{ transitionDelay: '0ms' }}>En</span>
                  <span style={{ transitionDelay: '50ms' }}>te</span>
                  <span style={{ transitionDelay: '100ms' }}>r</span>
                  <span style={{ transitionDelay: '150ms' }}></span>
                  <span style={{ transitionDelay: '200ms' }}>em</span>
                  <span style={{ transitionDelay: '250ms' }}>a</span>
                  <span style={{ transitionDelay: '300ms' }}>i</span>
                  <span style={{ transitionDelay: '350ms' }}>l</span>
                </label>
              </div>

              <div className="form-control">
                <textarea required></textarea>
                <label>
                  <span style={{ transitionDelay: '0ms' }}>En</span>
                  <span style={{ transitionDelay: '50ms' }}>ter</span>
                  <span style={{ transitionDelay: '100ms' }}></span>
                  <span style={{ transitionDelay: '150ms' }}>me</span>
                  <span style={{ transitionDelay: '200ms' }}>ss</span>
                  <span style={{ transitionDelay: '250ms' }}>a</span>
                  <span style={{ transitionDelay: '300ms' }}>g</span>
                  <span style={{ transitionDelay: '350ms' }}>e</span>
                </label>
              </div>

              <button className="submit-btn" type="submit">
                SUBMIT
              </button>
            </form>

            <div className="contact-details">
              <div>
                <p className="contact-subtitle">GET IN TOUCH</p>
                <p className="tel-number">+235 807 299 1328</p>
              </div>
              <div>
                <p className="contact-subtitle">Follow us on</p>
                <div className="social">
                  <Link href="#" aria-label="Facebook">
                    <FacebookIcon />
                  </Link>
                  <Link href="#" aria-label="X (Twitter)">
                    <FaXTwitter />
                  </Link>
                  <Link href="#" aria-label="Instagram">
                    <InstagramIcon />
                  </Link>
                  <Link href="#" aria-label="LinkedIn">
                    <LinkedinIcon />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15825.64383068179!2d3.8716554!3d7.4196884!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10398d7fb999f27b%3A0xeb0ad645e4453680!2sCoast%20Research%20Technology%20-Best%20software%20engineering%20company%20%7C%20Best%20software%20company%20in%20ibadan%20%7C%20Top%20computer%20training%20school!5e0!3m2!1sen!2sng!4v1723323828230"
            width="800"
            height="400"
            loading="lazy"
            aria-hidden="false"
          />
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
