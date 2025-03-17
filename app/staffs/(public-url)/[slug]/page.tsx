// staffs/(public-url)/[slug].tsx
'use client';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { FiMessageCircle, FiBookmark } from 'react-icons/fi';

const StudentProfile = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="min-h-screen bg-blue-500 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-4">
            <Image
              src="/profile.jpg"
              alt="Profile Picture"
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">Jeremy Rose</h2>
              <p className="text-blue-500 text-sm">Product Designer</p>
            </div>
          </div>
          <button
            className="text-gray-500 hover:text-blue-500"
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            {isBookmarked ? (
              <FaStar className="text-yellow-400" />
            ) : (
              <FiBookmark />
            )}
          </button>
        </div>

        {/* Rating & Actions */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1 text-blue-500">
            <span className="text-lg font-semibold">8.6</span>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStar />
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-blue-500 border border-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition">
              <FiMessageCircle /> Send Message
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Contacts
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold border-b pb-2">About</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold">Phone:</h4>
              <p className="text-blue-500">+1 123 456 7890</p>
            </div>
            <div>
              <h4 className="font-semibold">Address:</h4>
              <p>525 68th Street, New York, NY</p>
            </div>
            <div>
              <h4 className="font-semibold">Email:</h4>
              <p className="text-blue-500">hello@jeremyrose.com</p>
            </div>
            <div>
              <h4 className="font-semibold">Website:</h4>
              <p className="text-blue-500">www.jeremyrose.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
