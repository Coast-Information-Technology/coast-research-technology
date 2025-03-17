'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import {
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaJs,
  FaPython,
  FaDocker,
  FaNodeJs,
  FaReact,
  FaHtml5,
  FaCss3Alt,
} from 'react-icons/fa';
import {
  SiPrisma,
  SiExpress,
  SiNestjs,
  SiTailwindcss,
  SiMongodb,
} from 'react-icons/si';
import { motion } from 'framer-motion';
import { MdRadioButtonChecked } from 'react-icons/md';
import { FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';

// Define status icons
const statusIcons = {
  'Active Student': <MdRadioButtonChecked className="text-green-500 text-lg" />,
  Alumni: <FaGraduationCap className="text-[#800080] text-xl" />,
  Tutor: <FaChalkboardTeacher className="text-orange-500 text-lg" />,
};

const skillIcons = {
  JavaScript: <FaJs className="text-yellow-500 text-xl" />,
  Python: <FaPython className="text-blue-500 text-xl" />,
  Docker: <FaDocker className="text-blue-400 text-xl" />,
  Prisma: <SiPrisma className="text-gray-700 text-xl" />,
  NextJS: <FaReact className="text-gray-800 text-xl" />,
  NodeJS: <FaNodeJs className="text-green-500 text-xl" />,
  ExpressJS: <SiExpress className="text-black text-xl" />,
  NestJS: <SiNestjs className="text-red-500 text-xl" />,
  HTML: <FaHtml5 className="text-orange-500 text-xl" />,
  CSS: <FaCss3Alt className="text-blue-500 text-xl" />,
  TailwindCSS: <SiTailwindcss className="text-blue-400 text-xl" />,
  DataScience: '📊',
  Cybersecurity: '🔒',
  'Database Administration': <SiMongodb className="text-green-700 text-xl" />,
};

const ProfilePage = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');

  // Example mock data (Replace with API call based on slug)
  const profile = {
    firstName: 'Kolade',
    middleName: 'Agboola',
    lastName: 'Nelson',
    profilePicture: '/kolade-agboola-nelson.jpeg',
    role: 'Database Administration',
    id: 'CRT-12345',
    status: 'Alumni',
    // qrCode: '/qrcode.png',
    skills: [
      'JavaScript',
      'Python',
      'Docker',
      'Prisma',
      'NextJS',
      'NodeJS',
      'ExpressJS',
      'NestJS',
      'HTML',
      'CSS',
      'TailwindCSS',
      'DataScience',
      'Cybersecurity',
      'Database Administration',
    ],
    courses: ['Full Stack Development', 'Cybersecurity Intermediate'],
    projects: [
      {
        name: 'Portfolio Website',
        link: 'https://github.com/johndoe/portfolio',
      },
      { name: 'AI Chatbot', link: 'https://github.com/johndoe/chatbot' },
    ],
    achievements: ['Top Performer', 'AWS Certified'],
    socialLinks: {
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      website: 'https://johndoe.dev',
    },
  };

  return (
    <section className="max-w-6xl mx-auto p-8 space-y-4 min-h-screen mt-[7rem]">
      {/* Hero Section */}
      <motion.div
        className="relative bg-gradient-to-r from-[#800080] to-[#df80ff] rounded-lg p-8 text-center shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeIn' }}
      >
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <Image
            src={profile.profilePicture}
            width={120}
            height={120}
            className="rounded-full border-4 border-white shadow-md"
            alt="Profile Picture"
          />
        </div>
        <h2 className="mt-14 text-3xl font-bold text-white">
          {profile.firstName} {profile.middleName} {profile.lastName}
        </h2>
        <p className="text-white/80 font-medium flex items-center gap-2 justify-center">
          {profile.role}{' '}
          {statusIcons[profile.status as keyof typeof statusIcons]}{' '}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
        {/* Verification & Status */}
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 transition-all hover:shadow-2xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeIn' }}
        >
          <h2 className="text-lg font-semibold text-gray-700">
            Verification & Status
          </h2>
          <p>
            <strong>ID:</strong> {profile.id}
          </p>
          <p className="flex items-center gap-2 mt-2">
            <strong>Status:</strong>{' '}
            {statusIcons[profile.status as keyof typeof statusIcons]}{' '}
            {profile.status}
          </p>
        </motion.div>

        {/* Achievements */}
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 transition-all hover:shadow-2xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeIn' }}
        >
          <h2 className="text-lg font-semibold text-gray-700">Achievements</h2>
          <ul className="list-disc ml-5 text-gray-600">
            {profile.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {/* Courses */}
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 transition-all hover:shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeIn' }}
        >
          <h2 className="text-lg font-semibold text-gray-700">Courses</h2>
          <ul className="list-disc ml-5 text-gray-600">
            {profile.courses.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
        </motion.div>

        {/* Skills & Expertise */}
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 transition-all hover:shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeIn' }}
        >
          <h2 className="text-lg font-semibold text-gray-700">
            Skills & Expertise
          </h2>
          <ul className="grid grid-cols-2 gap-4 mt-4">
            {profile.skills.map((skill, index) => (
              <li key={index} className="flex items-center gap-2">
                {skillIcons[skill as keyof typeof skillIcons] || '🔹'} {skill}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Projects */}
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 transition-all hover:shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeIn' }}
        >
          <h2 className="text-lg font-semibold text-gray-700">Projects</h2>
          <ul className="mt-2">
            {profile.projects.map((project, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-[#800080] hover:underline"
              >
                <FaGithub />
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfilePage;
