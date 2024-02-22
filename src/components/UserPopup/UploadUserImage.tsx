import * as React from "react";
import { styled } from "@mui/material/styles";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
interface UploadImagePopupProps {
  setUploadImage: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadUserImage: React.FC<UploadImagePopupProps> = ({
  setUploadImage,
}) => {
  const [image, setImage] = React.useState<any>(null);
  const uploadUserImage = async () => {};

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
      </div>
    </div>
  );
};

export default UploadUserImage;
