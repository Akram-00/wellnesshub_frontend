import React, { useState, useRef, ChangeEvent } from "react";
import "./UserProfileImage.css";
import ProfileImage from "../../../assets/cloud-upload.svg";
import { ToastContainer, toast } from "react-toastify";

interface UserProfileImageProps {
  setProfileImage: React.Dispatch<React.SetStateAction<any>>;
  setUploadImage: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserProfileImage: React.FC<UserProfileImageProps> = ({
  setProfileImage,
  setUploadImage,
}) => {
  const hiddenFileInput = useRef<any>(null);
  const [image, setImage] = useState<File | null>(null);
  console.log(image);
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const imgname = file.name;
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxSize = Math.max(img.width, img.height);
          canvas.width = maxSize;
          canvas.height = maxSize;
          const ctx = canvas.getContext("2d");

          if (ctx) {
            // Calculate scaling factor to fit the image into the canvas
            const scale = Math.max(
              canvas.width / img.width,
              canvas.height / img.height
            );

            // Calculate dimensions to maintain aspect ratio
            const newWidth = img.width * scale;
            const newHeight = img.height * scale;

            // Calculate centering offsets
            const xOffset = (canvas.width - newWidth) / 2;
            const yOffset = (canvas.height - newHeight) / 2;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw image with object-fit: cover behavior
            ctx.drawImage(img, xOffset, yOffset, newWidth, newHeight);

            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const file = new File([blob], imgname, {
                    type: "image/png",
                    lastModified: Date.now(),
                  });
                  setImage(file);
                }
              },
              "image/jpeg",
              0.8
            );
          }
        };
      };
    }
  };

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const uploadImage = async (image: File, folderName: string) => {
    const formData = new FormData();
    formData.append("myimage", image);
    formData.append("folderName", folderName);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/image-upload/uploadimage`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.ok) {
        console.log("Image is uploaded successfully", data);
        const { imageUrl, imageId } = data;
        return { imageUrl, imageId };
      } else {
        console.error("Image upload failed ", response.statusText);
        return null;
      }
    } catch (err) {
      toast.error("Error in uploading the Image" + err);
    }
  };

  const handleUploadButtonClick = async () => {
    if (image == null) {
      toast.error("NO Image file is added");
      return;
    }


    if (image) {
    const publicId = await getUserData();
      const folderName = "UserProfileImage";
      const imageObj = await uploadImage(image, folderName);
      console.log(imageObj);
      if (imageObj?.imageUrl || imageObj?.imageId) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/uploadImage`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                link: imageObj.imageUrl,
                publicId: imageObj.imageId,
              }),
              credentials: "include",
            }
          );

          const data = await response.json();

          if (data.ok) {
            console.log("Image is uploaded successfully", data.message);
            toast.success("Image uploaded sucessfully");
            setUploadImage(false);
            setProfileImage(data.data);
            deletePreviousImage(publicId);
          } else {
            toast.error("Image Upload failed");
            console.error("Image upload failed ", data.message);
          }
        } catch (err) {
          toast.error("Error in uploading the Image" + err);
        }
      } else {
        console.log(new Error("there is no link"));
      }
    }
  };

  const getUserData = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/auth/getuserdata",
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.ok) {
        console.log(data.data.profilePublicId)
        return data.data.profilePublicId;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePreviousImage = async (publicId: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/image-upload/deletecloudinaryimages`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            publicId: publicId,
          }),
        }
      );

      const data = await response.json();
      if (data.ok) {
        console.log("Image is uploaded successfully", data);
      } else {
        console.error("Image upload failed ", data.message);
      }
    } catch (err) {
      console.error("Error in uploading the Image" + err);
    }
  };

  return (
    <div className="image-upload-container">
      <div className="box-decoration">
        <label htmlFor="image-upload-input" className="image-upload-label">
          {image ? image.name : "Choose an image"}
        </label>
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="upload image"
              className="img-display-after"
            />
          ) : (
            <img
              src={ProfileImage.src}
              alt="upload image"
              className="img-display-before"
            />
          )}

          <input
            id="image-upload-input"
            type="file"
            onChange={handleImageChange}
            ref={hiddenFileInput}
            style={{ display: "none" }}
          />
        </div>

        <button
          className="image-upload-button"
          onClick={handleUploadButtonClick}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default UserProfileImage;
