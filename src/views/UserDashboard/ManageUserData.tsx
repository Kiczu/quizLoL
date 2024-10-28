import * as yup from "yup";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { User } from "firebase/auth";
import { userService } from "../../services/user";
import { Form, Formik } from "formik";

type ManageUserDetails = {
  login: string;
  firstName: string;
  email: string;
};

const changeUserDataSchema = yup.object().shape({
  login: yup.string(),
  firstName: yup.string(),
  email: yup.string().email("Wprowadz poprawny adres email"),
});

interface ManageUserDataFormProps {
  user: User | null;
}

const initValues = {
  login: "",
  firstName: "",
  email: "",
};

const ManageUserDataForm = ({ user }: ManageUserDataFormProps) => {
  const [login, setLogin] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (values: ManageUserDetails) => {
    if (!user) return;

    const updatedData = {
      login: values.login,
      firstName: values.firstName,
      email: values.email !== user.email ? values.email : undefined,
    };

    try {
      await userService.update(user.uid, updatedData);
      alert("Dane użytkownika zostały zaktualizowane.");
    } catch (error) {
      alert("Wystąpił błąd podczas aktualizacji danych użytkownika.");
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={initValues}
      onSubmit={handleSubmit}
      validationSchema={changeUserDataSchema}
    >
      {({
        values,
        handleBlur,
        handleChange,
        handleSubmit,
        errors,
        touched,
      }) => (
        <Form>
          <TextField
            label="Login"
            name="login"
            fullWidth
            variant="outlined"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained">
            Save Changes
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ManageUserDataForm;
