import React from "react";
import "../popup.css";
import Button from "@mui/material/Button";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import TextField from "@mui/material/TextField";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { toast } from "react-toastify";

interface WeightPopupProps {
  setShowWeightPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const WeightPopup: React.FC<WeightPopupProps> = ({ setShowWeightPopup }) => {
  const color = "#ffc20e";

  const [date, setDate] = React.useState<any>(dayjs(new Date()));

  const selectedDay = (val: any) => {
    setDate(val);
  };

  const [weight, setWeight] = React.useState<any>({
    date: "",
    weightInKg: 0,
  });

  const [items, setItems] = React.useState<any>([]);

  const saveWeightTrack = async () => {
    let tempdate = date.format("YYYY-MM-DD");
    let finaldatetime = new Date(tempdate);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/weighttrack/addweightentry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            date: finaldatetime,
            weightInKg: weight.weightInKg,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Weight Track added successfully");
        getWeightTrack();
      } else {
        toast.error("Error in adding Weight Track");
        console.log(data);
      }
    } catch (error) {
      toast.error("Error in adding Weight Track in database");
      console.log(error);
    }
  };

  const getWeightTrack = async () => {
    setItems([]);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/weighttrack/getweightbydate",
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
        console.log(data.data, "Sleep Weight data")
        setItems(data.data);
      } else {
        toast.error("Error in Weight track");
        console.log(data);
      }
    } catch (error) {
      toast.error("Error in adding Weight track in database");
      console.log(error);
    }
  };

  const deleteWeightTrack = async (item: any) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/weighttrack/deleteweightentry",
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
        console.log(data.data, "Weight track data data for data");
        toast.success("Calorie Intake item deleted successfully");
        getWeightTrack();
      } else {
        toast.error("Error in deleting Weight track");
        console.log(data);
      }
    } catch (error) {
      toast.error("Error in deleting Weight track in database");
      console.log(error);
    }
  };

  React.useEffect(() => {
    getWeightTrack();
  }, [date]);

  return (
    <div className="popupout">
      <div className="popupbox">
        <button
          className="close"
          onClick={() => {
            setShowWeightPopup(false);
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
          label="Weight Gained (in Kg)"
          type="number"
          variant="outlined"
          color="warning"
          onChange={(e) => {
            setWeight({
              ...weight,
              weightInKg: e.target.value,
            });
          }}
        />

        <Button variant="contained" onClick={saveWeightTrack}>
          Save
        </Button>
        <div className="hrline"></div>
        <div className="items">
          {items.map((item: any) => {
            return (
              <div className="item">
                <div>{item.date}</div>
                <div>{item.amountInMilliliters}ml</div>
                <button
                  onClick={() => {
                    deleteWeightTrack(item);
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

export default WeightPopup;
