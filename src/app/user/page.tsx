"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import "./userProfile.css";
import Image from "next/image";
import DefaultProfile from "../../assets/default_profile_image.jpg";
import RightArrow from "../../assets/right-arrow.svg";
import Weight from "../../assets/weight-scale.svg";
import Hour from "../../assets/hourglass.svg";
import Workout from "../../assets/gym.svg";
import {
  ChangePassword,
  DeleteUser,
  ResetUserData,
  UploadImage,
} from "@/components/UserPopup";

const bmiCalculator = (weight: number, height: number) => {
  let bmiStatus = "";
  const bmi = weight / ((height / 100) * (height / 100));
  if (bmi < 18.5) {
    bmiStatus = "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    bmiStatus = "Normal weight";
  } else if (bmi >= 25 && bmi < 30) {
    bmiStatus = "Overweight";
  } else {
    bmiStatus = "Obese";
  }
  return { bmi, bmiStatus };
};

const handleUserData = (data: any) => {
  const initialWeightKg = data.weight[0].weight; // Initial weight in kilograms
  const finalWeightKg = data.weight[data.weight.length - 1].weight; // Final weight in kilograms
  const userGoal = data.goal; // Assuming data.userGoal contains the user's goal

  const weightDifferenceKg = Math.abs(finalWeightKg - initialWeightKg).toFixed(
    2
  );

  let userWeight;

  switch (userGoal) {
    case "weightLoss":
      userWeight = {
        weight: weightDifferenceKg,
        userStatus: "Weight Lossed",
      };
      break;
    case "weightGain":
      userWeight = {
        weight: weightDifferenceKg,
        userStatus: "Weight Gained",
      };
      break;
    case "maintainCurrentWeight":
      userWeight = "Maintaining Current Weight";
      break;
    default:
      userWeight = "Invalid user goal";
  }

  const workoutHours =
    data.workouts.reduce(
      (sum: any, obj: any) => sum + obj.durationInMinutes,
      0
    ) / 60;
  const noOfWorkouts = data.workouts.length;
  const bmi = bmiCalculator(
    data.weight[data.weight.length - 1].weight,
    data.height[0].height
  );
  let age = new Date().getFullYear() - new Date(data.dob).getFullYear();
  const newData = { ...data, userWeight, workoutHours, noOfWorkouts, bmi, age };
  return newData;
};

const page = () => {
  const searchParams = useSearchParams();
  const workoutid = searchParams.get("id");

  const [data, setData] = React.useState<any>();

  // Popups state
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [deleteUser, setDeleteUser] = useState<boolean>(false);
  const [resetUserData, setResetUserData] = useState<boolean>(false);
  const [uploadImage, setUploadImage] = useState<boolean>(false);

  // popup handler

    const handleClick = (
      setter: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
      // Set all other state variables to false
      setChangePassword(false);
      setDeleteUser(false);
      setResetUserData(false);
      setUploadImage(false);
      // Set the clicked state variable to true
      setter(true);
    };

  const getData = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/auth/getuserdata",
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.ok) {
        console.log(handleUserData(data.data));
        setData(handleUserData(data.data));
      } else {
        setData({});
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <div className="profile-container">
      {data && (
        <div className="profile-content">
          <div className="left">
            <div className="profile-picture-name">
              <Image src={DefaultProfile} alt="" className="profile-image" />
              <h5 className="profile-name">{data.name}</h5>
            </div>
            <h6 className="profile-name">Email : {data.email}</h6>
            <h6 className="profile-name">Age : {data.age}</h6>
            <h6 className="profile-name">Goal : {data.goal}</h6>
            <h6 className="profile-name">
              Weight : {data.weight[data.weight.length - 1].weight}
            </h6>
            <h6 className="profile-name">Height : {data.height[0].height}</h6>
            <h6 className="profile-name">BMI : {data.bmi.bmi.toFixed(2)}</h6>
            <h6 className="profile-name">BMI : {data.bmi.bmiStatus}</h6>
          </div>
          <div className="right">
            <div className="stats-container">
              <div className="box">
                <Image src={Hour} alt="" className="box-image" />
                <div className="count">{data.workoutHours}</div>
                <div className="title">HOURS</div>
              </div>
              <div className="box">
                <Image src={Weight} alt="" className="box-image" />
                <div className="count">{data.userWeight.weight}</div>
                <div className="title">{data.userWeight.userStatus}</div>
              </div>
              <div className="box">
                <Image src={Workout} alt="" className="box-image" />
                <div className="count">{data.noOfWorkouts}</div>
                <div className="title">WORKOUTS</div>
              </div>
            </div>
            <div className="tabs">
              <div
                className="user-profile-setting"
                onClick={() => {
                  handleClick(setUploadImage)
                }}
              >
                <p>UPLOAD PROFILE IMAGE</p>
                <div>
                  <Image src={RightArrow} alt="" />
                </div>
              </div>
              <div
                className="user-profile-setting"
                onClick={() => {
                  handleClick(setChangePassword)
                }}
              >
                <p>CHANGE PASSWORD</p>
                <div>
                  <Image src={RightArrow} alt="" />
                </div>
              </div>
              <div
                className="user-profile-setting"
                onClick={() => {
                  handleClick(setResetUserData)
                }}
              >
                <p>RESET ALL DATA</p>
                <div>
                  <Image src={RightArrow} alt="" />
                </div>
              </div>
              <div
                className="user-profile-setting"
                onClick={() => {
                  handleClick(setDeleteUser)
                }}
              >
                <p>DELELTE THE ACCOUNT</p>
                <div>
                  <Image src={RightArrow} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {changePassword && <ChangePassword setChangePassword={setChangePassword} />}
      {deleteUser && <DeleteUser setDeleteUser={setDeleteUser} />}
      {resetUserData && <ResetUserData setResetUserData={setResetUserData} />}
      {uploadImage && <UploadImage setUploadImage={setUploadImage} />}
    </div>
  );
};

export default page;
