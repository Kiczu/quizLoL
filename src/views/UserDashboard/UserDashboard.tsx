import { Box, Grid, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "./useUserFormData";
import { useScores } from "./ScoresSection/useScores";
import AvatarSection from "./AvatarSection/AvatarSection";
import ScoresSection from "./ScoresSection/ScoresSection";
import EditUserForm from "./EditUserForm/EditUserForm";
import ChangePasswordForm from "./ChangePasswordForm/CahngePasswordForm";
import DangerZone from "./DangerZone/DangerZone";
import { useAuth } from "../../context/LoginContext/LoginContext";
import { userService } from "../../services/userService";
import { paths } from "../../paths";
import {
  dashboardViewContainer,
  dataFormsContainer,
} from "./userDashboard.style";

const UserDashboard = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const { formData, setFormData, updateUserProfile, isUsernameEditable } =
    useUserProfile();
  const { scores } = useScores(userData?.uid);

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      const success = await userService.deleteUser();
      if (success) {
        navigate(paths.LOGIN);
        alert("Account deleted successfully.");
      } else {
        alert("Failed to delete account.");
      }
    }
  };

  return (
    <Box sx={dashboardViewContainer}>
      <Container maxWidth="xl">
        <AvatarSection />
        <ScoresSection scores={scores} />
        <Grid container spacing={10} mt={0}>
          <Grid item sm={12} md={8} sx={dataFormsContainer}>
            <Typography variant="h5">Edit Your Data</Typography>
            <EditUserForm
              formData={formData}
              isUsernameEditable={isUsernameEditable}
              onSubmit={updateUserProfile}
            />
            <ChangePasswordForm
              handlePasswordChange={userService.handlePasswordChange}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <DangerZone handleDeleteAccount={handleDeleteAccount} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default UserDashboard;
