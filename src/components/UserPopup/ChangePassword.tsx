import React from "react";
import { toast } from "react-toastify";
import "./userPopup.css";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface ChangePasswordPopupProps {
  setChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
}
const ChangePassword: React.FC<ChangePasswordPopupProps> = ({
  setChangePassword,
}) => {
  const [password, setPassword] = React.useState<any>({
    oldPassword: "",
    newPassword: "",
  });

  const changePassword = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/auth/changepassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            oldPassword: password.oldPassword,
            newPassword: password.newPassword,
          }),
        }
      );

      const data = await response.json();
      if (data.ok) {
        console.log(data.data, "Password changed successfully");
        toast.success("Password changed successfully");
      } else {
        toast.error("Cannot Change password");
      }
    } catch (error) {
      toast.error("Error in changing password");
      console.log(error);
    }
  };
  return (
    <div className="popupout">
      <div className="popupbox">
        <button
          className="close"
          onClick={() => {
            setChangePassword(false);
          }}
        >
          <AiOutlineClose />
        </button>
        <TextField
          id="outlined-basic"
          label="old password"
          variant="outlined"
          color="warning"
          onChange={(e) => {
            setPassword({
              ...password,
              oldPassword: e.target.value,
            });
          }}
        />
        <TextField
          id="outlined-basic"
          label="new password"
          variant="outlined"
          color="warning"
          onChange={(e) => {
            setPassword({
              ...password,
              newPassword: e.target.value,
            });
          }}
        />
        <Button variant="contained" onClick={changePassword}>
          Change
        </Button>
      </div>
    </div>
  );
};

export default ChangePassword;
