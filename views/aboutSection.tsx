import Image from "next/image";
import React from "react";
import styles from "./views.module.css";

const AboutSection = () => {
  return (
    <section id="about" className={`${styles.about}`}>
      <div className={`${styles.container}`}>
        <div className={`${styles.aboutWrapper}`}>
          <div className={`${styles.aboutHeader}`}>
            <h2 className={`${styles.aboutHeading}`}>
              <Image
                className={`${styles.graphic}`}
                src="/heading_polygon.png"
                alt=""
                width={50}
                height={50}
              />{" "}
              About Us
            </h2>
          </div>
          <article className={`${styles.aboutContent}`}>
            <p className={`${styles.lead}`}>
              <strong>
                At Coast Research Technology, our mission is clear: &quot;Making
                life easier through smart coding.&quot;
              </strong>
              <br />
              <br />
            </p>
            <p className={`${styles.lead}`}>
              We are more than just a software development, training, and
              recruitment company—we are innovators committed to transforming
              how businesses and individuals interact with technology. By
              offering cutting-edge software solutions, expert training
              programs, and unparalleled recruitment services, we harness the
              power of technology to drive progress and ensure our clients and
              trainees stay ahead in an ever-evolving digital landscape.
            </p>
            <br />
            <p className={`${styles.lead}`}>
              Our dedication to excellence in these three core areas underscores
              our belief in technology’s potential to elevate lives and redefine
              industry standards.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
