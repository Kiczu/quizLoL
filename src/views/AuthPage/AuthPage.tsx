import { useLocation, Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, Paper, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { getRandomImage } from "./authPage.utils";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import { paths } from "../../paths";
import { useAuth } from "../../context/LoginContext/LoginContext";

const animationVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const AuthPage = () => {
  const location = useLocation();

  const { handleSignInWithGoogle } = useAuth();

  const isLogin = location.pathname === paths.LOGIN;
  const isRegister = location.pathname === paths.REGISTER;
  const isResetPassword = location.pathname === paths.RESET_PASSWORD;

  return (
    <Grid
      container
      component="main"
      sx={{
        minHeight: "90vh",
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
        p={12}
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
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={animationVariants}
            transition={{ duration: 0.5 }}
          >
            {location.pathname === paths.LOGIN && <LoginForm />}
            {location.pathname === paths.REGISTER && <RegisterForm />}
            {location.pathname === paths.RESET_PASSWORD && <ForgotPassword />}
            <Grid container>
              <Grid item xs>
                {isResetPassword ? (
                  <Link component={RouterLink} to={paths.LOGIN}>
                    Back to login
                  </Link>
                ) : (
                  <Link href={paths.RESET_PASSWORD}>Forgot password?</Link>
                )}
              </Grid>
              <Grid item>
                {isLogin ? (
                  <Link component={RouterLink} to={paths.REGISTER}>
                    Don't have an account? Sign up
                  </Link>
                ) : isRegister ? (
                  <Link component={RouterLink} to={paths.LOGIN}>
                    Have an account already? Sign in
                  </Link>
                ) : null}
              </Grid>
            </Grid>
            <Typography m={2} mx={0}>
              Or login with:
            </Typography>
            <Button variant="outlined" onClick={handleSignInWithGoogle}>
              Google
            </Button>
          </motion.div>
        </AnimatePresence>
      </Grid>
    </Grid>
  );
};

export default AuthPage;
