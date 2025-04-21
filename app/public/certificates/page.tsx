'use client';

import Link from 'next/link';
import Image from 'next/image';

const certificates = [
  {
    fullName: 'John Michael Doe',
    slug: 'john-michael-doe',
    imageUrl: '/certificates/cert1.jpg',
  },
  {
    fullName: 'Jane Alice Smith',
    slug: 'jane-alice-smith',
    imageUrl: '/certificates/cert2.jpg',
  },
];

export default function CertificatesPage() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">My Certificates</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {certificates.map((cert) => (
          <Link key={cert.slug} href={`/certificates/${cert.slug}`}>
            <div className="cursor-pointer hover:opacity-80 transition">
              <Image
                src={cert.imageUrl}
                alt={cert.fullName}
                width={300}
                height={200}
                className="rounded shadow"
              />
              <p className="mt-2 text-center">{cert.fullName}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
