"use client";

import Image from "next/image";
import React from "react";
import "../aboutUs.css";
import Link from "next/link";
import { X } from "lucide-react";
import { team } from "@/lib/data";
import TeamCarousel from "@/components/AllCarousel/TeamCarousel/TeamCarousel";

const OurVisionPage: React.FC = () => {
  return (
    <main className="first-section">
      <div className="hero-hold">
        <div className="heroImgMission  item1">
          <Image
            src="/television.png"
            alt="Our mission background image"
            width={1000}
            height={1000}
          />
        </div>
        <div className="hero-space item2">
          <h1>OUR VISION</h1>
          <p>
            At Coast Research Technology, our vision is to be the leading
            catalyst for transformative change in the technology landscape. We
            aspire to shape the future of software development, training, and
            recruitment by pioneering innovative solutions and fostering a
            culture of excellence. Our goal is to inspire and drive progress by
            creating technologies and opportunities that not only meet but
            exceed the evolving needs of businesses and individuals. We envision
            a world where our contributions elevate industry standards, empower
            communities, and create lasting impact through the power of smart
            coding and visionary talent.
          </p>
          <button
            type="button"
            className="read-more-btn"
            aria-label="Open read more"
          >
            <Link href="#popup1">Summary</Link>
          </button>
        </div>
      </div>

      <div id="popup1" className="overlay">
        <div className="popup">
          <Link className="close" href="#">
            <X />
          </Link>
          <div className="hexagon-main">
            <div className="readmore-hexagon-container">
              <div className="readmore-hexagon">
                <div className="readmore-hex-content">
                  <i className="fab fa-facebook-f"></i>
                  Full-Stack <br />
                  Development
                </div>
              </div>
              <div className="readmore-hexagon">
                <div className="readmore-hex-content">
                  <i className="fab fa-facebook-f"></i>
                  Full-Stack <br />
                  Development
                </div>
              </div>
              <div className="readmore-hexagon">
                <div className="readmore-hex-content">
                  <i className="fab fa-facebook-f"></i>
                  Full-Stack <br />
                  Development
                </div>
              </div>
              <div className="readmore-hexagon">
                <div className="readmore-hex-content">
                  <i className="fab fa-facebook-f"></i>
                  Full-Stack <br />
                  Development
                </div>
              </div>
              <div className="readmore-hexagon">
                <div className="readmore-hex-content">
                  <i className="fab fa-facebook-f"></i>
                  Full-Stack <br />
                  Development
                </div>
              </div>
              <div className="readmore-hexagon">
                <div className="readmore-hex-content">
                  <i className="fab fa-facebook-f"></i>
                  Full-Stack <br />
                  Development
                </div>
              </div>
              <div className="readmore-hexagon">
                <div className="readmore-hex-content">
                  <i className="fab fa-facebook-f"></i>
                  Full-Stack <br />
                  Development
                </div>
              </div>
              <div className="readmore-hexagon">
                <div className="readmore-hex-content">
                  <i className="fab fa-facebook-f"></i>
                  Full-Stack <br />
                  Development
                </div>
              </div>
              <div className="readmore-hexagon">
                <div className="readmore-hex-content">
                  <i className="fab fa-facebook-f"></i>
                  Full-Stack <br />
                  Development
                </div>
              </div>
              <div className="readmore-hexagon">
                <div className="readmore-hex-content">
                  <i className="fab fa-facebook-f"></i>
                  Full-Stack <br />
                  Development
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TeamCarousel slides={team} />

      <section id="coreValues" className="coreValues">
        <h2 className="toggle-h2">OUR CORE VALUES & CULTURE</h2>
        <p className="justify-text">
          At Coast Research Technology, we are driven by a commitment to
          innovation and excellence, constantly seeking creative and
          forward-looking solutions to address future needs and complex
          challenges. We strive to deliver high-quality software development,
          comprehensive training programs, and effective recruitment services
          that empower businesses and individuals to thrive in an ever-evolving
          digital landscape. Through our emphasis on precision, we ensure a
          meticulous and accurate approach to matching talent with
          opportunities, tailored to meet unique needs and drive success.
        </p>
        <p className="justify-text">
          We believe in fostering growth and transformation by nurturing talent
          and promoting a culture that values creativity, collaboration, and
          practical problem-solving. Our mission is to empower the next
          generation of tech professionals with the skills, confidence, and
          support needed to excel in their careers. By providing tailored
          solutions and strategic recruitment, we help businesses and
          individuals achieve their full potential, driving positive change and
          progress across the tech industry.
        </p>
        <button
          type="button"
          className="read-more-btn"
          aria-label="Open read more"
        >
          <Link href="/services">More Details</Link>
        </button>
      </section>
    </main>
  );
};

export default OurVisionPage;
