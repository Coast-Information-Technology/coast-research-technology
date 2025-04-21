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

export default function CertificatePage({ params }: CertificateProps) {
  const router = useRouter();
  const cert = certificates.find((c) => c.slug === params.slug);

  if (!cert) {
    return (
      <div className="p-6 text-red-500 font-medium">Certificate not found.</div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative bg-white p-4 rounded shadow-xl max-w-3xl w-full">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
          onClick={() => router.back()}
        >
          <X size={24} />
        </button>
        <Image
          src={cert.imageUrl}
          alt={cert.fullName}
          width={800}
          height={600}
          className="w-full h-auto rounded"
        />
        <p className="mt-2 text-center font-semibold">{cert.fullName}</p>
      </div>
    </div>
  );
}
