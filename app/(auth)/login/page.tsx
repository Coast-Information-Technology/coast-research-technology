'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, FormEvent } from 'react';
import { TbEyeClosed } from 'react-icons/tb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { saveTokenToCookies } from '@/lib/cookies';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ general?: string }>({});
  const router = useRouter();

  const url = process.env.NEXT_PUBLIC_API_URL;

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${url}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please try again.');
      }

      if (data.access_token) {
        saveTokenToCookies('token', data.access_token);
        toast.success('Logged in successfully!');
        router.push('/dashboard');
      } else {
        throw new Error('Invalid login response: Missing access token');
      }
    } catch (error: unknown) {
      console.error('Login Error:', error);
      setErrors({
        general: error instanceof Error ? error.message : 'An error occurred',
      });
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex">
      {/* Login Form Section */}
      <section className="w-full h-[100vh] flex items-center justify-center overflow-hidden">
        <form
          onSubmit={handleLogin}
          className="space-y-4 mx-auto min-w-[90vw] md:min-w-[35vw] p-10 rounded-md"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-bold dark:text-foreground">
              Welcome back!
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Don{"'"}t have an account?{' '}
              <Link
                href="/register"
                className="text-[#800080] dark:text-gray-300 font-bold underline"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Email */}
          <Input
            id="email"
            placeholder="Please enter your email"
            className="bg-gray-100 rounded-[15px] px-6 py-8 border-0 font-semibold text-gray-500"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input */}
          <div className="relative">
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Please enter your password"
              className="bg-gray-100 rounded-[15px] px-6 py-8 border-0 font-semibold text-gray-500"
            />
            {showPassword ? (
              <Eye
                size={22}
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2"
              />
            ) : (
              <TbEyeClosed
                size={22}
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2"
              />
            )}
          </div>

          {errors.general && <p className="text-red-500">{errors.general}</p>}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#800080] hover:bg-[#bb48bb] text-[#ccc] py-8 rounded-[15px] dark:bg-emerald-500"
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          <p className="text-sm dark:text-gray-400">
            Forgot password?{' '}
            <Link
              href="/forgot-password"
              className="text-[#800080] dark:text-gray-300 font-bold underline"
            >
              Recover password
            </Link>
          </p>
        </form>
      </section>

      {/* Left Section */}
      <div
        className="hidden relative lg:flex flex-col pl-14 pr-20 mx-6 mt-4 rounded-[32px] justify-center w-full h-[95vh] gap-8 backdrop-lg align-center"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0), rgba(0,0,0,0.3)), url('/library2.jpg')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom right',
          backdropFilter: '30px',
          WebkitBackdropFilter: '30px',
        }}
      >
        <div className="absolute z-10 bg-[rgba(50,18,46,0.7)] rounded-[32px] inset-0"></div>
        <Link
          href="/"
          className="flex relative lg:z-30 gap-2 items-center text-white"
        >
          <FaArrowCircleLeft /> <p>Go to Home</p>
        </Link>
        <div className="flex relative lg:z-30 items-center gap-1">
          <Image
            src="/logoCoast.png"
            alt="Coast Research Technology brand logo"
            height={100}
            width={100}
          />
          <h1 className="text-white font-semibold pr-20 text-[1.7rem] leading-7">
            Coast
            <br />
            Research
            <br />
            Technology
          </h1>
        </div>
        <p className="text-white text-[1rem] font-light text-justify w-[33vw] relative z-30">
          Get instant access to instant cash loans for emergency and personal
          loans within the next 24hrs. Service is available to federal and state
          civil servants under the remita payroll.
        </p>
        {/* Footer */}
        <p className="text-[10px] bottom-8 text-white pt-6 font-light absolute z-30">
          © 2024 Sharp Credit. All rights reserved.
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
