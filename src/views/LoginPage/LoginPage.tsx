import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { Form, Formik } from "formik";
import { useAuth } from "../../context/LoginContext/LoginContext";
import { paths } from "../../paths";

const LoginWithGooglebutton = styled(Button)({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px",
  width: "100%",
});

interface Values {
  email: string;
  password: string;
}

const defaultTheme = createTheme();

const LoginPage = () => {
  const { handleSignIn, handleSignInWithGoogle } = useAuth();

  const handleSubmit = (v: Values) => {
    const eMail = v.email;
    const password = v.password;

    handleSignIn(eMail, password);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <Box sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Adres e-mail"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={values.email}
                      onChange={handleChange}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Hasło"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={values.password}
                      onChange={handleChange}
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Zapamiętaj mnie"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Zapomniałeś hasła?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href={paths.REGISTER} variant="body2">
                          {"Nie masz konta? Zarejestruj się"}
                        </Link>
                      </Grid>
                    </Grid>
                    <Box m={2} mx={0}>
                      Lub zaloguj się za pomocą:
                    </Box>
                    <Grid justifyContent="center">
                      <LoginWithGooglebutton onClick={handleSignInWithGoogle}>
                        Google
                      </LoginWithGooglebutton>
                    </Grid>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginPage;
