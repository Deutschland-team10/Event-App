import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    MenuItem,
    Avatar,
    Card,
    CardContent,
    Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import useAxios from "../hook/useAxios";
import useAuthCall from "../hook/useAuthCall";

const ProfileForm = () => {
    const navigate = useNavigate();
    const { updateUser } = useAuthCall();
    const { currentUser } = useSelector((state) => state.auth);
    const { axiosWithToken } = useAxios();
    const [formData, setFormData] = useState({
        firstName: currentUser?.firstName || "",
        lastName: currentUser?.lastName || "",
        email: currentUser?.email || "",
        username: currentUser?.username || "",
        gender: currentUser?.gender || "",
        city: currentUser?.city || "",
        birthDate: currentUser?.birthDate || "",
        interests: currentUser?.interests || [],
        image: currentUser?.image || "",
    });

    useEffect(() => {
        const data = localStorage.getItem("userProfile");
        if (data) {
            setFormData(JSON.parse(data));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleInterestChange = (index, value) => {
        const updated = [...formData.interests];
        updated[index] = value;
        setFormData((prev) => ({ ...prev, interests: updated }));
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateUser(formData, currentUser._id);
        

    };

    return (
        <div className="max-w-4xl mx-auto mt-10 px-4">
            <div className="flex justify-center mb-6 flex-col items-center gap-2">
                <Avatar src={formData.image} sx={{ width: 100, height: 100 }} />
                <input type="file" accept="image/*" onChange={handleAvatarUpload} />
            </div>

            <Card className="shadow-lg mt-6">
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Typography variant="h6" className="mb-4 font-bold">
                            Profili Düzenle
                        </Typography>

                        <TextField
                            label="Ad"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Soyad"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Kullanıcı Adı"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            disabled
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            disabled
                        />
                        <TextField
                            label="Doğum Tarihi"
                            name="birthDate"
                            type="date"
                            value={formData.birthDate ? formData.birthDate.slice(0, 10) : ""}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Şehir"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />

                        <TextField
                            select
                            label="Cinsiyet"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        >
                            <MenuItem value="Male">Erkek</MenuItem>
                            <MenuItem value="Female">Kadın</MenuItem>
                            <MenuItem value="null">Diğer</MenuItem>
                        </TextField>

                        {[0, 1, 2].map((i) => (
                            <TextField
                                key={i}
                                placeholder={`İlgi Alanı ${i + 1}`}
                                value={formData.interests[i] || ""}
                                onChange={(e) => handleInterestChange(i, e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                        ))}

                        <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                            <Button type="submit" variant="contained" color="success" >
                                Kaydet
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => navigate("/home/profile")}
                            >
                                İptal
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfileForm;
