'use client'

import React, { useState } from "react";
import './progressBar.css';
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  fName: z.string().min(2, { message: "First Name is required" }),
  lName: z.string().min(2, { message: "Last Name is required" }),
  email: z.string().email({ message: "Invalid email format" }).min(1, { message: "Email is required" }),
  phone: z.string().min(11, { message: "Phone Number must be 11 digits" }),
  address: z.string().min(1, { message: "Address is required" }),
});

type FormFields = z.infer<typeof schema>;

const Page: React.FC = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const { 
    register, 
    handleSubmit, 
    setError,
    formState: { errors, isSubmitting, isValid }, // Include isValid in formState
    getValues
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const nextSlider = () => {
    setSliderValue(prevValue => prevValue - 43.3);
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevSlider = () => {
    setSliderValue(prevValue => prevValue + 43.3);
    setCurrentPage(prevPage => prevPage - 1);
  };

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
      <section className="lg:h-[95%] lg:w-[48vw] md:h-[80%] md:w-[70vw] bg-white shadow-md rounded-md py-5 overflow-x-hidden">
        <div className="progressBar px-20 mt-12 gap-4 progress-bar w-full flex justify-between items-center">
          <div className="text-center">
            <p>Bio Data</p>
            <div className={`bullet step mt-2 ${currentPage >= 0 ? "active" : ""}`}>
              <span>1</span>
            </div>
            <div className="check fas fa-check"></div>
          </div>
          <div className="text-center">
            <p>Office Dept:</p>
            <div className={`bullet step mt-2 ${currentPage >= 1 ? "active" : ""}`}>
              <span>2</span>
            </div>
            <div className="check fas fa-check"></div>
          </div>
        </div>

        <div className="form-outer">
          <form onSubmit={handleSubmit(onSubmit)} action="#" method="POST" className={`mt-12 md:w-[85vw] flex overflow-x-hidden`} style={{ marginLeft: `${sliderValue}vw` }}>
            <div className="page ml-[5rem] w-1/2">
              <div className="title text-center mb-5">Bio Data:</div>
              {renderInput("fName", "First Name", "Please enter your First Name", register, errors)}
              {renderInput("lName", "Last Name", "Please enter your Last Name", register, errors)}
              {renderInput("email", "Email", "Please enter your email", register, errors)}
              {renderInput("phone", "Phone", "Please enter your phone number", register, errors)}

              <div className="field my-12  ml-[48%]">
                <button className="flex items-center gap-1 borderButtomHoverFromLeft  borderButtomHoverToRight" onClick={nextSlider}>Next <div className="border-2 p-1 rounded-sm"><ChevronsRight /></div></button>
              </div>
            </div>

            <div className="page ml-[5rem] w-1/2">
              <div className="title text-center mb-5">Office Dept:</div>
              {renderInput("school", "Department", "Please enter your department", register, errors)}
              {renderInput("startDate", "Hired Date", "", register, errors, "date")}
              <div className="field flex flex-col gap-1 pt-4">
                <label htmlFor="endDate" className="label">Upload Credentials</label>
                <input id="file" className="file mt-1" type="file" />
              </div>

              <div className="field mt-8 btns">
                <button className="flex items-center gap-1 borderButtomHoverFromRight borderButtomHoverToLeft" onClick={prevSlider}><div className="border-2 p-1 rounded-sm"><ChevronsLeft /></div> Previous</button>
                <button disabled={isSubmitting} className="inline-block bg-gray-700 rounded-sm border-gray-700 w-full mt-8 p-2 text-white text-md font-semibold" type="submit">
                  {isSubmitting ? "Loading" : "Submit" }
                </button>
                {errors.root && typeof errors.root === 'string' && (<div className="text-red-500">{errors.root}</div>)}
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

const renderInput = (name: string, label: string, placeholder: string, register: any, errors: any, type: string = "text") => (
  <div className="field mt-4">
    <label htmlFor={name} className="label">{label}</label>
    <input
      {...register(name)}
      id={name}
      name={name}
      className={`${name} block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2`}
      placeholder={placeholder}
      type={type}
    />
    {errors[name] && (<div className="text-red-500">{errors[name].message}</div>)}
  </div>
);

export default Page;
