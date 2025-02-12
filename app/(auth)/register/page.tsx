'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { emailPasswordResetLink, postApiRequest } from '@/lib/apiRequest';
import { signUpSchema } from '@/lib/zodDefinition';
// import { ModeToggle } from '@/utils/modeToggler';
import { Eye, EyeOff, Lock, Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { TbEyeClosed } from 'react-icons/tb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const SignUpPage: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [pending, setPending] = useState(false);
  const [countdown, setCountdown] = useState(180); // 3 minutes countdown
  const [showResend, setShowResend] = useState(false);

  useEffect(() => {
    const validationResult = signUpSchema.safeParse(formData);
    if (!validationResult.success) {
      const newErrors: { [key: string]: string } = {};
      validationResult.error.errors.forEach((error) => {
        if (error.path.length > 0) {
          newErrors[error.path[0] as string] = error.message;
        }
      });
      setErrors(newErrors);
    } else {
      setErrors({});
    }
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setErrors({});

    const validationResult = signUpSchema.safeParse(formData);
    if (!validationResult.success) {
      const newErrors: { [key: string]: string } = {};
      validationResult.error.errors.forEach((error) => {
        if (error.path.length > 0) {
          newErrors[error.path[0] as string] = error.message;
        }
      });
      setErrors(newErrors);
      setPending(false);
      return;
    }

    // try {
    //   const response = await postApiRequest('/api/signup/', {
    //     email: formData.email,
    //     phone_number: formData.phoneNumber,
    //     password: formData.password,
    //   });

    //   if (response.data) {
    //     toast.success('Signup successful, please verify your email address');
    //     setShowResend(true);
    //     setCountdown(180);
    //   } else {
    //     const errorMessage = response.message || 'An unexpected error occurred';
    //     setErrors({ general: errorMessage });
    //     toast.error(errorMessage);
    //     setPending(false);
    //   }
    // } catch (error: any) {
    //   const errorMessage =
    //     error instanceof Error ? error.message : 'An unexpected error occurred';
    //   setErrors({ general: errorMessage });
    //   toast.error(errorMessage);
    //   setPending(false);
    // }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setPending(false);
      setShowResend(true);
    }
  }, [countdown]);

  // const handleResendActivationLink = async () => {
  //   try {
  //     await emailPasswordResetLink(formData.email);
  //     setCountdown(180);
  //     setShowResend(false);
  //     setPending(true);
  //     toast.success(
  //       'Activation link resent successfully. Please check your email.'
  //     );
  //   } catch (error) {
  //     const errorMessage =
  //       error instanceof Error
  //         ? error.message
  //         : 'Failed to resend activation link';
  //     setErrors({ general: errorMessage });
  //     toast.error(errorMessage);
  //   }
  // };

  return (
    <main className="flex">
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

      <section className="h-[100vh] w-full flex justify-center items-center bg-none dark:bg-[#222222]">
        <ToastContainer />
        <div className="space-y-2 p-6 md:p-8 rounded-md flex flex-col justify-center m-auto min-w-[90vw] md:min-w-[35vw] h-[100vh] sm:h-[92vh] dark:bg-[#272727]">
          <Link href="/">
            <div className="flex lg:hidden p-4 rounded-md text-white font-bold text-2xl gap-2">
              <Image
                src="/coastresearch.svg"
                alt="coast research technology brand logo"
                height={160}
                width={160}
              />
              {/* <h2 className="text-[#800080] font-semibold pr-20 text-[1.7rem] leading-7">
                Coast
                <br />
                Research
                <br />
                Technology
              </h2> */}
            </div>
          </Link>
          <div className="pb-6">
            <h1 className="text-2xl font-bold text-foreground">
              Create a New Account
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Already have an account?{' '}
              <span className="text-[#800080] dark:text-gray-300 font-bold underline">
                <Link href="/login">Login</Link>
              </span>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="text-foreground">
              <div className="border-b border-gray-300 flex items-center">
                <Input
                  id="email"
                  placeholder="Please enter your email"
                  className="bg-gray-100 rounded-[15px] px-6 py-8 border-0 font-semibold text-gray-500"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              {/* {errors.email && <p className="text-red-500">{errors.email}</p>} */}
            </div>
            {/* Phone Number */}
            <div className="text-foreground">
              <div className="border-b border-gray-300 flex items-center">
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Please enter your phone number"
                  className="bg-gray-100 rounded-[15px] px-6 py-8 border-0 font-semibold text-gray-500"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              {/* {errors.phoneNumber && (
                <p className="text-red-500">{errors.phoneNumber}</p>
              )} */}
            </div>

            {/* Password */}
            <div className="text-foreground">
              <div className="border-b border-gray-300 flex items-center relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="bg-gray-100 rounded-[15px] px-6 py-8 border-0 font-semibold text-gray-500"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {showPassword ? (
                  <Eye
                    size={22}
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer absolute z-20 right-4"
                  />
                ) : (
                  <TbEyeClosed
                    size={22}
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer absolute z-20 right-4"
                  />
                )}
              </div>
              {/* {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )} */}
            </div>

            {/* Confirm Password */}
            <div className="text-foreground pb-8">
              <div className="border-b border-gray-300 flex items-center relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  className="bg-gray-100 rounded-[15px] px-6 py-8 border-0 font-semibold text-gray-500 relative"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                {showConfirmPassword ? (
                  <Eye
                    size={22}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="cursor-pointer absolute z-20 right-4"
                  />
                ) : (
                  <TbEyeClosed
                    size={22}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="cursor-pointer absolute z-20 right-4"
                  />
                )}
              </div>
              {/* {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword}</p>
              )} */}
            </div>
            {/* {errors.general && <p className="text-red-500">{errors.general}</p>} */}
            <div className="relative">
              <Button
                disabled={pending && countdown > 0} // Disable during countdown
                // onClick={pending ? handleResendActivationLink : undefined} // Handle click based on the state
                className="w-full bg-[#800080] hover:bg-[#bb48bb] text-[#ccc] py-8 rounded-[15px] dark:bg-emerald-500"
              >
                {pending && countdown > 0
                  ? `Resend Activation Link in ${Math.floor(countdown / 60)
                      .toString()
                      .padStart(2, '0')}:${(countdown % 60)
                      .toString()
                      .padStart(2, '0')}`
                  : pending
                  ? 'Resend Activation Link'
                  : 'Sign Up'}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default SignUpPage;
