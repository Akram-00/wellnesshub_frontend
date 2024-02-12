import React from 'react'
interface UploadImagePopupProps {
  setUploadImage: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadUserImage: React.FC<UploadImagePopupProps> = ({
  setUploadImage,
}) => {
  const uploadUserImage = async () => {};

  return <div>UploadUserImage</div>;
};

export default UploadUserImage