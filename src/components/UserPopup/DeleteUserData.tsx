import React from 'react'
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
interface DeleteUserPopupProps {
  setDeleteUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteUserData: React.FC<DeleteUserPopupProps> = ({
  setDeleteUser,
}) => {

    const handleLogout = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/logout`,
          {
            method: "POST",
            credentials: "include", // Include credentials (cookies)
            headers: {
              "Content-Type": "application/json",
            },
            // body: JSON.stringify(anyDataYouWantToSend), // You can include a request body if needed
          }
        );

        if (response.ok) {
          // Logout was successful
          // Clear any client-side storage or state related to authentication if needed

          // Reload the page
          if (window.location.href === "/") {
            window.location.reload();
          } else {
            window.location.href = "/";
          }
        } else {
          // Logout failed, handle the error
          const errorData = await response.json(); // You can extract more information from the error response if needed
          console.error("Logout failed:", errorData);
          // Handle logout failure, maybe show an error message to the user
        }
      } catch (error) {
        console.error("Logout failed", error);
        // Handle logout failure, maybe show an error message to the user
      }
    };

  const deleteUserAccount = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/auth/deleteuser",
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
        console.log(data.data, "Account Deleted successfully");
        toast.success("Account Deleted successfully");
        handleLogout()
      } else {
        toast.error("Cannot delete User account");
      }
    } catch (error) {
      toast.error("Error in deleting User account");
      console.log(error);
    }
  };
  return (
    <div className="popupout">
      <div className="popupbox">
        <button
          className="close"
          onClick={() => {
            setDeleteUser(false);
          }}
        >
          <AiOutlineClose />
        </button>
        <div className="confirmation-message">
          <p> Do You Really Want to Delete your Account</p>
        </div>
        <Button variant="contained" color="error" onClick={deleteUserAccount}>
          Delete the Account 
        </Button>
        </div>
        </div>
  );
};

export default DeleteUserData

