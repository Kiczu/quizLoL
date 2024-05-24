import * as yup from "yup";
import {
  Box,
  Button,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useAuth } from "../../context/LoginContext/LoginContext";

const defaultTheme = createTheme();

const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email("Wprowadź poprawny adres E-Mail")
    .required("E-Mail jest wymagany"),
});

interface Values {
  email: string;
}

const initValues: Values = {
  email: "",
};

const ForgotPassword = () => {
  const { handleSendResetPasswordEmail } = useAuth();

  const handleSubmit = ({ email }: Values) =>
    handleSendResetPasswordEmail(email);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="div" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12}>
          <Box
            sx={{
              my: 15,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5" sx={{ my: 2 }}>
              Resetowanie hasła
            </Typography>
            <Typography component="p">
              Wpisz adres e-mail na który ma zostać wysłana wiadomość z linkiem
            </Typography>
            <Formik
              initialValues={initValues}
              onSubmit={handleSubmit}
              validationSchema={emailSchema}
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
                      label="Adres e-mail"
                      name="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.email) && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Send email
                    </Button>
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

export default ForgotPassword;
