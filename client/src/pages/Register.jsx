import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/registerPp.png";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import AuthHeader from "../components/AuthHeader";
import AuthImage from "../components/AuthImage";
import { Formik } from "formik";
import * as Yup from "yup";
import useAuthCall from "../hook/useAuthCall";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
    const { register } = useAuthCall();

    const SignupSchema = Yup.object().shape({
        username: Yup.string()
            .min(5, "Der Benutzername darf nicht weniger als 5 Zeichen lang sein")
            .max(50, "Der Benutzername darf nicht länger als 50 Zeichen sein")
            .required("Der Benutzername ist obligatorisch"),
        firstName: Yup.string()
            .min(2, "Zu kurz!")
            .max(50, "Zu lang!")
            .required("Erforderlich(Notwendig)"),
        lastName: Yup.string()
            .min(2, "Zu kurz!")
            .max(50, "Zu lang!")
            .required("Erforderlich(Notwendig)"),
        email: Yup.string()
            .email("E-Mail-Adresse muss @-Zeichen enthalten")
            .required("Dieses Feld ist obligatorisch"),
        password: Yup.string()
            .min(8, "Das Passwort muss mehr als 8 Zeichen enthalten")
            .matches(/[a-z]/, "Das Passwort muss Kleinbuchstaben enthalten")
            .matches(/[A-Z]/, "Das Passwort muss Großbuchstaben enthalten")
            .matches(/\d+/, "Das Passwort muss numerische Zeichen enthalten")
            .matches(/[@$?!%&*]+/, "Muss Sonderzeichen enthalten(@$?!%&*)"),
    });

    return (
        <Container maxWidth="lg">
            <Grid
                container
                justifyContent="center"
                direction="row-reverse"
                rowSpacing={{ sm: 3 }}
                sx={{
                    height: "100vh",
                    p: 2,
                }}
            >
                <AuthHeader />

                <Grid item xs={12} sm={10} md={6}>
                    <Avatar
                        sx={{
                            backgroundColor: "secondary.light",
                            m: "auto",
                            width: 40,
                            height: 40,
                        }}
                    >
                        <LockIcon size="30" />
                    </Avatar>
                    <Typography
                        variant="h4"
                        align="center"
                        mb={2}
                        color="secondary.light"
                    >
                        Register
                    </Typography>
                    {/* /* -------------------------------------------------------------------------- */}
                    {/* FORMİK YAPISI */}

                    <Formik
                        initialValues={{
                            username: "",
                            firstName: "",
                            lastName: "",
                            email: "",
                            password: "",
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={(values, actions) => {
                            register(values)
                            actions.resetForm()
                            actions.setSubmitting(false)
                        }}

                        component={(props) => <RegisterForm  {...props} />}
                    />

                    {/* /* -------------------------------------------------------------------------- */}
                    <Box sx={{ textAlign: "center", mt: 2, color: "secondary.main" }}>
                        <Link to="/">Sie haben bereits ein Konto? Sign In</Link>
                    </Box>
                </Grid>

                <AuthImage image={image} />
            </Grid>
        </Container>
    );
};

export default Register;
