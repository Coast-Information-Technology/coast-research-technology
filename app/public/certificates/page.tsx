'use client';

import Link from 'next/link';
import Image from 'next/image';

const certificates = [
  {
    slug: 'certificate-one',
    name: 'Certificate One',
    imageUrl: '/certificates/cert1.jpg',
  },
  {
    slug: 'certificate-two',
    name: 'Certificate Two',
    imageUrl: '/certificates/cert2.jpg',
  },
  {
    slug: 'certificate-three',
    name: 'Certificate Three',
    imageUrl: '/certificates/cert3.jpg',
  },
];

export default function CertificatesPage() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">My Certificates</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {certificates.map((cert) => (
          <Link key={cert.slug} href={`/public/certificates/${cert.slug}`}>
            <div className="cursor-pointer hover:opacity-80 transition">
              <Image
                src={cert.imageUrl}
                alt={cert.name}
                width={300}
                height={200}
                className="rounded shadow"
              />
              <p className="mt-2 text-center">{cert.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
