import React from 'react'
interface DeleteUserPopupProps {
  setDeleteUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteUserData: React.FC<DeleteUserPopupProps> = ({
  setDeleteUser,
}) => {
  const deleteUserAccount = async () => {};
  return <div>DeleteUserData</div>;
};

export default DeleteUserData