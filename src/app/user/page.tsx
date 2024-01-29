"use client"
import React from "react";
import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const workoutid = searchParams.get("id");
  return <div>{workoutid}</div>;
};

export default page;
