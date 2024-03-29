"use client";
import React from "react";
import "./workoutPage.css";
import { useSearchParams } from "next/navigation";

const page = () => {
  const [data, setData] = React.useState<any>(null);
  const searchParams = useSearchParams();
  const workoutid = searchParams.get("id");
  const getWorkout = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API +
          "/workoutplans/workouts/" +
          workoutid,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.ok) {
        setData(data.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    getWorkout();
  }, []);
  return (
    <div className="workout">
<<<<<<< HEAD
      <h1 className="mainhead1">{data?.name} Day</h1>
=======
      <h1 className="mainhead1">{workout?.name} Day</h1>
>>>>>>> cc8bc60d63b4b014bd8bd55df441f921173ce44f
      <div className="workout__exercises">
        {data?.exercises.map((item: any, index: number) => {
          return (
            <div
              className={
                index % 2 === 0
                  ? "workout__exercise"
                  : "workout__exercise workout__exercise--reverse"
              }
            >
              <h3>{index + 1}</h3>
              <div className="workout__exercise__image">
                <img src={item.imageURL} alt="" />
              </div>
              <div className="workout__exercise__content">
                <h2>{item.name}</h2>
                <span>
                  {item.sets} sets X {item.reps} reps
                </span>
                <p>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
