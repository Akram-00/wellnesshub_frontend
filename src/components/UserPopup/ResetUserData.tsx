import React from 'react'
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
interface ResetUserDataPopupProps {
  setResetUserData: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetUserData: React.FC<ResetUserDataPopupProps> = ({
  setResetUserData,
}) => {
  const resetUserData = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/auth/cleardata",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      if (data.ok) {
        console.log(data.data, "Data cleared successfully");
        toast.success("Data cleared successfully");
      } else {
        toast.error("Cannot Clear User Data");
      }
    } catch (error) {
      toast.error("Cannot Clear User Data1");
      console.log(error);
    }
    setResetUserData(false);
  };
  return (
    <div className="popupout">
      <div className="popupbox">
        <button
          className="close"
          onClick={() => {
            setResetUserData(false);
          }}
        >
          <AiOutlineClose />
        </button>
        <div className="confirmation-message">
          <p> Do You Really Want to Reset your Account</p>
        </div>
        <Button variant="contained" color="error" onClick={resetUserData}>
          Reset The Account
        </Button>
      </div>
    </div>
  );
};

export default ResetUserData