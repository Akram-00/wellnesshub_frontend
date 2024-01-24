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

interface CaloriIntakePopupProps {
  setShowCalorieIntakePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalorieIntakePopup: React.FC<CaloriIntakePopupProps> = ({
  setShowCalorieIntakePopup,
}) => {
  const color = "#ffc20e";

  const [date, setDate] = React.useState<any>(dayjs(new Date()));
  const [time, setTime] = React.useState<any>(dayjs(new Date()));

  const selectedDay = (val: any) => {
    setDate(val);
  };

  const [calorieIntake, setCalorieIntake] = React.useState<any>({
    item: "",
    date: "",
    quantity: "",
    quantityType: "g",
  });

  const [items, setItems] = React.useState<any>([]);

  const saveCalorieIntake = async () => {
    let tempdate = date.format("YYYY-MM-DD");
    let temptime = time.format("HH:mm:ss");
    let tempdatetime = tempdate + " " + temptime;
    let finaldatetime = new Date(tempdatetime);
    console.log(calorieIntake);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/calorieintake/addcalorieintake",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            item: calorieIntake.item,
            date: finaldatetime,
            quantity: calorieIntake.quantity,
            quantitytype: calorieIntake.quantityType,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Calorie Intake added successfully");
        getCalorieIntake();
      } else {
        toast.error("Error in adding calorie intake");
        console.log(data);
      }
    } catch (error) {
      toast.error("Error in adding calorie intake in database");
      console.log(error);
    }
  };

  const getCalorieIntake = async () => {
    setItems([]);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API +
          "/calorieintake/getcalorieintakebydate",
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

  const deleteCalorieIntake = async (item: any) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API +
          "/calorieintake/deletecalorieintake",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            item:item.item,
            date:item.date
          }),
        }
      );

      const data = await response.json();
      if (data.ok) {
        console.log(data.data, "calorie Intake data data for data");
        toast.success("Calorie Intake item deleted successfully")
        getCalorieIntake()
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
    getCalorieIntake();
  }, [date]);

  return (
    <div className="popupout">
      <div className="popupbox">
        <button
          className="close"
          onClick={() => {
            setShowCalorieIntakePopup(false);
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
          label="Food Item Name"
          variant="outlined"
          color="warning"
          onChange={(e) => {
            setCalorieIntake({
              ...calorieIntake,
              item: e.target.value,
            });
          }}
        />
        <TextField
          id="outlined-basic"
          label="Food Item Amount (in gms)"
          type="number"
          variant="outlined"
          color="warning"
          onChange={(e) => {
            setCalorieIntake({
              ...calorieIntake,
              quantity: e.target.value,
            });
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Pick the time"
            value={time}
            onChange={(newValue) => setTime(newValue)}
          />
        </LocalizationProvider>
        <Button variant="contained" onClick={saveCalorieIntake}>
          Save
        </Button>
        <div className="hrline"></div>
        <div className="items">
          {items.map((item: any) => {
            return (
              <div className="item">
                <div>{item.item}</div>
                <div>
                  {item.quantity} {item.quantitytype}
                </div>
                <button
                  onClick={() => {
                    deleteCalorieIntake(item);
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

export default CalorieIntakePopup;
