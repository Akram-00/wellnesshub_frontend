"use client"
import React from "react";
import "./About.css";

const Page = () => {


  const handleButtonClick = () =>{
    window.location.href='/'
  }

  return (
    <>
      <main>
        <section>
          <h1>SPARK YOUR HEALTH WITH WELLNESSHUB</h1>
          <p>
            YOUR ALL-IN-ONE FITNESS TRACKING SOLUTION. MONITOR CALORIE INTAKE,
            WORKOUTS, STEPS, SLEEP, AND WEIGHT SEAMLESSLY. STAY
            MOTIVATED, TRACK PROGRESS, AND PRIORITIZE YOUR WELLNESS JOURNEY.
          </p>
          <div className="hero-btn">
            <button className="btn-1" onClick={handleButtonClick}>
              Join now
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
