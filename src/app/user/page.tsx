"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import "./userProfile.css";
import Image from "next/image";
import DefaultProfile from "../../assets/default_profile_image.jpg";
import RightArrow from "../../assets/right-arrow.svg"
import Weight from "../../assets/weight-scale.svg"
import Hour from '../../assets/hourglass.svg'
import Workout from "../../assets/gym.svg"


const page = () => {
  const searchParams = useSearchParams();
  const workoutid = searchParams.get("id");

  const getData = async () => {
    const data = {
      name:"Ali Akram"
      
    }
  };

  React.useEffect(() => {}, []);

  const userStats = [
    {
      count:140,
      title:"Hours"
    },
    {
      count:2.5,
      title:"Weight Lossed"
    },
    {
      count:14,
      title:"Workouts"
    }
  ]

  

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="left">
          <Image src={DefaultProfile} alt="" className="profile-image"/>
          <h5 className="profile-name">USER NAME</h5>
          <h5 className="profile-name">useremail@gmail.com</h5>
          <h5 className="profile-name">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore,
            necessitatibus
          </h5>
        </div>
        <div className="right">
          <div className="stats-container">
            <div className="box">
              <Image src={Hour} alt="" className="box-image" />
              <div className="count">30</div>
              <div className="title">HOURS</div>
            </div>
            <div className="box">
              <Image src={Weight} alt="" className="box-image" />
              <div className="count">3.5</div>
              <div className="title">WEIGHT LOSSED</div>
            </div>
            <div className="box">
              <Image src={Workout} alt="" className="box-image" />
              <div className="count">14</div>
              <div className="title">WORKOUTS</div>
            </div>
          </div>
          <div className="tabs">
            <div className="changepassword">
              <p>CHANGE PASSWORD</p>
              <div>
                <Image src={RightArrow} alt="" />
              </div>
            </div>
            <div className="changepassword">
              <p>EDIT USER PROFILE</p>
              <div>
                <Image src={RightArrow} alt="" />
              </div>
            </div>
            <div className="changepassword">
              <p>GET YOUR REPORT IN PDF</p>
              <div>
                <Image src={RightArrow} alt="" />
              </div>
            </div>
            <div className="changepassword">
              <p>DELELTE THE ACCOUNT</p>
              <div>
                <Image src={RightArrow} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
