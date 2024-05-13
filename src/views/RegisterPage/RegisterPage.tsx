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

const initValues: UserData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
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
          <Formik initialValues={initValues} onSubmit={handleSubmit}>
            {({ values, handleChange, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="Imię"
                      autoFocus
                      value={values.firstName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="family-name"
                      name="lastName"
                      required
                      fullWidth
                      id="lastName"
                      label="Nazwisko"
                      value={values.lastName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="email"
                      name="email"
                      required
                      fullWidth
                      id="email"
                      label="Adres E-mail"
                      value={values.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Hasło"
                      type="password"
                      id="password"
                      value={values.password}
                      onChange={handleChange}
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
