import styles from './views.module.css';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ServicesSection = () => {
  return (
    <section id="services" className={`${styles.servicesModern}`}>
      <div className={`${styles.container}`}>
        <div className={`${styles.servicesWrapperModern}`}>
          <div className={`${styles.servicesHeaderModern}`}>
            <div className={`${styles.headerContent}`}>
              <Image
                className={`${styles.graphicModern}`}
                src="/heading_polygon.png"
                alt=""
                width={60}
                height={60}
              />
              <h2 className={`${styles.servicesHeadingModern}`}>
                Our Services
              </h2>
            </div>
            <p className={`${styles.servicesSubtitle}`}>
              Empowering businesses with cutting-edge technology solutions and expert training programs
            </p>
          </div>
          
          <div className={`${styles.servicesGrid}`}>
            <div className={`${styles.serviceCard}`}>
              <div className={`${styles.cardIcon}`}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={`${styles.cardContent}`}>
                <h3 className={`${styles.cardTitle}`}>
                  Research and App Development
                </h3>
                <p className={`${styles.cardDescription}`}>
                  We specialize in developing complex and sophisticated software solutions designed to drive digital transformation for your business and industry.
                </p>
                <ul className={`${styles.cardFeatures}`}>
                  <li>Complex software solutions</li>
                  <li>Digital transformation</li>
                  <li>Enterprise engineering</li>
                  <li>Process automation</li>
                </ul>
                <Link href="/services" className={`${styles.cardButton}`}>
                  Learn More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>

            <div className={`${styles.serviceCard}`}>
              <div className={`${styles.cardIcon}`}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={`${styles.cardContent}`}>
                <h3 className={`${styles.cardTitle}`}>
                  Skill Acquisition & Career Growth
                </h3>
                <p className={`${styles.cardDescription}`}>
                  We offer cutting-edge training programs that provide hands-on experience with the latest technologies, ensuring you and your team are equipped to excel.
                </p>
                <ul className={`${styles.cardFeatures}`}>
                  <li>Latest IT innovations</li>
                  <li>Hands-on experience</li>
                  <li>Career advancement</li>
                  <li>Future-proof skills</li>
                </ul>
                <Link href="/services" className={`${styles.cardButton}`}>
                  Learn More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>

            <div className={`${styles.serviceCard}`}>
              <div className={`${styles.cardIcon}`}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className={`${styles.cardContent}`}>
                <h3 className={`${styles.cardTitle}`}>
                  Custom Software Development
                </h3>
                <p className={`${styles.cardDescription}`}>
                  We specialize in creating bespoke software solutions that perfectly align with your business objectives and requirements.
                </p>
                <ul className={`${styles.cardFeatures}`}>
                  <li>Bespoke solutions</li>
                  <li>Scalable applications</li>
                  <li>Agile methodologies</li>
                  <li>Ongoing support</li>
                </ul>
                <Link href="/services" className={`${styles.cardButton}`}>
                  Learn More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>

            <div className={`${styles.serviceCard}`}>
              <div className={`${styles.cardIcon}`}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={`${styles.cardContent}`}>
                <h3 className={`${styles.cardTitle}`}>
                  Expert Training Programs
                </h3>
                <p className={`${styles.cardDescription}`}>
                  Comprehensive training programs designed to equip individuals with industry-leading skills in software development and emerging technologies.
                </p>
                <ul className={`${styles.cardFeatures}`}>
                  <li>Industry-leading skills</li>
                  <li>Real-world projects</li>
                  <li>Expert instructors</li>
                  <li>Flexible learning</li>
                </ul>
                <Link href="/services" className={`${styles.cardButton}`}>
                  Learn More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
