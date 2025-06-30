import {
    TextField,
    Button,
    Box,
    Typography,
} from "@mui/material";
import GoogleIcon from "../assets/GoogleIcon";
import { object, string } from "yup";

export const loginSchema = object({
    email: string()
        .email("Bitte geben Sie eine gültige E-Mail ein")
        .required("E-Mail ist obligatorisch"),
    password: string()
        .required("Kennwort ist obligatorisch")
})

const LoginForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
}) => {
    const signUpGoogle = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error("Anmeldung bei Google fehlgeschlagen:", error);
        }
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxWidth: 400,
                margin: "auto",
                padding: 3,
            }}
        >
            <Typography variant="h5" align="center">
                Login
            </Typography>

            <TextField
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
            />

            <TextField
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
            />

            <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{ mt: 2 }}
            >
                Login
            </Button>

            <Button
                type="button"
                variant="contained"
                onClick={signUpGoogle}
                sx={{ mt: 2, bgcolor: "#db4437", "&:hover": { bgcolor: "#c1351d" } }}
                startIcon={<GoogleIcon />}
            >
                Weiter mit Google
            </Button>
        </Box>
    );
};

export default LoginForm;