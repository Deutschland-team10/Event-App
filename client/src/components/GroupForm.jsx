import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Button,
  MenuItem,
  TextField,
  Snackbar,
  InputAdornment,
  Paper,
  Fade,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";
import MapIcon from "@mui/icons-material/Map";


import { useFormik } from "formik";
import * as yup from "yup";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// Leaflet icon düzeltmesi
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// ChangeView component: Harita üzerindeki görünümü güncellemek için kullanılır
function ChangeView({ center }) {
  const map = useMap();
  React.useEffect(() => {
    if (center && center.length === 2) {
      map.setView(center, 13);
    }
  }, [center, map]);
  return null;
}

const validationSchema = yup.object({
  title: yup.string().required("Etkinlik başlığı zorunlu"),
  description: yup.string().required("Açıklama zorunlu"),
  date: yup.date().required("Tarih gerekli").nullable(),
  community: yup.string().required("Topluluk seçimi zorunlu"),
  guestCount: yup
    .number()
    .typeError("Sayı girilmeli")
    .positive("Pozitif sayı olmalı")
    .required("Katılımcı sayısı gerekli"),
  address: yup.string().required("Adres gerekli"),
});

const GroupForm = ({onClose, onSubmit}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [position, setPosition] = useState([51.1657, 10.4515]); // Başlangıç pozisyonu
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: null,
      community: "",
      guestCount: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setSnackbarOpen(true);
      
      // Koordinatları düzgün formatta gönder - bu çok önemli!
      const eventData = {
        ...values,
        organizer: "Kullanıcı",
        avatarGroup: [],
        image: null,
        id: Date.now()
      };
      
    
      
      onSubmit(eventData);
      formik.resetForm();
      setShowMap(false);
      setCoordinates(null);
      setTimeout(() => {
        onClose();
      }, 2000);
    },
  });


  const communityOptions = [
    { value: "technology", label: "Teknoloji" },
    { value: "art", label: "Sanat" },
    { value: "music", label: "Müzik" },
    { value: "sports", label: "Spor" },
    { value: "social", label: "Sosyal Sorumluluk" },
  ];

  const commonTextFieldStyles = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#fafafa",
      "& fieldset": { borderColor: "#e0e0e0" },
      "&:hover fieldset": { borderColor: "#2196f3" },
      "&.Mui-focused fieldset": { borderColor: "#1976d2" },
    },
    "& .MuiInputLabel-root": { color: "#555" },
    "& .MuiInputBase-input": { color: "#333" },
    "& .MuiFormHelperText-root": { color: "#666" },
    marginBottom: 2
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper
        elevation={2}
        sx={{
          p: 4,
          borderRadius: 2,
          background: "#ffffff",
          border: "1px solid #e8e8e8",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#2c3e50", textAlign: "center" }}>
          <EventIcon sx={{ mr: 1, color: "#1976d2" }} />
          Etkinlik Detayları
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="title"
            name="title"
            label="Etkinlik Başlığı"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            margin="normal"
            sx={commonTextFieldStyles}
          />

          <TextField
            fullWidth
            id="description"
            name="description"
            label="Etkinlik Açıklaması"
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionIcon sx={{ color: "#1976d2" }} />
                </InputAdornment>
              ),
            }}
            sx={commonTextFieldStyles}
          />

          <DatePicker
            label="Etkinlik Tarihi"
            value={formik.values.date}
            onChange={(value) => formik.setFieldValue("date", value)}
            renderInput={(params) => (
              <TextField
                fullWidth
                {...params}
                margin="normal"
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date}
                sx={commonTextFieldStyles}
              />
            )}
          />

          <FormControl
            fullWidth
            margin="normal"
            error={formik.touched.community && Boolean(formik.errors.community)}
          >
            <InputLabel
              id="community-label"
              sx={{ color: "#555" }}
            >
              Topluluk
            </InputLabel>
            <Select
              labelId="community-label"
              id="community"
              name="community"
              value={formik.values.community}
              label="Topluluk"
              onChange={formik.handleChange}
              sx={{
                ...commonTextFieldStyles,
                "& .MuiSelect-icon": { color: "#1976d2" },
              }}
              startAdornment={
                <InputAdornment position="start">
                  <PeopleIcon sx={{ color: "#1976d2", ml: 1 }} />
                </InputAdornment>
              }
            >
              {communityOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            id="guestCount"
            name="guestCount"
            label="Katılımcı Sayısı"
            type="number"
            value={formik.values.guestCount}
            onChange={formik.handleChange}
            error={
              formik.touched.guestCount && Boolean(formik.errors.guestCount)
            }
            helperText={formik.touched.guestCount && formik.errors.guestCount}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PeopleIcon sx={{ color: "#1976d2" }} />
                </InputAdornment>
              ),
            }}
            sx={commonTextFieldStyles}
          />

          <TextField
            fullWidth
            id="address"
            name="address"
            label="Adres"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon sx={{ color: "#1976d2" }} />
                </InputAdornment>
              ),
            }}
            sx={commonTextFieldStyles}
          />

         
          

          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            size="large"
            sx={{
              mt: 3,
              py: 1.5,
              backgroundColor: "#1976d2",
              color: "white",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#1565c0",
                transform: "translateY(-1px)",
                boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
              },
            }}
          >
            Group Form
          </Button>
        </Box>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message="Etkinlik başarıyla oluşturuldu!"
        />
      </Paper>
    </LocalizationProvider>
  );
};

export default GroupForm;