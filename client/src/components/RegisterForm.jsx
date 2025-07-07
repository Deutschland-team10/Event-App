import {
    TextField,
    Button,
    Box,
    Typography,
} from "@mui/material";
import GoogleIcon from "../assets/GoogleIcon";
import { useNavigate } from 'react-router-dom'; // Yönlendirme için
import { signInWithGoogle } from "../helper/firebase"; // Firebase yapılandırma dosyanızdan import edin

const RegisterForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
}) => {
    const navigate = useNavigate(); // Yönlendirme hook'u

    const signUpGoogle = async () => {
        try {
            await signInWithGoogle();
            // Başarılı giriş sonrası yönlendirme
            navigate('/'); // Kullanıcının yönlendirileceği sayfa (örneğin: /dashboard veya /home)
            console.log("Google ile başarıyla oturum açıldı!");
        } catch (error) {
            console.error("Google ile oturum açma başarısız oldu:", error);
            // Hata durumunda kullanıcıya bilgi verebilirsiniz, örneğin bir toast mesajı ile
        }
    };

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
                Register
            </Typography>

            <TextField
                label="Username"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
            />

            <TextField
                label="First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
            />

            <TextField
                label="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
            />

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
                SUBMIT
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
        </Box >
    );
};

export default RegisterForm;