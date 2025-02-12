'use client'

import React, { useState } from "react";
import './progressBar.css';
import './page.module.css';
import { ChevronsLeft, ChevronsRight, Eye, EyeOff } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define schema for form validation
const schema = z.object({
  // Define validation rules for form fields
  fName: z.string().min(2, { message: "First Name is required" }),
  lName: z.string().min(2, { message: "Last Name is required" }),
  email: z.string().email({ message: "Invalid email format" }).min(1, { message: "Email is required" }),
  password: z.string().min(5, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string().min(5, { message: "Confirm Password is required" }),
  phone: z.string().min(11, { message: "Phone Number must be 11 digits" }),
  address: z.string().min(1, { message: "Address is required" }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // Corrected path
});

type FormFields = z.infer<typeof schema>;

const Page: React.FC = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field: string) => {
    if (field === "password") {
      setShowPassword((prev) => !prev);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  const { 
    register, 
    handleSubmit, 
    setError,
    formState: {errors, isSubmitting},
    getValues
  } = useForm<FormFields>(
    {
      resolver: zodResolver(schema),
    } 
  );

  const nextSlider = () => {
    setSliderValue(prevValue => prevValue - 43.3);
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevSlider = () => {
    setSliderValue(prevValue => prevValue + 43.3);
    setCurrentPage(prevPage => prevPage - 1);
  };

  // const handleNextButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
  //   const inputData = getValues(); // Get all input values
  //   // Validate the input data against the schema
  //   const validationResult = schema.safeParse(inputData);
  //   if (validationResult.success && inputData.password === inputData.confirmPassword) {
  //     // If validation succeeds and passwords match, proceed to the next slider
  //     nextSlider();
  //   } else {
  //     // If validation fails or passwords don't match, set errors for each field
  //     validationResult.error.errors.forEach(error => {
  //       setError(error.path.join("."), { message: error.message });
  //     });
      
  //     // Check if passwords don't match
  //     if (inputData.password !== inputData.confirmPassword) {
  //       setError("confirmPassword", { message: "Passwords do not match" });
  //     }
      
  //     // Log a message indicating that the form is incomplete
  //     console.log("Please fill in all the required fields correctly before proceeding.");
  //   }
  // };

  // Define form submission handler
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
      console.log(data)
    // Handle form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      throw new Error()
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      })
    }
  };

  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <section className="lg:h-[95%] lg:w-[48vw] md:h-[80%] md:w-[70vw] bg-white shadow-md rounded-md py-5 overflow-x-hidden">
        <div className="progressBar px-10 pt-12 gap-4 progress-bar w-full flex justify-between items-center">
          {/* Apply styles based on the currentPage */}
          <div className="text-center">
            <p>Bio Data</p>
            <div className={`bullet step mt-2 ${currentPage >= 0 ? "active" : ""}`}>
              <span>1</span>
            </div>
            <div className="check fas fa-check"></div>
          </div>
          <div className="text-center">
            <p>Education Experience</p>
            <div className={`bullet step mt-2 ${currentPage >= 1 ? "active" : ""}`}>
              <span>2</span>
            </div>
            <div className="check fas fa-check"></div>
          </div>
          <div className="text-center">
            <p>Work Experience</p>
            <div className={`bullet step mt-2 ${currentPage >= 2 ? "active" : ""}`}>
              <span>3</span>
            </div>
            <div className="check fas fa-check"></div>
          </div>
          <div className="text-center">
            <p>Professional Skills</p>
            <div className={`bullet step mt-2 ${currentPage >= 3 ? "active" : ""}`}>
              <span>4</span>
            </div>
            <div className="check fas fa-check"></div>
          </div>
          <div className="text-center">
            <p>Resume & Job Type</p>
            <div className={`bullet step mt-2 ${currentPage >= 4 ? "active" : ""}`}>
              <span>5</span>
            </div>
            <div className="check fas fa-check"></div>
          </div>
        </div>

        <div className="form-outer">
          <form
            onSubmit={handleSubmit(onSubmit)}
            action="#"
            method="POST"
            className={`mt-12 w-[216vw] flex overflow-x-hidden`}
            style={{ marginLeft: `${sliderValue}vw` }}
          >
            <div className="page lg:ml-[4rem] md:ml-[3rem] w-1/5">
              <div className="title text-center mb-5">Bio Data:</div>

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
                <label htmlFor="password" className="label">
                  Password
                </label>
                <div className=" block relative rounded-sm border-gray-300 w-full mt-2">
                  <input
                    {...register("password")}
                    id="password"
                    className="w-full p-2 rounded-sm bg-muted"
                    placeholder="Please enter your password"
                    type={showPassword ? "text" : "password"}
                  />
                  {errors.password && (
                    <div className="text-red-500">{errors.password.message}</div>
                  )}
                  {showPassword ? (
                    <Eye
                      className="absolute right-2 bottom-2 cursor-pointer"
                      onClick={() => togglePasswordVisibility("password")}
                    />
                  ) : (
                    <EyeOff
                      className="absolute right-2 bottom-2 cursor-pointer"
                      onClick={() => togglePasswordVisibility("password")}
                    />
                  )}
                </div>
              </div>
              
              <div className="field mt-4">
                <label htmlFor="confirmPassword" className="label">
                  Confirm Password
                </label>
                <div className=" block relative rounded-sm border-gray-300 w-full mt-2">
                  <input
                  { ...register( "confirmPassword" ) }
                    className="w-full p-2 rounded-sm bg-muted"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    type={showConfirmPassword ? "text" : "password"}
                  />
                  {errors.confirmPassword && (
                    <div className="text-red-500">{errors.confirmPassword.message}</div>
                  )}
                   {showConfirmPassword ? (
                    <Eye
                      className="absolute right-2 bottom-2 cursor-pointer"
                      onClick={() => togglePasswordVisibility("confirmPassword")}
                    />
                  ) : (
                    <EyeOff
                      className="absolute right-2 bottom-2 cursor-pointer"
                      onClick={() => togglePasswordVisibility("confirmPassword")}
                    />
                  )}
                </div>
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
              <div className="field mt-12 ml-[48%]">
                <button className="flex items-center gap-1 borderButtomHoverFromLeft  borderButtomHoverToRight" type="button" onClick={nextSlider}>Next <div className="border-2 p-1 rounded-sm"><ChevronsRight /></div></button>
              </div>
            </div>

            <div className="page ml-[4rem] w-1/5">
              <div className="title text-center mb-5">Education Experience:</div>
              <div className="field">
                <label htmlFor="school" className="label">
                  School
                </label>
                <input
                  id="school"
                  name="school"
                  className="school block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2"
                  type="text"
                />
              </div>

              <div className="field">
                <label htmlFor="degree" className="label">
                  Degree
                </label>
                <input
                  id="degree"
                  name="degree"
                  className="degree block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2"
                  type="text"
                />
              </div>

              <div className="field">
                <label htmlFor="fieldOfStudy" className="label">
                  Field of Study
                </label>
                <input
                  id="fieldOfStudy"
                  name="fieldOfStudy"
                  className="fieldOfStudy block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2"
                  type="text"
                />
              </div>

              <div className="field">
                <label htmlFor="startDate" className="label">
                  Start Date
                </label>
                <input
                  id="startdate"
                  name="startDate"
                  className="startDate block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2"
                  type="date"
                />
              </div>

              <div className="field">
                <label htmlFor="endDate" className="label">
                  End Date
                </label>
                <input
                  id="enddate"
                  name="endDate"
                  className="endDate block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2"
                  type="date"
                />
              </div>

              <div className="flex items-center mt-12 gap-20 field btns">
                <button className="flex items-center gap-1 borderButtomHoverFromRight borderButtomHoverToLeft" type="button" onClick={prevSlider}><div className="border-2 p-1 rounded-sm"><ChevronsLeft /></div>Previous</button>
                <button className="flex items-center gap-1 borderButtomHoverFromLeft borderButtomHoverToRight" type="button" onClick={nextSlider}>Next<div className="border-2 p-1 rounded-sm"><ChevronsRight /></div></button>
              </div>
            </div>

            <div className="page ml-[4rem] w-1/5">
              <div className="title text-center mb-5">Work Experience:</div>
              <div className="field">
                <label htmlFor="jobTitle" className="label">
                  Job Title
                </label>
                <input
                  id="jobTitle"
                  name="jobTitle"
                  className="jobTitle block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2"
                  type="text"
                />
              </div>
              <div className="field">
                <label htmlFor="employer" className="label">
                  Employer
                </label>
                <input
                  id="employer"
                  name="employer"
                  className="employer block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2"
                  type="text"
                />
              </div>
              <div className="field">
                <label htmlFor="state" className="label">
                  State
                </label>
                <input id="state" name="state" className="state block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2" type="text" />
              </div>
              <div className="field">
                <label htmlFor="city" className="label">
                  City
                </label>
                <input id="city" name="city" className="city block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2" type="text" />
              </div>
              <div className="field">
                <label htmlFor="country" className="label">
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  className="country block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2"
                  type="text"
                />
              </div>
              <div className="field">
                <label htmlFor="startDate" className="label">
                  Start Date
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  className="startDate block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2"
                  type="date"
                />
              </div>
              <div className="field">
                <label htmlFor="endDate" className="label">
                  End Date
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  className="endDate block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2"
                  type="date"
                />
              </div>
              <div className="field">
                <label htmlFor="description" className="label">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  cols={30}
                  rows={10}
                  className="block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2"
                ></textarea>
              </div>

              <div className="flex items-center gap-20 mt-12 field btns">
                <button className="flex items-center gap-1 borderButtomHoverFromRight borderButtomHoverToLeft" type="button" onClick={prevSlider}><div className="border-2 p-1 rounded-sm"><ChevronsLeft /></div> Previous</button>
                <button className="flex items-center gap-1 borderButtomHoverFromLeft borderButtomHoverToRight" type="button" onClick={nextSlider}>Next <div className="border-2 p-1 rounded-sm"><ChevronsRight /></div> </button>
              </div>
            </div>

            <div className="page ml-[4rem] w-1/5">
              <div className="title text-center mb-5">Professional Skills:</div>
              <div className="field">
                <label htmlFor="name" className="label">
                  Name
                </label>
                <input id="name" name="name" className="name block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2" type="text" />
              </div>
              <div className="field pt-4">
                <label htmlFor="proficiency" className="label">
                  Proficiency
                </label>
                <select name="proficiency" id="proficiency" className="block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2">
                  <option value="">Please select the proficiency</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div className="flex items-center mt-12 gap-20 field btns">
                <button className="flex items-center gap-1 borderButtomHoverFromRight borderButtomHoverToLeft" type="button" onClick={prevSlider}><div className="border-2 p-1 rounded-sm"><ChevronsLeft /></div>Previous</button>
                <button className="flex items-center gap-1 borderButtomHoverFromLeft borderButtomHoverToRight" type="button" onClick={nextSlider}>Next<div className="border-2 p-1 rounded-sm"><ChevronsRight /></div></button>
              </div>
            </div>

            <div className="page ml-[4rem] w-1/5">
              <div className="title text-center mb-5">Resume & Job Preferences</div>
              <div className="field">
                <label htmlFor="uploadResume" className="label">
                  Please Upload Your CV / Resume
                </label>
                <input id="file" className="file mt-1" type="file" />
              </div>
              <div className="field pt-4">
                <label htmlFor="jobType" className="label">
                  Preferred Job Type
                </label>
                <select name="jobType" id="jobtype" className="block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2">
                  <option value="">Please select the Job Type</option>
                  <option value="Fulltime">Fulltime</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div className="field pt-4">
                <label htmlFor="jobType" className="label">
                  Preferred Job Location
                </label>
                <select name="jobType" id="jobType" className="block bg-muted rounded-sm border-gray-300 w-full mt-2 p-2">
                  <option value="">
                    Please select your preferred Job Location
                  </option>
                  <option value="Willingness to relocate">
                    Willingness to relocate (You will have better opportunity)
                  </option>
                  <option value="Lagos">Lagos</option>
                  <option value="Ibadan">Ibadan</option>
                </select>
              </div>
              <div className="field mt-8 btns">
                <button className="flex items-center gap-1 borderButtomHoverFromRight borderButtomHoverToLeft" type="button" onClick={prevSlider}><div className="border-2 p-1 rounded-sm"><ChevronsLeft /></div> Previous</button>
                <button disabled={ isSubmitting } className="inline-block bg-gray-700 rounded-sm border-gray-700 hover:bg-gray-600 hover:border-gray-600 w-full mt-8 p-2 text-white text-md font-semibold" type="submit">
                  {isSubmitting ? "Loading" : "Submit" }
                </button>
                
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
