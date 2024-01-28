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

interface WaterPopupProps {
  setShowWaterPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const WaterPopup: React.FC<WaterPopupProps> = ({ setShowWaterPopup }) => {
  const color = "#ffc20e";

  const [date, setDate] = React.useState<any>(dayjs(new Date()));

  const selectedDay = (val: any) => {
    setDate(val);
  };

  const [water, setWater] = React.useState<any>({
    date: "",
    amountInMilliliters: 0,
  });

  const [items, setItems] = React.useState<any>([]);

  const saveWaterTrack = async () => {
    let tempdate = date.format("YYYY-MM-DD");
    let finaldatetime = new Date(tempdate);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/watertrack/addwaterentry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            date: finaldatetime,
            amountInMilliliters: water.amountInMilliliters,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Water Track added successfully");
        getWaterTrack();
      } else {
        toast.error("Error in adding Water Track");
        console.log(data);
      }
    } catch (error) {
      toast.error("Error in adding Water Track in database");
      console.log(error);
    }
  };

  const getWaterTrack = async () => {
    setItems([]);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/watertrack/getwaterbydate",
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
        console.log(data.data, "Sleep water data")
        setItems(data.data);
      } else {
        toast.error("Error in Water track");
        console.log(data);
      }
    } catch (error) {
      toast.error("Error in adding Water track in database");
      console.log(error);
    }
  };

  const deleteWaterTrack = async (item: any) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/watertrack/deletewaterentry",
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
        console.log(data.data, "Water track data data for data");
        toast.success("Calorie Intake item deleted successfully");
        getWaterTrack();
      } else {
        toast.error("Error in deleting Water track");
        console.log(data);
      }
    } catch (error) {
      toast.error("Error in deleting Water track in database");
      console.log(error);
    }
  };

  React.useEffect(() => {
    getWaterTrack();
  }, [date]);

  return (
    <div className="popupout">
      <div className="popupbox">
        <button
          className="close"
          onClick={() => {
            setShowWaterPopup(false);
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
          label="Water Consumed (in ml)"
          type="number"
          variant="outlined"
          color="warning"
          onChange={(e) => {
            setWater({
              ...water,
              amountInMilliliters: e.target.value,
            });
          }}
        />

        <Button variant="contained" onClick={saveWaterTrack}>
          Save
        </Button>
        <div className="hrline"></div>
        <div className="items">
          {items.map((item: any) => {
            return (
              <div className="item">
                <div>{dayjs(item.date).format("DD-MM-YYYY")}</div>
                <div>{item.amountInMilliliters / 1000} L</div>
                <button
                  onClick={() => {
                    deleteWaterTrack(item);
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

export default WaterPopup;
