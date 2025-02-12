'use client';

import React, { useEffect } from 'react';

const Blob = ({ color }: { color: string }) => (
  <div
    className={`bouncing-blob overflow-hidden ${color}`}
    style={{
      top: `${Math.random() * 100}vh`,
      left: `${Math.random() * 100}vw`,
    }}
  />
);

const Hero = () => <div className="hero"></div>;

const BouncingBlobs = () => (
  <div className="bouncing-blobs-container relative w-full h-full">
    <div className="bouncing-blobs-glass absolute top-0 left-0 w-full h-full bg-opacity-25 bg-blur" />
    <div className="bouncing-blobs absolute top-0 left-0 w-screen h-screen flex flex-wrap gap-4">
      <Blob color="bouncing-blob--blue" />
      <Blob color="bouncing-blob--blue" />
      <Blob color="bouncing-blob--blue" />
      <Blob color="bouncing-blob--white" />
      <Blob color="bouncing-blob--purple" />
      <Blob color="bouncing-blob--purple" />
      <Blob color="bouncing-blob--pink" />
    </div>
  </div>
);

const MIN_SPEED = 1.5;
const MAX_SPEED = 2.5;

const randomNumber = (min: number, max: number) =>
  Math.random() * (max - min) + min;

interface BlobType {
  el: HTMLDivElement;
  size: number;
  initialX: number;
  initialY: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
}

const initBlobs = () => {
  const blobEls = document.querySelectorAll(
    '.bouncing-blob'
  ) as NodeListOf<HTMLDivElement>;
  const blobs: BlobType[] = Array.from(blobEls).map((blobEl) => {
    const boundingRect = blobEl.getBoundingClientRect();
    return {
      el: blobEl,
      size: boundingRect.width,
      initialX: randomNumber(0, window.innerWidth - boundingRect.width),
      initialY: randomNumber(0, window.innerHeight - boundingRect.height),
      vx: randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1),
      vy: randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1),
      x: 0,
      y: 0,
    };
  });

  const update = () => {
    requestAnimationFrame(update);
    blobs.forEach((blob) => {
      blob.x += blob.vx;
      blob.y += blob.vy;
      if (blob.x >= window.innerWidth - blob.size) {
        blob.x = window.innerWidth - blob.size;
        blob.vx *= -1;
      }
      if (blob.y >= window.innerHeight - blob.size) {
        blob.y = window.innerHeight - blob.size;
        blob.vy *= -1;
      }
      if (blob.x <= 0) {
        blob.x = 0;
        blob.vx *= -1;
      }
      if (blob.y <= 0) {
        blob.y = 0;
        blob.vy *= -1;
      }
      blob.el.style.transform = `translate(${blob.x - blob.initialX}px, ${
        blob.y - blob.initialY
      }px)`;
    });
  };

  requestAnimationFrame(update);
};

const BlobApp = () => {
  useEffect(() => {
    initBlobs();
  }, []);

  return (
    <>
      <BouncingBlobs />
      <Hero />
    </>
  );
};

export default BlobApp;
