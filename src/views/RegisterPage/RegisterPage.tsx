import * as yup from "yup";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  Link,
  Grid,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Form, Formik } from "formik";
import { useAuth } from "../../context/LoginContext/LoginContext";
import { paths } from "../../paths";
import type { UserData } from "../../api/types";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("Imię jest wymagane"),
  lastName: yup.string().required("Nazwisko jest wymagane"),
  email: yup
    .string()
    .email("Wprowadź poprawny adres E-Mail")
    .required("E-Mail jest wymagany"),
  password: yup.string().required("Hasło jest wymagane"),
  confirmPassword: yup
    .string()
    .required("Hasła muszą być takie same")
    .oneOf([yup.ref("password")], "Hasła muszą być takie same"),
});

interface RegistrationData extends UserData {
  confirmPassword: string;
}

const initValues: RegistrationData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const defaultTheme = createTheme();

const RegisterPage = () => {
  const { handleCreateUser } = useAuth();

  const handleSubmit = (values: UserData) => handleCreateUser(values);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5" margin={2}>
            Zarejestruj się
          </Typography>
          <Formik
            initialValues={initValues}
            onSubmit={handleSubmit}
            validationSchema={registerSchema}
          >
            {({
              values,
              handleBlur,
              handleChange,
              handleSubmit,
              errors,
              touched,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      fullWidth
                      id="firstName"
                      label="Imię"
                      autoFocus
                      value={values.firstName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        (Boolean(touched.firstName) &&
                          Boolean(errors.firstName)) ||
                        (Boolean(values.confirmPassword) &&
                          !errors.confirmPassword)
                      }
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="family-name"
                      name="lastName"
                      fullWidth
                      id="lastName"
                      label="Nazwisko"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        (Boolean(touched.lastName) &&
                          Boolean(errors.lastName)) ||
                        (Boolean(values.confirmPassword) &&
                          !errors.confirmPassword)
                      }
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="email"
                      name="email"
                      fullWidth
                      id="email"
                      label="Adres E-mail"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        (Boolean(touched.email) && Boolean(errors.email)) ||
                        (Boolean(values.confirmPassword) &&
                          !errors.confirmPassword)
                      }
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="password"
                      label="Hasło"
                      type="password"
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        (Boolean(touched.password) &&
                          Boolean(errors.password)) ||
                        (Boolean(values.confirmPassword) &&
                          !errors.confirmPassword)
                      }
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="confirmPassword"
                      label="Potwierdź hasło"
                      type="password"
                      id="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        (Boolean(touched.confirmPassword) &&
                          Boolean(errors.confirmPassword)) ||
                        (Boolean(values.confirmPassword) &&
                          !errors.confirmPassword)
                      }
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Zarejestruj
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href={paths.LOGIN} variant="body2">
                      Masz już konto? Zaloguj się
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterPage;
