'use client'

import Image from "next/image";
import React from "react";
import "./career.css"

const CareerPage: React.FC = () => {

    return (
        <main>
            <section className="career">
                <div className="career-seat">
                    <Image src="/chair.png" alt="Chair" width={500} height={500} />
                </div>
                <div className="career-search career-text">
                    <h2 className="toggle-h2">SEARCHING FOR <br />TECH GIGS</h2>
                    <p className="toggle-h2">LETS HELP BUILD YOUR <br />TECH DREAM STORY</p>
                    <form className="form">
                        <button>
                            <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="Image"
                                aria-labelledby="search">
                                <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                                    stroke="currentColor" stroke-width="1.333" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                            </svg>
                        </button>
                        <input className="text-input" placeholder="Type your text" type="text" />
                            <button className="reset" type="reset">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                    </form>
                    <button className="btn-contact" type="submit">Search Jobs</button>
                </div>
            </section>
        </main>
    );
};

export default CareerPage;
