// @/components/coast-craft/Newsletter.tsx
import React from 'react';
import Styles from './coast-craft.module.css';
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import Link from 'next/link';

const Newsletter: React.FC = () => {
  return (
    <div className={Styles.newsletter}>
      <div>
        <h3>Subscribe to our newsletter</h3>
        <form action="submit">
          <input
            type="email"
            id="nemail"
            placeholder="Your E-mail"
            name="Email"
          />
          <button type="submit" className={Styles.newsBtn}>
            Subscribe
          </button>
        </form>
      </div>
      <div>
        <p>Stay informed and inspired with our Coast Craft newsletter.</p>
        <p>
          Receive the latest updates on software development, tech trends, and
          insightful articles delivered straight to your inbox.
        </p>
        <p>
          Join our community and craft exceptional code as we navigate the
          digital horizon together!
        </p>
      </div>
      <div className={Styles.socialIcons}>
        <Link
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </Link>
        <Link
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF />
        </Link>
        <Link
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </Link>
        <Link
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn />
        </Link>
      </div>
    </div>
  );
};

export default Newsletter;
