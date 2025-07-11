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
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import useAxios from "../hook/useAxios";

const ProfileForm = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const { axiosWithToken } = useAxios();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    gender: "",
    city: "",
    birthdate: "",
    interests: [],
    avatar: "",
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
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosWithToken.put(
        `http://127.0.0.1:8000/profile/${currentUser._id}`,
        formData
      );
      console.log(res);
      // localStorage.setItem("userProfile", JSON.stringify(res.data.profile));
      // toast.success("Profil başarıyla güncellendi!");
      // navigate("/profile");
    } catch (err) {
      console.error(err);
      toast.error("Profil güncellenemedi.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="flex justify-center mb-6 flex-col items-center gap-2">
        <Avatar src={formData.avatar} sx={{ width: 100, height: 100 }} />
        <input type="file" accept="image/*" onChange={handleAvatarUpload} />
      </div>

      <Card className="shadow-lg">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Typography variant="h6" className="mb-4 font-bold">
              Profili Düzenle
            </Typography>

            <TextField
              label="Ad"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Soyad"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Kullanıcı Adı"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Doğum Tarihi"
              name="birthdate"
              type="date"
              value={formData.birthdate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Şehir"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              select
              label="Cinsiyet"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="Erkek">Erkek</MenuItem>
              <MenuItem value="Kadın">Kadın</MenuItem>
              <MenuItem value="Diğer">Diğer</MenuItem>
            </TextField>

            {[0, 1, 2].map((i) => (
              <TextField
                key={i}
                placeholder={`İlgi Alanı ${i + 1}`}
                value={formData.interests[i] || ""}
                onChange={(e) => handleInterestChange(i, e.target.value)}
                fullWidth
              />
            ))}

            <div className="flex gap-4 mt-6">
              <Button type="submit" variant="contained" color="primary">
                Kaydet
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/profile")}
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
