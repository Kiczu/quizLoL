import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Avatar,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Container,
} from "@mui/material";
import { getAuth, User } from "firebase/auth";
import ManageUserDataForm from "./ManageUserData";
import { userService } from "../../services/user";
import { scoreService } from "../../services/score";
import { colors } from "../../theme/colors";
import { paths } from "../../paths";
import {
  dashboardViewContainer,
  inputStyle,
  scoreCard,
  avatarGridContainer,
  smallAvatarStyle,
  totalScoreCard,
  smallAvatarsGrid,
  smallAvatarItem,
} from "./userDashboard.style";

type Score = {
  score: number;
};

const UserDashboard = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubsccribe = auth.onAuthStateChanged((user) => {
      if (user) {
        scoreService.get(user.uid).then((allPoints) => {
          // Zakładając, że allPoints to obiekt, gdzie wartości to obiekty { id: string }
          console.log(allPoints);
          const scoreData = Object.entries(allPoints).map(
            ([score, scoreObj]) => ({
              gameId: scoreObj.id,
              score,
            })
          );
          console.log(scoreData);
          // setScores(scoreData);
        });
      } else {
        setScores([]);
        setUser(null);
        navigate(paths.LOGIN);
      }
      return () => {
        unsubsccribe();
      };
    });
  }, [navigate]);

  const handleDeleteAccount = async () => {
    const success = await userService.remove();

    if (success) {
      navigate(paths.LOGIN);
      console.log("Account deleted successfully");
    } else {
      console.error("Failed to delete account");
    }
  };

  const totalScore = scores.reduce((total, score) => total + score.score, 0);

  return (
    <Box sx={dashboardViewContainer}>
      <Container maxWidth="xl">
        <Box sx={avatarGridContainer}>
          <Avatar
            sx={{ width: 120, height: 120, backgroundColor: colors.blue2 }}
          >
            A
          </Avatar>
          <Grid container spacing={2} sx={smallAvatarsGrid}>
            {[...Array(8)].map((_, index) => (
              <Grid item xs={6} sm={3} key={index} sx={smallAvatarItem}>
                <Avatar sx={smallAvatarStyle}>A{index + 1}</Avatar>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Grid container spacing={4}>
          {scores &&
            Object.entries(scores)
              .filter(([key]) => key !== "totalPoints")
              .map(([gameId, score], index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card sx={scoreCard}>
                    <CardContent>
                      <Typography variant="h5">{gameId}</Typography>
                      <Typography component="p" variant="h5" mt={1}>
                        {totalScore}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={totalScoreCard}>
              <CardContent>
                <Typography variant="h5">Total Score</Typography>
                <Typography component="p" variant="h5" mt={1}>
                  {totalScore ?? "No scores yet"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={5} mt={2}>
          <Grid item sm={12} md={8}>
            <Typography variant="h5" mb={2}>
              Edit Your Information
            </Typography>
            <Box mb={3} mt={3}>
              <ManageUserDataForm user={user} />
            </Box>
            <Box mb={3} mt={3}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                variant="outlined"
                sx={inputStyle}
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                variant="outlined"
                sx={inputStyle}
              />
              <Button variant="contained">Save Changes</Button>
            </Box>
          </Grid>
          <Grid item sm={12} md={4}>
            <Typography variant="h5" mb={2} sx={{ color: colors.gold2 }}>
              Danger Zone
            </Typography>
            <Typography variant="body1" mb={2}>
              Once you delete your account, there is no going back. Please be
              certain.
            </Typography>
            <Button variant="contained" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default UserDashboard;
