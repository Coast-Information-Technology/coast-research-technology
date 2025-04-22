'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { X } from 'lucide-react';

type CertificateProps = {
  params: {
    slug: string;
  };
};

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

export default function CertificatePage({ params }: CertificateProps) {
  const router = useRouter();
  const cert = certificates.find((c) => c.slug === params.slug);

  if (!cert) {
    return (
      <div className="p-6 text-red-500 font-medium">Certificate not found.</div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-24 flex flex-col items-center justify-start bg-white">
      <div className="relative w-full max-w-4xl">
        <button
          className="absolute top-0 right-0 text-gray-600 hover:text-red-500"
          onClick={() => router.back()}
        >
          <X size={24} />
        </button>
        <Image
          src={cert.imageUrl}
          alt={cert.fullName}
          width={1000}
          height={700}
          className="rounded shadow-xl w-full h-auto"
        />
        <p className="pt-4 text-center text-[1.2rem] font-bold">{cert.title}</p>
      </div>
    </div>
  );
}
