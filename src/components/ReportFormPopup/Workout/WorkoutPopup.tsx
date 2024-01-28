import React from "react";
import "../popup.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { toast } from "react-toastify";

interface WorkoutPopupProps {
  setShowWorkoutPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const WorkoutPopup: React.FC<WorkoutPopupProps> = ({ setShowWorkoutPopup }) => {
  const color = "#ffc20e";

  const [date, setDate] = React.useState<any>(dayjs(new Date()));

  const selectedDay = (val: any) => {
    setDate(val);
  };

  const [workout, setWorkout] = React.useState<any>({
    date: "",
    exercise: "",
    durationInMinutes: "",
  });

  const [items, setItems] = React.useState<any>([]);

  const saveWorkout = async () => {
    let tempdate = date.format("YYYY-MM-DD");
    let finaldatetime = new Date(tempdate);
    console.log(workout);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/workouttrack/addworkoutentry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            exercise: workout.exercise,
            date: finaldatetime,
            durationInMinutes: workout.durationInMinutes,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Calorie Intake added successfully");
        getWorkout();
      } else {
        toast.error("Error in adding calorie intake");
        console.log(data);
      }
    } catch (error) {
      toast.error("Error in adding calorie intake in database");
      console.log(error);
    }
  };

  const getWorkout = async () => {
    setItems([]);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/workouttrack/getworkoutsbydate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            date: date,
          }),
        }
      );

      const data = await response.json();
      if (data.ok) {
        console.log(data.data, "calorie Intake data data for data");
        setItems(data.data);
      } else {
        toast.error("Error in calorie intake");
        console.log(data);
      }
    } catch (error) {
      toast.error("Error in adding calorie intake in database");
      console.log(error);
    }
  };

  const deleteWorkout = async (item: any) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API +
          "/workouttrack/deleteworkoutentry",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            date: item.date,
          }),
        }
      );

      const data = await response.json();
      if (data.ok) {
        console.log(data.data, "calorie Intake data data for data");
        toast.success("Calorie Intake item deleted successfully");
        getWorkout();
      } else {
        toast.error("Error in deleting calorie intake");
        console.log(data);
      }
    } catch (error) {
      toast.error("Error in deleting calorie intake in database");
      console.log(error);
    }
  };

  React.useEffect(() => {
    getWorkout();
  }, [date]);

  return (
    <div className="popupout">
      <div className="popupbox">
        <button
          className="close"
          onClick={() => {
            setShowWorkoutPopup(false);
          }}
        >
          <AiOutlineClose />
        </button>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="select the day"
            onChange={(newValue: any) => {
              selectedDay(newValue);
            }}
          />
        </LocalizationProvider>
        <TextField
          id="outlined-basic"
          label="Exercise Name"
          variant="outlined"
          color="warning"
          onChange={(e) => {
            setWorkout({
              ...workout,
              exercise: e.target.value,
            });
          }}
        />
        <TextField
          id="outlined-basic"
          label="Duration (in minutes)"
          type="number"
          variant="outlined"
          color="warning"
          onChange={(e) => {
            setWorkout({
              ...workout,
              durationInMinutes: e.target.value,
            });
          }}
        />

        <Button variant="contained" onClick={saveWorkout}>
          Save
        </Button>
        <div className="hrline"></div>
        <div className="items">
          {items.map((item: any) => {
            return (
              <div className="item">
                <div>{item.exercise}</div>
                <div>
                  {item.durationInMinutes} min
                </div>
                <button
                  onClick={() => {
                    deleteWorkout(item);
                  }}
                >
                  Delete
                  <AiFillDelete />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPopup;
