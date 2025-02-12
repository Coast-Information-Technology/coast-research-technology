'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { postApiRequest } from '@/lib/apiRequest';
// import { saveTokenToCookies } from '@/lib/cookies';
import { Eye, EyeOff, Lock, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, FormEvent } from 'react';
import { TbEyeClosed } from 'react-icons/tb';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { FaArrowCircleLeft } from 'react-icons/fa';

interface LoginFormErrors {
  phone_number?: string;
  password?: string;
  general?: string;
}

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [phone_number, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const router = useRouter();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // try {
    //   const response = await postApiRequest('/api/login/', {
    //     phone_number,
    //     password,
    //   });

    //   const token = response?.User?.access_token;
    //   if (token) {
    //     saveTokenToCookies(token);
    //     localStorage.setItem('isLoggedIn', 'true');
    //     toast.success('Login Successful!');
    //     router.push('/dashboard'); // Direct navigation to dashboard
    //   } else {
    //     throw new Error('Invalid login response structure');
    //   }
    // } catch (error: any) {
    //   const errorMessage =
    //     error.response?.data?.message || error.message || 'Login failed';
    //   setErrors((prevErrors) => ({ ...prevErrors, general: errorMessage }));
    //   toast.error(errorMessage);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <main className="flex">
      {/* Login Form Section */}
      <section className="w-full h-[100vh] flex items-center justify-center bg-background dark:bg-[#222222] overflow-hidden">
        <form
          onSubmit={handleLogin}
          className="space-y-4 shadow-xl lg:shadow-none mx-auto min-w-[90vw] md:min-w-[35vw] p-10 rounded-md dark:bg-[#272727]"
          aria-label="login-form"
        >
          {/* Mobile Logo */}
          <Link href="/" aria-label="homepage">
            <div className="flex lg:hidden items-center justify-center p-4 rounded-md text-white font-bold text-2xl gap-2 bg-gradient-to-r from-orange-300 via-orange-400 to-red-600 dark:from-indigo-500 dark:via-sky-500 dark:to-emerald-500">
              <Image
                src="/assets/sharp_credit.webp"
                alt="sharp credit brand logo"
                height={50}
                width={50}
              />
              <p>Sharp Credit</p>
            </div>
          </Link>

          {/* Welcome Text */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold dark:text-foreground">
              Welcome back!
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Don{"'"}t have an account?{' '}
              <span className="text-red-500 dark:text-emerald-500 font-bold underline">
                <Link href="/register">Sign up</Link>
              </span>
            </p>
          </div>

          {/* Phone Number Input */}
          <div className="dark:text-foreground pt-7">
            <div className="border-b border-gray-300 flex items-center gap-2">
              <Phone size={22} color="#bbb" />
              <Input
                id="phone_number"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone number"
                required
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                aria-label="phone number"
                className="border-b-0 border-gray-300 bg-transparent"
              />
            </div>
            {errors.phone_number && (
              <p className="text-red-500">{errors.phone_number}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="dark:text-foreground">
            <div className="border-b border-gray-300 flex items-center gap-2">
              <Lock size={22} color="#bbb" />
              <Input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                aria-label="password"
                className="border-b-0 border-gray-300 bg-transparent"
              />
              {showPassword ? (
                <Eye
                  size={22}
                  onClick={togglePasswordVisibility}
                  className="cursor-pointer"
                  aria-label="hide password"
                />
              ) : (
                <TbEyeClosed
                  size={22}
                  onClick={togglePasswordVisibility}
                  className="cursor-pointer"
                  aria-label="show password"
                />
              )}
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>

          {/* General Error */}
          {errors.general && <p className="text-red-500">{errors.general}</p>}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full primary-button dark:bg-emerald-500"
          >
            {loading ? (
              <span className="flex items-center">
                Logging in{' '}
                <span className="spin mx-2 w-4 h-4 border-2 border-t-2 border-white rounded-full"></span>
              </span>
            ) : (
              'Login'
            )}
          </Button>

          {/* Forgot Password Link */}
          <p className="text-sm dark:text-gray-400">
            Forgot password?{' '}
            <Link
              href="/forgot-password"
              className="text-red-500 dark:text-emerald-500 font-bold underline"
            >
              Recover password
            </Link>
          </p>
        </form>
      </section>

      {/* Left Section */}
      <div
        className="hidden relative lg:flex flex-col pl-14 pr-20 my-6 ml-6 rounded-[32px] justify-center w-full h-[100vh] gap-8 backdrop-lg"
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
