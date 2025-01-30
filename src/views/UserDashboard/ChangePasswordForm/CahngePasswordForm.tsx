import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { inputStyle } from "../userDashboard.style";

interface Props {
  handlePasswordChange: (passwordData: {
    newPassword: string;
    confirmPassword: string;
  }) => void;
}

const ChangePasswordForm = ({ handlePasswordChange }: Props) => {
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  return (
    <Box>
      <TextField
        name="newPassword"
        label="New Password"
        type="password"
        value={passwordData.newPassword}
        onChange={handleInputChange}
        fullWidth
        variant="outlined"
        sx={inputStyle}
      />
      <TextField
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        value={passwordData.confirmPassword}
        onChange={handleInputChange}
        fullWidth
        variant="outlined"
        sx={inputStyle}
      />
      <Button
        variant="contained"
        onClick={() => handlePasswordChange(passwordData)}
      >
        Change Password
      </Button>
    </Box>
  );
};

export default ChangePasswordForm;
