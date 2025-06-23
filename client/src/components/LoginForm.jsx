import {
    TextField,
    Button,
    Box,
    Typography,
} from "@mui/material";
import { object, string } from "yup";
export const loginScheme = object({
    email: string()
        .email("Lutfen valid bir email giriniz")
        .required("Email zorunludur"),
    password: string()
        .required("password zorunludur")
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
                className="btn-danger flex justify-between text-center"
            // onClick={signUpGooglE}
            >
                Continue with Google
                <GoogleIcon color="currentColor" />
            </Button>
        </Box>
    );
};
export default LoginForm;