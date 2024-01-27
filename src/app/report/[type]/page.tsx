"use client";
import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import "./ReportPage.css";
import { AiFillEdit } from "react-icons/ai";
import CalorieIntakePopup from "@/components/ReportFormPopup/CalorieIntake/CalorieIntakePopup";
import SleepPopup from "@/components/ReportFormPopup/Sleep/SleepPopup";
import StepsPopup from "@/components/ReportFormPopup/Steps/StepsPopup";
import WaterPopup from "@/components/ReportFormPopup/Water/WaterPopup";
import WeightPopup from "@/components/ReportFormPopup/Weight/WeightPopup"
import WorkoutPopup from "@/components/ReportFormPopup/Workout/WorkoutPopup"
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
    let result: any[] = [];

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
              value: item.durationInMinutes,
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
              });
            }

            return accumulator;
          }, []);

          // Now result contains objects with incremented calorieIntake values for the same day
          let dataForXAxis = result.map((item: any) => item.date);
          let dataForLineChart = result.map((item: any) =>
            JSON.stringify(item.value)
          );

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
    } else if (pathName == "/report/Sleep") {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_API + "/sleeptrack/getsleepbylimit",
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
        if (data.ok) {
          let temp = data.data.map((item: any) => {
            return {
              date: new Date(item.date),
              value: item.durationInHrs,
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
              });
            }

            return accumulator;
          }, []);

          // Now result contains objects with incremented calorieIntake values for the same day
          let dataForXAxis = result.map((item: any) => item.date);
          let dataForLineChart = result.map((item: any) =>
            JSON.stringify(item.value)
          );

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
      } catch (err) {
        console.log(err);
      }
    } else if (pathName == "/report/Steps") {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_API + "/steptrack/getstepsbylimit",
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
        if (data.ok) {
          let temp = data.data.map((item: any) => {
            return {
              date: new Date(item.date),
              value: item.steps,
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
                unit: "Hr",
              });
            }

            return accumulator;
          }, []);

          result.sort((a: any, b: any) => a.date.getTime() - b.date.getTime());

          // Now result contains objects with incremented calorieIntake values for the same day
          let dataForXAxis = result.map((item: any) => item.date);

          let dataForLineChart = result.map((item: any) =>
            JSON.stringify(item.value)
          );

          console.log(temp);

          console.log({
            data: dataForLineChart,
            title: "1 Day Step Track",
            color: color,
            xAxis: {
              data: dataForXAxis,
              label: "Last 10 Days",
              scaleType: "time",
            },
          });

          setDataS1({
            data: dataForLineChart,
            title: "1 Day Step Track",
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
      } catch (err) {
        console.log(err);
      }
    } else if (pathName == "/report/Water") {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_API + "/watertrack/getwaterbylimit",
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
        if (data.ok) {
          let temp = data.data.map((item: any) => {
            return {
              date: new Date(item.date),
              value: item.amountInMilliliters,
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
              });
            }

            return accumulator;
          }, []);
          result.sort(
            (a: any, b: any) => a.date.getTime() - b.date.getTime()
          );
          // Now result contains objects with incremented calorieIntake values for the same day
          let dataForXAxis = result.map((item: any) => item.date);
          // has bug do this operation before mapping it to the chart

          let dataForLineChart = result.map((item: any) =>
            JSON.stringify(item.value)
          );

          console.log(temp);

          console.log({
            data: dataForLineChart,
            title: "1 Day Water Intake",
            color: color,
            xAxis: {
              data: dataForXAxis,
              label: "Last 10 Days",
              scaleType: "time",
            },
          });

          setDataS1({
            data: dataForLineChart,
            title: "1 Day Water Intake",
            color: color,
            xAxis: {
              data: dataForXAxis,
              label: `Last ${result.length} Days Data`,
              scaleType: "time",
            },
          });
        } else {
          setDataS1([]);
        }
      } catch (err) {
        console.log(err);
      }
    } else if(pathName == "/report/Weight") {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_API + "/weighttrack/getweightbylimit",
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
        if (data.ok) {
          let temp = data.data.map((item: any) => {
            return {
              date: new Date(item.date),
              value: item.weight,
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
              });
            }

            return accumulator;
          }, []);
          result.sort(
            (a: any, b: any) => a.date.getTime() - b.date.getTime()
          );
          // Now result contains objects with incremented calorieIntake values for the same day
          let dataForXAxis = result.map((item: any) => item.date);
          // has bug do this operation before mapping it to the chart

          let dataForLineChart = result.map((item: any) =>
            JSON.stringify(item.value)
          );

          console.log(temp);

          console.log({
            data: dataForLineChart,
            title: "1 Day Weight Track",
            color: color,
            xAxis: {
              data: dataForXAxis,
              label: "Last 10 Days",
              scaleType: "time",
            },
          });

          setDataS1({
            data: dataForLineChart,
            title: "1 Day Water Intake",
            color: color,
            xAxis: {
              data: dataForXAxis,
              label: `Last ${result.length} Days Data`,
              scaleType: "time",
            },
          });
        } else {
          setDataS1([]);
        }
      } catch (err) {
        console.log(err);
      }
    }else if(pathName == "/report/Workout") {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_API + "/workouttrack/getworkoutsbylimit",
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
        if (data.ok) {
          let temp = data.data.map((item: any) => {
            return {
              date: new Date(item.date),
              value: item.durationInMinutes,
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
              });
            }

            return accumulator;
          }, []);
          result.sort(
            (a: any, b: any) => a.date.getTime() - b.date.getTime()
          );
          // Now result contains objects with incremented calorieIntake values for the same day
          let dataForXAxis = result.map((item: any) => item.date);
          // has bug do this operation before mapping it to the chart

          let dataForLineChart = result.map((item: any) =>
            JSON.stringify(item.value)
          );

          console.log(temp);

          console.log({
            data: dataForLineChart,
            title: "1 Day Weight Track",
            color: color,
            xAxis: {
              data: dataForXAxis,
              label: "Last 10 Days",
              scaleType: "time",
            },
          });

          setDataS1({
            data: dataForLineChart,
            title: "1 Day Water Intake",
            color: color,
            xAxis: {
              data: dataForXAxis,
              label: `Last ${result.length} Days Data`,
              scaleType: "time",
            },
          });
        } else {
          setDataS1([]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  

  React.useEffect(() => {
    getDataForS1();
  }, []);

  const [showCalorieIntakePopup, setShowCalorieIntakePopup] =
    React.useState<boolean>(false);
  const [showSleepPopup, setShowSleepPopup] = React.useState<boolean>(false);
  const [showStepsPopup, setShowStepsPopup] = React.useState<boolean>(false);
  const [showWaterPopup, setShowWaterPopup] = React.useState<boolean>(false);
  const [showWeightPopup, setShowWeightPopup] = React.useState<boolean>(false);
  const [showWorkoutPopup, setShowWorkoutPopup] = React.useState<boolean>(false);

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
          } else if (pathName == "/report/Sleep") {
            setShowSleepPopup(true);
          } else if (pathName == "/report/Steps") {
            setShowStepsPopup(true);
          } else if (pathName == "/report/Water") {
            setShowWaterPopup(true);
          } else if (pathName == "/report/Weight") {
            setShowWeightPopup(true);
          }else if (pathName == "/report/Workout") {
            setShowWorkoutPopup(true);
          } else {
            alert("Show other popups");
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
      {showSleepPopup && <SleepPopup setShowSleepPopup={setShowSleepPopup} />}
      {showStepsPopup && <StepsPopup setShowStepsPopup={setShowStepsPopup} />}
      {showWaterPopup && <WaterPopup setShowWaterPopup={setShowWaterPopup} />}
      {showWeightPopup && <WeightPopup setShowWeightPopup={setShowWeightPopup} />}
      {showWorkoutPopup && <WorkoutPopup setShowWorkoutPopup={setShowWorkoutPopup} />}
    </div>
  );
};

export default page;
