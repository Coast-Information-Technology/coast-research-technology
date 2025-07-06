import Image from "next/image";
import React from "react";
import styles from "./views.module.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AboutSection = () => {
  return (
    <section id="about" className={styles.aboutSectionModern}>
      <div className={styles.aboutCardModern}>
        <div className={styles.aboutGridModern}>
          <div className={styles.aboutImageCol}>
            <div className={styles.polygonWrapper}>
              <Image
                className={styles.graphicAnimated}
                src="/heading_polygon.png"
                alt="About Polygon"
                width={80}
                height={80}
              />
            </div>
          </div>
          <div className={styles.aboutTextCol}>
            <h2 className={styles.aboutHeadingModern}>
              About Us
            </h2>
            <article className={styles.aboutContentModern}>
              <p className={styles.leadModern}>
                <strong>
                  At Coast Research Technology, our mission is clear: "Making life easier through smart coding."
                </strong>
              </p>
              <p className={styles.leadModern}>
                We are more than just a software development and training company—we are innovators committed to transforming how businesses and individuals interact with technology. By offering cutting-edge software solutions and expert training programs, we harness the power of technology to drive progress and ensure our clients and trainees stay ahead in an ever-evolving digital landscape.
              </p>
              <p className={styles.leadModern}>
                Our dedication to excellence in these core areas underscores our belief in technology's potential to elevate lives and redefine industry standards.
              </p>
              <div className={styles.ctaWrapperModern}>
                <Button asChild variant="gradient" size="lg">
                  <Link href="/about-us/our-mission">Learn More</Link>
                </Button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
