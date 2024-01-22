import React from "react";
import "../popup.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import {TimePicker} from "@muli/x-date-pickers/TimePicker"
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
    setDate(val)
  };

  const [calorieIntake, setCalorieIntake ] = React.useState<any>({
    item:'',
    date:'',
    quantity:'',
    quantityType:''
  })

  const [item, setItem] = React.useState<any>([])

  const saveCalorieIntake = async () =>{
    
  }
  const getCalorieIntake = async () =>{

  }
  const deleteCalorieIntake = async (item:any) =>{

  }

  React.useEffect(()=>{
    getCalorieIntake()
  },[date])

  return (
    <div className="popupout">
      <div className="popupbox">
        <button className="close" onClick={()=>{setShowCalorieIntakePopup(false)}}>
          <AiOutlineClose/>
        </button>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="select the day"
            onChange={(newValue:any)=>{
              selectedDay(newValue)
            }}
          />
        </LocalizationProvider>
        <TextField
          id="outlined-basic"
          label="Food Item Name"
          variant="outlined"
          color="warning"
          onChange={((e)=>{
            setCalorieIntake({
              ...calorieIntake,
              item:e.target.value
            })
          })}
        />
        <TextField
          id="outlined-basic"
          label="Food Item Amount (in gms)"
          type="number"
          variant="outlined"
          color="warning"
          onChange={((e)=>{
            setCalorieIntake({
              ...calorieIntake,
              quantity:e.target.value
            })
          })}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            lable="Pick the time"
            value={time}
            onChange={(newValue) => setTime(newValue)}
          />
        </LocalizationProvider>
        <Button variant="contained" colors="warning"
        onclick={saveCalorieIntake}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default CalorieIntakePopup;
