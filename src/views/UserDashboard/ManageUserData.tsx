import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { User } from "firebase/auth";
import { updateUserDetails, updateUserEmail } from "../../api/firebase/firebse"; // Zakładam, że masz te funkcje

interface ManageUserDataFormProps {
  user: User | null;
}

const ManageUserDataForm = ({ user }: ManageUserDataFormProps) => {
  const [login, setLogin] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (data: any) => {
    console.log("data to submit: " + data);
    if (!user) return;

    const updatedData: Partial<{
      login: string;
      firstName: string;
      email: string;
    }> = {};

    if (login.trim() !== "") {
      updatedData.login = login;
    }
    if (firstName.trim() !== "") {
      updatedData.firstName = firstName;
    }
    if (email.trim() !== "" && email !== user.email) {
      updatedData.email = email;
    }

    try {
      if (Object.keys(updatedData).length > 0) {
        await updateUserDetails(user.uid, updatedData);
      }

      if (updatedData.email) {
        await updateUserEmail(updatedData.email);
      }

      alert("Dane użytkownika zostały zaktualizowane.");
    } catch (error) {
      alert("Wystąpił błąd podczas aktualizacji danych użytkownika.");
      console.error(error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Login"
        fullWidth
        variant="outlined"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="First Name"
        fullWidth
        variant="outlined"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email"
        fullWidth
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained">
        Save Changes
      </Button>
    </Box>
  );
};

export default ManageUserDataForm;
