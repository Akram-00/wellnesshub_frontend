import * as React from "react";
import { styled } from "@mui/material/styles";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import UserProfileImage from './UserProfileImage/UserProfileImage'

interface UploadImagePopupProps {
  setUploadImage: React.Dispatch<React.SetStateAction<boolean>>;
  setProfileImage: React.Dispatch<React.SetStateAction<any>>;
}

const UploadUserImage: React.FC<UploadImagePopupProps> = ({
  setUploadImage,setProfileImage
}) => {

  return (
    <div className="popupout">
      <div className="popupbox">
        <button
          className="close"
          onClick={() => {
            setUploadImage(false);
          }}
        >
          <AiOutlineClose />
        </button>
        <UserProfileImage setProfileImage={setProfileImage}  setUploadImage={setUploadImage}/>
      </div>
    </div>
  );
};

export default UploadUserImage;
