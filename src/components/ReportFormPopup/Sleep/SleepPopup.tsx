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

interface SleepPopupProps {
  setShowSleepPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const SleepPopup: React.FC<SleepPopupProps> = ({ setShowSleepPopup }) => {
  const color = "#ffc20e";

  const [date, setDate] = React.useState<any>(dayjs(new Date()));

  const selectedDay = (val: any) => {
    setDate(val);
  };

  const [sleep, setSleep] = React.useState<any>({
    date: "",
    durationInHrs: "",
  });

  const [items, setItems] = React.useState<any>([]);

  const saveSleepTrack = async () => {
    let tempdate = date.format("YYYY-MM-DD");
    let finaldatetime = new Date(tempdate);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/sleeptrack/addsleepentry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            date: finaldatetime,
            durationInHrs: sleep.durationInHrs,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Sleep Track added successfully");
        getSleepTrack();
      } else {
        toast.error("Error in adding Sleep Track");
        console.log(data);
      }
    } catch (error) {
      toast.error("Error in adding Sleep Track in database");
      console.log(error);
    }
  };

  const getSleepTrack = async () => {
    setItems([]);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/sleeptrack/getsleepbydate",
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
        console.log(data.data, "Sleep track data data for data");
        setItems(data.data);
      } else {
        toast.error("Error in Sleep track");
        console.log(data);
      }
    } catch (error) {
      toast.error("Error in adding Sleep track in database");
      console.log(error);
    }
  };

  const deleteSleepTrack = async (item: any) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/sleeptrack/deletesleepentry",
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
        console.log(data.data, "Sleep data data for data");
        toast.success("Sleep track deleted successfully");
        getSleepTrack();
      } else {
        toast.error("Error in deleting Sleep");
        console.log(data);
      }
    } catch (error) {
      toast.error("Error in deleting Sleep in database");
      console.log(error);
    }
  };

  React.useEffect(() => {
    getSleepTrack();
  }, [date]);

  return (
    <div className="popupout">
      <div className="popupbox">
        <button
          className="close"
          onClick={() => {
            setShowSleepPopup(false);
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
          label="Sleep Duration (in Hrs)"
          type="number"
          variant="outlined"
          color="warning"
          onChange={(e) => {
            setSleep({
              ...sleep,
              durationInHrs: e.target.value,
            });
          }}
        />

        <Button variant="contained" onClick={saveSleepTrack}>
          Save
        </Button>
        <div className="hrline"></div>
        <div className="items">
          {items.map((item: any) => {
            return (
              <div className="item">
                <div>{dayjs(item.date).format("DD-MM-YYYY")}</div>
                <div>{item.durationInHrs}Hrs</div> 
                <button
                  onClick={() => {
                    deleteSleepTrack(item);
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

export default SleepPopup;
