import { z } from 'zod';

// Define the Sign Up Zod schema
export const signUpSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    phoneNumber: z
      .string()
      .min(11, 'Phone number must be at least 11 digits')
      .max(11, 'Phone number must be at most 11 digits'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z
      .string()
      .min(8, 'Confirm Password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// Define the Zod schema
export const LoginFormSchema = z.object({
  phone: z
    .string()
    .min(11, 'Phone number must be at least 11 digits')
    .max(11, 'Phone number must be at most 11 digits'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type FormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
        phoneNumber?: number[];
        // bankCode?: number[];
        // desiredAmount?: number[];
        // duration?: string[];
        // accountNumber?: number[];
      };
      message?: string;
    }
  | undefined;
