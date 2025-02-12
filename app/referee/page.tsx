'use client'

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


// Define schema for form validation
const schema = z.object({
  // Define validation rules for form fields
  fName: z.string().min(2, { message: "First Name is required" }),
  lName: z.string().min(2, { message: "Last Name is required" }),
  email: z.string().email({ message: "Invalid email format" }).min(1, { message: "Email is required" }),
  phone: z.string().min(11, { message: "Phone Number must be 11 digits" }),
  address: z.string().min(1, { message: "Address is required" }),
  relationship: z.string().min(3, { message: "Relationship is required" }),
})

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
            <p>Referee Details</p>
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
              <div className="title text-center mb-5 text-2xl font-bold">Bio Data:</div>

              <div className="field mt-4">
                <label htmlFor="fname" className="label">
                  First Name
                </label>
                <input
                  { ...register("fName") }
                  id="fName"
                  name="fName"
                  className="fname block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2"
                  placeholder="Please your First Name"
                  type="text"
                />
                {errors.fName && (<div className="text-red-500">{errors.fName.message}</div>)}
      
              </div>

              <div className="field mt-4">
                <label htmlFor="lname" className="label">
                  Last Name
                </label>
                <input
                  { ...register("lName") }
                  id="lName"
                  name="lName"
                  className="lname block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2"
                  placeholder="Plaese enter first name"
                  type="text"
                />
                {errors.lName && (<div className="text-red-500">{errors.lName.message}</div>)}
                
              </div>

              <div className="field mt-4">
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  { ...register("email") }
                  id="email"
                  name="email"
                  className="email block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2"
                  placeholder="Please enter your email"
                  type="email"
                />  
                {errors.email && (<div className="text-red-500">{errors.email.message}</div>)}            
              </div>

              <div className="field mt-4">
                <label htmlFor="phone" className="label">
                  Phone
                </label>
                <input
                  { ...register("phone", {
                    required: "Phone Number is required",
                  }) }
                  id="phone"
                  name="phone"
                  placeholder="Please enter your phone number"
                  className="phone block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2"
                  type="phone"                  
                />
                {errors.phone && (<div className="text-red-500">{errors.phone.message}</div>)}                
              </div>

              <div className="field mt-4">
                <label className="label">Address</label>
                <input
                  { ...register("address", {
                    required: "Address is required",
                  }) }
                  id="address"
                  name="address"
                  placeholder="Please enter your address"
                  className="address  block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2"
                  type="text"
                />
                {errors.address && (<div className="text-red-500">{errors.address.message}</div>)}
                
              </div>

              <div className="field mt-4">
                <label className="label">Relationship to Candidate</label>
                <input
                  { ...register("relationship", {
                    required: "relationship is required",
                  }) }
                  id="relationship"
                  name="relationship"
                  placeholder="Please enter your relationship"
                  className="relationship  block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2"
                  type="text"
                />
                {errors.relationship && (<div className="text-red-500">{errors.relationship.message}</div>)}
                
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
