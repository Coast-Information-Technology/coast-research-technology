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
      <section className={style.techie}>
        <Image
          src="/coast-segun-dup.png"
          alt="coast-tech individual"
          width={1000}
          height={1000}
          className={style.coastTechie}
          priority={true}
        />
        <Image
          src="/coast-segun.png"
          alt="coast-tech individual"
          width={1000}
          height={1000}
          className={style.coastTechie2}
          priority={true}
        />
        <p className={style.coastTech}>
          Do you want <span>COASTECH</span> to your name?
        </p>
        {/* <div className={style.coastStudent}> */}
        <div className={style.coastTechText}>
          <h2>
            Meet <br />
            <span>COASTECH SEGUN</span>
          </h2>
          <p>
            Hello World! Connect with us; the global community for designers,
            creative professionals, analysts and developers.
          </p>
        </div>

        <div className={style.heroImagesContainer}>
          <Link href="#">
            <div className={style.imageWrapper}>
              <Image
                src="/vision-1.png"
                alt="VR image"
                width={200}
                height={200}
                className={style.vrImage}
              />
              <div className={style.hoverText}>UI/UX</div>
            </div>
          </Link>
          <Link href="#">
            <div className={style.imageWrapper}>
              <Image
                src="/vision-2.png"
                alt="VR image"
                width={200}
                height={200}
                className={style.vrImage}
              />
              <div className={style.hoverText}>WEB DEVELOPMENT</div>
            </div>
          </Link>
          <Link href="#">
            <div className={style.imageWrapper}>
              <Image
                src="/vision-3.png"
                alt="VR image"
                width={200}
                height={200}
                className={style.vrImage}
              />
              <div className={style.hoverText}>APP DEVELOPMENT</div>
            </div>
          </Link>
          <Link href="#">
            <div className={style.imageWrapper}>
              <Image
                src="/vision-4.png"
                alt="VR image"
                width={200}
                height={200}
                className={style.vrImage}
              />
              <div className={style.hoverText}>DATABASE ADMINISTRATOR</div>
            </div>
          </Link>
        </div>
        {/* </div> */}
      </section>
      <section className={style.coastPacks}>
        {/* <div className={style.welcome}>
          <h2>Welcome to</h2>
          <h3>Coast Research Technology</h3>
        </div> */}
        <Image
          src="/coast-techie-packs.png"
          alt="coast-tech individual"
          width={1000}
          height={1000}
          className={style.techiePacks}
        />

        <Image
          src="/ID-card.png"
          alt="Coast Research Technology ID Card"
          width={1000}
          height={1000}
          className={style.IDCard}
        />
      </section>
      <section>
        <TrainingCarousel slides={trainingSlides} />
      </section>
    </main>
  );
};

export default page;
