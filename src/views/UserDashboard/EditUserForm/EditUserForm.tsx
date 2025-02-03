import { Box, TextField, Button } from "@mui/material";
import { inputStyle } from "../userDashboard.style";

interface Props {
  formData: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveChanges: () => void;
}

const EditUserForm = ({
  formData,
  handleInputChange,
  handleSaveChanges,
}: Props) => (
  <Box mb={3}>
    <TextField
      name="firstName"
      label="First Name"
      value={formData.firstName}
      onChange={handleInputChange}
      fullWidth
      variant="outlined"
      sx={inputStyle}
    />
    <TextField
      name="lastName"
      label="Last Name"
      value={formData.lastName}
      onChange={handleInputChange}
      fullWidth
      variant="outlined"
      sx={inputStyle}
    />
    <TextField
      name="email"
      label="Email"
      value={formData.email}
      onChange={handleInputChange}
      fullWidth
      variant="outlined"
      sx={inputStyle}
    />
    <Button variant="contained" onClick={handleSaveChanges}>
      Save Changes
    </Button>
  </Box>
);

export default EditUserForm;
