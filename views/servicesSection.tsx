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
                  Exceptional Talent Recruitment
                </h3>
              </div>
              <div className={`${styles.cardBody}`}>
                <ul role="list" style={{ listStyleType: 'circle' }}>
                  <li>
                    Finding the perfect match between talent and opportunity is
                    critical to your organization&apos;s success.
                  </li>
                  <li>
                    At Coast Research Technology, our recruitment services are
                    in a league of their own.
                  </li>
                  <li>
                    We go beyond conventional approaches to deliver a meticulous
                    and high-quality service designed for those who demand
                    nothing but excellence and innovation.
                  </li>
                  <li>
                    Our approach is aligned with the unique needs of both
                    candidates and companies, ensuring precise matching of
                    exceptional talent with visionary roles.
                  </li>
                  <li>
                    Whether you&apos;re seeking top-tier professionals to drive
                    your business forward or looking for your next career move,
                    our expert recruitment services provide unparalleled
                    precision and insight to meet your needs.
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
                  Strategic Consulting Services
                </h3>
              </div>
              <div className={`${styles.cardBody}`}>
                <ul role="list" style={{ listStyleType: 'circle' }}>
                  <li>
                    At Coast Research Technology, our consulting services are
                    designed to help you navigate the complexities of technology
                    and achieve strategic goals.
                  </li>
                  <li>
                    We offer expert guidance in enterprise engineering, system
                    design, and technology integration to streamline your
                    operations and drive innovation.
                  </li>
                  <li>
                    Our consultants work closely with you to understand your
                    unique challenges and develop tailored solutions that
                    enhance efficiency, boost productivity, and support your
                    long-term vision. From automating business processes to
                    optimizing customer experiences, our strategic consulting is
                    committed to delivering actionable insights and impactful
                    results.
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
