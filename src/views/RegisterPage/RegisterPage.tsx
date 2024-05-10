import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
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

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const defaultTheme = createTheme();

const RegisterPage = () => {
  const { handleCreateUser } = useAuth();

  const handleSubmit = (v: Values) => {
    handleCreateUser({
      name: v.firstName,
      surname: v.lastName,
      email: v.email,
      password: v.password,
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Zarejestruj się
          </Typography>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
            onSubmit={handleSubmit}
          >
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
                      required
                      fullWidth
                      id="lastName"
                      label="Nazwisko"
                      name="lastName"
                      autoComplete="family-name"
                      value={values.lastName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Adres E-mail"
                      name="email"
                      autoComplete="email"
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
                      autoComplete="new-password"
                      value={values.password}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="Zgadzam się na otrzymywanie dodatkowych informacji marketingowych drogą elektroniczną."
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
