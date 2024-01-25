"use client";
import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import "./ReportPage.css";
import { AiFillEdit } from "react-icons/ai";
import CalorieIntakePopup from "@/components/ReportFormPopup/CalorieIntake/CalorieIntakePopup";
import { usePathname } from "next/navigation";

const page = () => {
  const color = "#ffc20e";
  const pathName = usePathname();
  console.log(pathName);

  const chartsParams = {
    // margin: { bottom: 20, left: 25, right: 5 },
    height: 300,
  };

  const [dataS1, setDataS1] = React.useState<any>(null);

  const getDataForS1 = async () => {
    // let temp = [
    //   {
    //     date: "Thu Sep 28 2023 20:30:30 GMT+0530 (India Standard Time)",
    //     value: 2000,
    //     unit: "kcal",
    //   },
    //   {
    //     date: "Wed Sep 27 2023 20:30:30 GMT+0530 (India Standard Time)",
    //     value: 2500,
    //     unit: "kcal",
    //   },
    //   {
    //     date: "Tue Sep 26 2023 20:30:30 GMT+0530 (India Standard Time)",
    //     value: 2700,
    //     unit: "kcal",
    //   },
    //   {
    //     date: "Mon Sep 25 2023 20:30:30 GMT+0530 (India Standard Time)",
    //     value: 3000,
    //     unit: "kcal",
    //   },
    //   {
    //     date: "Sun Sep 24 2023 20:30:30 GMT+0530 (India Standard Time)",
    //     value: 2000,
    //     unit: "kcal",
    //   },
    //   {
    //     date: "Sat Sep 23 2023 20:30:30 GMT+0530 (India Standard Time)",
    //     value: 2300,
    //     unit: "kcal",
    //   },
    //   {
    //     date: "Fri Sep 22 2023 20:30:30 GMT+0530 (India Standard Time)",
    //     value: 2500,
    //     unit: "kcal",
    //   },
    //   {
    //     date: "Thu Sep 21 2023 20:30:30 GMT+0530 (India Standard Time)",
    //     value: 2700,
    //     unit: "kcal",
    //   },
    // ];

    if (pathName == "/report/Calorie%20Intake") {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_API +
            "/calorieintake/getcalorieintakebylimit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              limit: 10,
            }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          // Assuming data.data is your original array of objects
          // Assuming data.data is your original array of objects
          let temp = data.data.map((item: any) => {
            return {
              date: new Date(item.date),
              value: item.calorieIntake,
              unit: "kcal",
            };
          });

          // Aggregate data by day using filter
          let result = temp.reduce((accumulator: any[], currentItem: any) => {
            const existingItem = accumulator.find(
              (item) => item.date.getDate() === currentItem.date.getDate()
            );

            if (existingItem) {
              // If the day already exists in accumulator, increment the calorieIntake value
              existingItem.value += currentItem.value;
            } else {
              // If the day doesn't exist, add the item to accumulator
              accumulator.push({
                date: currentItem.date,
                value: currentItem.value,
                unit: "kcal",
              });
            }

            return accumulator;
          }, []);

          // Now result contains objects with incremented calorieIntake values for the same day
          let dataForXAxis = result.map((item: any) => item.date);
          let dataForLineChart = result.map((item: any) => JSON.stringify(item.value));

          console.log(temp);

          console.log({
            data: dataForLineChart,
            title: "1 Day Calorie Intake",
            color: color,
            xAxis: {
              data: dataForXAxis,
              label: "Last 10 Days",
              scaleType: "time",
            },
          });

          setDataS1({
            data: dataForLineChart,
            title: "1 Day Calorie Intake",
            color: color,
            xAxis: {
              data: dataForXAxis,
              label: "Last 10 Days",
              scaleType: "time",
            },
          });
        } else {
          setDataS1([]);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Get Data for other reports");
    }
  };

  React.useEffect(() => {
    getDataForS1();
  }, []);

  const [showCalorieIntakePopup, setShowCalorieIntakePopup] =
    React.useState<boolean>(false);

  return (
    <div className="reportpage">
      <div className="s1">
        {dataS1 && (
          <LineChart
            xAxis={[
              {
                id: "Day",
                data: dataS1.xAxis.data,
                scaleType: dataS1.xAxis.scaleType,
                label: dataS1.xAxis.label,
                valueFormatter: (date: any) => {
                  return date.getDate().toString();
                },
              },
            ]}
            series={[
              {
                data: dataS1.data,
                label: dataS1.title,
                color: dataS1.color,
              },
            ]}
            {...chartsParams}
          />
        )}
      </div>
      <button
        className="editbutton"
        onClick={() => {
          if (pathName == "/report/Calorie%20Intake") {
            setShowCalorieIntakePopup(true);
          } else {
            alert("show other popups");
          }
        }}
      >
        <AiFillEdit />
      </button>
      {showCalorieIntakePopup && (
        <CalorieIntakePopup
          setShowCalorieIntakePopup={setShowCalorieIntakePopup}
        />
      )}
    </div>
  );
};

export default page;
