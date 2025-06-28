import styles from './views.module.css';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ServicesSection = () => {
  return (
    <section id="services" className={`${styles.services}`}>
      <div className={`${styles.container}`}>
        <div className={`${styles.servicesWrapper}`}>
          <div className={`${styles.servicesHeader}`}>
            <h2 className={`${styles.servicesHeading}`}>
              <Image
                className={`${styles.graphic}`}
                src="/heading_polygon.png"
                alt=""
                width={50}
                height={50}
              />{' '}
              Our Services
            </h2>
          </div>
          <div className={`${styles.servicesCards}`}>
            <div className={`${styles.card}`}>
              <div className={`${styles.cardHeader}`}>
                <h3 className={`${styles.cardHeading}`}>
                  Research and App Development
                </h3>
              </div>
              <div className={`${styles.cardBody}`}>
                <ul role="list" style={{ listStyleType: 'circle' }}>
                  <li>
                    At Coast Research Technology, we specialize in developing
                    complex and sophisticated software solutions designed to
                    drive digital transformation for your business and industry.
                  </li>
                  <li>
                    Our world-class enterprise engineering, design, and
                    technology consulting services are tailored to automate your
                    processes, enhance operations, and elevate customer service.
                  </li>
                  <li>
                    Let us help you transform your vision into reality with
                    cutting-edge technology and expert craftsmanship.
                  </li>
                </ul>
              </div>
              <Link href="/services" className="btn btn--primary">
                Read More
              </Link>
            </div>

            <div className={`${styles.card}`}>
              <div className={`${styles.cardHeader}`}>
                <h3 className={`${styles.cardHeading}`}>
                  Skill acquisition and career growth
                </h3>
              </div>
              <div className={`${styles.cardBody}`}>
                <ul role="list" style={{ listStyleType: 'circle' }}>
                  <li>
                    Are you frustrated with outdated technologies and course
                    materials? Do you need practical, up-to-date training on the
                    latest IT innovations?
                  </li>
                  <li>
                    Choosing the right place for training can be crucial for
                    your career or the future of your organization.
                  </li>
                  <li>
                    At Coast Research Technology, we offer cutting-edge training
                    programs that provide hands-on experience with the latest
                    technologies, ensuring you and your team are equipped to
                    excel in a rapidly evolving digital landscape.
                  </li>
                  <li>
                    Elevate your skills and future-proof your career with our
                    comprehensive training solutions.
                  </li>
                </ul>
              </div>
              <Link href="/services" className="btn btn--primary">
                Read More
              </Link>
            </div>
          </div>
          <div className={`${styles.servicesCards}`}>
            <div className={`${styles.card}`}>
              <div className={`${styles.cardHeader}`}>
                <h3 className={`${styles.cardHeading}`}>
                  Custom Software Development
                </h3>
              </div>
              <div className={`${styles.cardBody}`}>
                <ul role="list" style={{ listStyleType: 'circle' }}>
                  <li>
                    We specialize in creating bespoke software solutions that
                    perfectly align with your business objectives and requirements.
                  </li>
                  <li>
                    Our development team leverages cutting-edge technologies and
                    industry best practices to deliver robust, scalable, and
                    user-friendly applications.
                  </li>
                  <li>
                    From web applications to mobile apps and enterprise software,
                    we ensure every solution is tailored to meet your specific
                    needs and exceed your expectations.
                  </li>
                  <li>
                    We follow agile methodologies to ensure transparent
                    communication, rapid development cycles, and continuous
                    improvement throughout the project lifecycle.
                  </li>
                  <li>
                    Our commitment to quality extends beyond development to
                    include comprehensive testing, deployment, and ongoing
                    support to ensure your software performs optimally.
                  </li>
                </ul>
              </div>
              <Link href="/services" className="btn btn--primary">
                Read More
              </Link>
            </div>

            <div className={`${styles.card}`}>
              <div className={`${styles.cardHeader}`}>
                <h3 className={`${styles.cardHeading}`}>
                  Expert Training Programs
                </h3>
              </div>
              <div className={`${styles.cardBody}`}>
                <ul role="list" style={{ listStyleType: 'circle' }}>
                  <li>
                    Comprehensive training programs designed to equip individuals with
                    industry-leading skills in software development, cybersecurity,
                    and emerging technologies.
                  </li>
                  <li>
                    Our hands-on approach ensures practical experience with real-world
                    projects, preparing you for immediate industry integration.
                  </li>
                  <li>
                    Expert instructors with years of industry experience guide you
                    through the latest technologies and best practices.
                  </li>
                  <li>
                    Flexible learning schedules and personalized mentorship to support
                    your learning journey and career goals.
                  </li>
                  <li>
                    Continuous curriculum updates to keep pace with rapidly evolving
                    technology trends and industry demands.
                  </li>
                </ul>
              </div>
              <Link href="/services" className="btn btn--primary">
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
