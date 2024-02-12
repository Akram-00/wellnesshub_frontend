import React from 'react'

interface ResetUserDataPopupProps {
  setResetUserData: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetUserData: React.FC<ResetUserDataPopupProps> = ({
  setResetUserData,
}) => {
  const resetUserData = async () => {};
  return <div>ResetUserData</div>;
};

export default ResetUserData