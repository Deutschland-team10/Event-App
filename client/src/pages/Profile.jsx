import { useNavigate } from "react-router-dom";
import { Button, Avatar, Card, CardContent, Typography, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userProfile");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

 

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="flex justify-center mb-6">
        <Avatar
          src={user.avatar || ""}
          alt="Profil Resmi"
          sx={{ width: 100, height: 100 }}
        />
      </div>

      <Card className="shadow-lg">
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div>
              <Typography variant="h5" fontWeight="bold">
                {user.name} {user.surname}
              </Typography>
              <Typography color="text.secondary">@{user.username}</Typography>
              <Typography color="text.secondary">{user.email}</Typography>
            </div>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => navigate("/profile/edit")}
            >
              Düzenle
            </Button>
          </div>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Cinsiyet:</strong> {user.gender}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Doğum Tarihi:</strong> {user.birthdate}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Şehir:</strong> {user.city}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography><strong>İlgi Alanları:</strong> {user.interests?.join(", ")}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;


