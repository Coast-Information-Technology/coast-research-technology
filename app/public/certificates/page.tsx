'use client';

import Link from 'next/link';
import Image from 'next/image';
import { title } from 'process';

const certificates = [
  {
    fullName: 'Malik Kikiola Lamidi',
    title: 'Microsoft Office Certificate in Modern Desktop Publishing',
    slug: 'malik-kikiola-lamidi',
    imageUrl: '/certificates/malik-kikiola-lamidi.jpeg',
  },
  {
    fullName: 'Jane Alice Smith',
    title: 'Information Technology',
    slug: 'jane-alice-smith',
    imageUrl: '/certificates/cert2.jpg',
  },
];

export default function CertificatesPage() {
  return (
    <section className="min-h-screen p-6 bg-gray-100 pt-28">
      <h1 className="text-3xl font-bold pb-10 text-center">My Certificates</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {certificates.map((cert) => (
          <Link key={cert.slug} href={`/public/certificates/${cert.slug}`}>
            <div className="cursor-pointer hover:opacity-80 transition flex flex-col items-center">
              <Image
                src={cert.imageUrl}
                alt={cert.fullName}
                width={300}
                height={200}
                className="rounded shadow"
              />
              <p className="pt-2 text-center text-[1.2rem] font-bold">
                {cert.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
