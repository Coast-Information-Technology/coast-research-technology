'use client'

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


// Define schema for form validation using Zod
const schema = z.object({
  // Define validation rules for form fields
  name: z.string().min(2, { message: "Name is required" }),
  currency: z.string(),
  frequency: z.string(),
});

// Define type for form fields
type FormFields = z.infer<typeof schema>;

const Page: React.FC = () => {
  const [currentPage] = useState(0);

  // Initialize form hooks for form handling and validation
  const { 
    register, 
    handleSubmit, 
    setError,
    formState: {errors, isSubmitting},
  } = useForm<FormFields>(
    {
      resolver: zodResolver(schema), // Use Zod resolver for form validation
    } 
  );

  // Define form submission handler
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data)
    // Handle form submission
    try {
      // Simulate asynchronous submission
      await new Promise((resolve) => setTimeout(resolve, 3000));
      // Successfully submitted
      console.log("Form submitted successfully!");

    } catch (error) {
      // Submission error
      setError("root", {
        message: "Submission failed. Please try again later.",
      });
    }
  };

  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <section className="lg:h-[95%] lg:w-[50vw] md:h-[80%] md:w-[70vw] bg-white shadow-md rounded-md py-5 overflow-x-hidden">
        {/* Progress bar */}
        <div className="progressBar px-20 mt-8 gap-4 progress-bar w-full flex justify-between items-center">
          <div className="text-center justify-center items-center w-[50vw]">
            {/* Current step */}
            <p>Salary</p>
          </div>
        </div>

        {/* Form */}
        <div className="form-outer">
          <form
            onSubmit={handleSubmit(onSubmit)}
            action="#"
            method="POST"
            className={`mt-12 md:w-full flex overflow-x-hidden`}
          >
            <div className="page px-12 w-full">
              <div className="title text-center mb-5 text-2xl font-bold">Salary:</div>
              {/* Name field */}
              <div className="field">
                <label htmlFor="name" className="label">
                  Amount
                </label>
                <input {...register("name")} id="name" name="name" className="name block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2" type="text" />
                {errors.name && <div className="text-red-500">{errors.name.message}</div>}
              </div>

              {/* currency field */}
              <div className="field pt-4">
                <label htmlFor="currency" className="label">
                  Currency
                </label>
                <select {...register("currency")} name="currency" id="currency" className="block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2">
                  <option value="">Please select your Salary currency</option>
                  <option value="dollar">&#36;</option>
                  <option value="naira">&#8358;</option>
                  <option value="euro">&#8364;</option>
                  <option value="pound">&#163;</option>
                </select>
              </div>

              {/* frequency field */}
              <div className="field pt-4">
                <label htmlFor="frequency" className="label">
                  Frequency
                </label>
                <select {...register("frequency")} name="frequency" id="frequency" className="block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2">
                  <option value="">Please select your Salary Frequency</option>
                  <option value="Beginner">per annum</option>
                  <option value="Intermediate">per month</option>
                </select>
              </div>
              {/* Submit button */}
              <div className="field mt-8 btns">
                <button disabled={isSubmitting} className="inline-block bg-gray-700 rounded-sm border-gray-700 hover:bg-gray-600 hover:border-gray-600 w-full mt-8 p-2 text-white text-md font-semibold" type="submit">
                  {isSubmitting ? "Loading..." : "Submit" }
                </button>
                {/* Submission error */}
                {errors.root && typeof errors.root === 'string' && (
                  <div className="text-red-500">{errors.root}</div>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Page;
