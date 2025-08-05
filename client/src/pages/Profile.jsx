import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Button,
  Avatar,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  
  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="flex justify-center mb-6">
        <Avatar
          src={currentUser.image || ""}
          alt="Profil Resmi"
          sx={{ width: 100, height: 100 }}
        />
      </div>

      <Card className="shadow-lg">
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div>
              <Typography variant="h5" fontWeight="bold">
                {currentUser.firstName} {currentUser.lastName}
              </Typography>
              <Typography color="text.secondary">@{currentUser.username}</Typography>
              <Typography color="text.secondary">{currentUser.email}</Typography>
            </div>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              color="warning"
              onClick={() => navigate("/home/profile/edit")}
            >
              EDIT
            </Button>
          </div>

          <Grid container spacing={2}>
            <Grid item xs={12} gap={4} marginTop={4}>
              <Typography>
                <strong>Geschlecht:</strong> {currentUser.gender}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <strong>Geburtsdatum:</strong> {currentUser.birthDate ? new Date(currentUser.birthDate).toLocaleDateString('tr-TR') : ""}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <strong>Stadt:</strong> {currentUser.city}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <strong>Interesse:</strong> {currentUser.interests?.join(", ")}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
