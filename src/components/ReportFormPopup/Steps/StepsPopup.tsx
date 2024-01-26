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

interface StepsPopupProps {
  setShowStepsPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const StepsPopup: React.FC<StepsPopupProps> = ({ setShowStepsPopup }) => {
  const color = "#ffc20e";

  const [date, setDate] = React.useState<any>(dayjs(new Date()));

  const selectedDay = (val: any) => {
    setDate(val);
  };
 b
  const [steps, setSteps] = React.useState<any>({
    date: "",
    steps: "",
  });

  const [items, setItems] = React.useState<any>([]);

  const saveStepsTrack = async () => {
    let tempdate = date.format("YYYY-MM-DD");
    let finaldatetime = new Date(tempdate);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/steptrack/addstepentry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            date: finaldatetime,
            steps: steps.steps,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Steps Track added successfully");
        getStepsTrack();
      } else {
        toast.error("Error in adding Steps Track");
        console.log(data);
      }
    } catch (error) {
      toast.error("Error in adding Steps Track in database");
      console.log(error);
    }
  };

  const getStepsTrack = async () => {
    setItems([]);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/steptrack/getstepsbydate",
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
        console.log(data.data, "Steps track data data for data");
        setItems(data.data);
      } else {
        toast.error("Error in Steps track");
        console.log(data);
      }
    } catch (error) {
      toast.error("Error in adding Steps track in database");
      console.log(error);
    }
  };

  const deleteStepsTrack = async (item: any) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/steptrack/deletestepentry",
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
        console.log(data.data, "Steps data data for data");
        toast.success("Steps item deleted successfully");
        getStepsTrack();
      } else {
        toast.error("Error in deleting Steps");
        console.log(data);
      }
    } catch (error) {
      toast.error("Error in deleting Steps in database");
      console.log(error);
    }
  };

  React.useEffect(() => {
    getStepsTrack();
  }, [date]);

  return (
    <div className="popupout">
      <div className="popupbox">
        <button
          className="close"
          onClick={() => {
            setShowStepsPopup(false);
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
          label="Total No of Steps"
          type="number"
          variant="outlined"
          color="warning"
          onChange={(e) => {
            setSteps({
              ...steps,
              steps: e.target.value,
            });
          }}
        />

        <Button variant="contained" onClick={saveStepsTrack}>
          Save
        </Button>
        <div className="hrline"></div>
        <div className="items">
          {items.map((item: any) => {
            return (
              <div className="item">
                <div>{item.date}</div>
                <div>
                  {item.steps} 
                </div>
                <button
                  onClick={() => {
                    deleteStepsTrack(item);
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

export default StepsPopup;
