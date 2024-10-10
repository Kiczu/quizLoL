import * as yup from "yup";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { getRandomImage } from "./loginPage.utils";
import { useAuth } from "../../context/LoginContext/LoginContext";
import { paths } from "../../paths";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("E-Mail is required"),
  password: yup.string().required("Password is required"),
});

interface Values {
  email: string;
  password: string;
}

const initValues: Values = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const { handleSignIn, handleSignInWithGoogle } = useAuth();

  const handleSubmit = ({ email, password }: Values) => {
    handleSignIn(email, password);
  };

  return (
    <>
      <Grid
        container
        component="main"
        sx={{
          height: "90vh",
          backgroundImage: `url(${getRandomImage()})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Grid item xs={false} sm={4} md={7} />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          square
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(10, 20, 40 ,0.6)",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={initValues}
            onSubmit={handleSubmit}
            validationSchema={loginSchema}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              handleBlur,
              errors,
              touched,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Box sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="E-Mail"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={
                      touched.email && errors.email ? errors.email : " "
                    }
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={
                      touched.password && errors.password
                        ? errors.password
                        : " "
                    }
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href={paths.RESET_PASSWORD} variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href={paths.REGISTER} variant="body2">
                        Don't have an account? Sign Up
                      </Link>
                    </Grid>
                  </Grid>
                  <Box m={2} mx={0}>
                    Or login with:
                  </Box>
                  <Grid justifyContent="center">
                    <Button variant="outlined" onClick={handleSignInWithGoogle}>
                      Google
                    </Button>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;
