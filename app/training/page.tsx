import React from 'react';
import style from './training.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { trainingSlides } from '@/lib/data';
import TrainingCarousel from '@/components/AllCarousel/TrainingCarousel/TrainingCarousel';

const page = () => {
  return (
    <main className="first-section">
      <div className="visually-hidden">
        <h1>Empowering the Future of Tech Professionals</h1>
        <p>
          Hands-on training programs designed to equip you with industry-leading
          skills.
        </p>
      </div>
      
      {/* Hero Section */}
      <section className={style.heroSection}>
        <div className={style.heroBackground}>
          <Image
            src="/coast-segun-dup.png"
            alt="Coast Research Technology Hero"
            width={1000}
            height={1000}
            className={style.heroImage}
            priority={true}
          />
          <Image
            src="/coast-segun.png"
            alt="Coast Research Technology Hero Mobile"
            width={1000}
            height={1000}
            className={style.heroImageMobile}
            priority={true}
          />
        </div>

        <div className={style.heroContent}>
          <div className={style.heroText}>
            <h1 className={style.heroTitle}>
              Do you want <span className={style.highlight}>COASTECH</span> to your name?
            </h1>
          </div>

          <div className={style.heroDescription}>
            <h2 className={style.descriptionTitle}>
              Meet <br />
              <span className={style.highlight}>COASTECH SEGUN</span>
            </h2>
            <p className={style.descriptionText}>
              Hello World! Connect with us; the global community for designers,
              creative professionals, analysts and developers.
            </p>
          </div>

          <div className={style.courseCategories}>
            <Link href="#" className={style.categoryLink}>
              <div className={style.categoryCard}>
                <Image
                  src="/vision-1.png"
                  alt="UI/UX Design"
                  width={200}
                  height={200}
                  className={style.categoryImage}
                />
                <div className={style.categoryOverlay}>
                  <h3 className={style.categoryTitle}>UI/UX</h3>
                </div>
              </div>
            </Link>
            
            <Link href="#" className={style.categoryLink}>
              <div className={style.categoryCard}>
                <Image
                  src="/vision-2.png"
                  alt="Web Development"
                  width={200}
                  height={200}
                  className={style.categoryImage}
                />
                <div className={style.categoryOverlay}>
                  <h3 className={style.categoryTitle}>WEB DEVELOPMENT</h3>
                </div>
              </div>
            </Link>
            
            <Link href="#" className={style.categoryLink}>
              <div className={style.categoryCard}>
                <Image
                  src="/vision-3.png"
                  alt="App Development"
                  width={200}
                  height={200}
                  className={style.categoryImage}
                />
                <div className={style.categoryOverlay}>
                  <h3 className={style.categoryTitle}>APP DEVELOPMENT</h3>
                </div>
              </div>
            </Link>
            
            <Link href="#" className={style.categoryLink}>
              <div className={style.categoryCard}>
                <Image
                  src="/vision-4.png"
                  alt="Database Administration"
                  width={200}
                  height={200}
                  className={style.categoryImage}
                />
                <div className={style.categoryOverlay}>
                  <h3 className={style.categoryTitle}>DATABASE ADMINISTRATOR</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Coast Packs Section */}
      <section className={style.coastPacksSection}>
        <div className={style.packsHeader}>
          <div className={style.packsHeaderContent}>
            <Image
              src="/heading_polygon.png"
              alt=""
              width={50}
              height={50}
              className={style.packsGraphic}
            />
            <h2 className={style.packsTitle}>
              Training Packages
            </h2>
          </div>
          <p className={style.packsSubtitle}>
            Choose from our comprehensive training packages designed to accelerate your tech career journey. 
            Each package includes hands-on projects, industry mentorship, and certification upon completion.
          </p>
        </div>
        
        <div className={style.packsContainer}>
          <Image
            src="/coast-techie-packs.png"
            alt="Coast Research Technology Training Packs"
            width={1000}
            height={1000}
            className={style.packsImage}
          />
          {/* <Image
            src="/ID-card.png"
            alt="Coast Research Technology ID Card"
            width={1000}
            height={1000}
            className={style.idCard}
          /> */}
        </div>
      </section>

      {/* Training Carousel Section */}
      <section className={style.trainingSection}>
        <div className={style.trainingHeader}>
          <div className={style.trainingHeaderContent}>
            <Image
              src="/heading_polygon.png"
              alt=""
              width={50}
              height={50}
              className={style.trainingGraphic}
            />
            <h2 className={style.trainingTitle}>
              Student Success Stories
            </h2>
          </div>
          <p className={style.trainingSubtitle}>
            Discover how our comprehensive training programs have transformed careers and opened new opportunities 
            in the tech industry. Hear directly from our graduates about their journey and achievements.
          </p>
        </div>
        
        <TrainingCarousel slides={trainingSlides.map(slide => ({
          ...slide,
          name: slide.name || '',
          position: slide.position || 'Student'
        }))} />
      </section>
    </main>
  );
};

export default page;
