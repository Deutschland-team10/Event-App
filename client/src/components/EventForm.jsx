// ModernEventForm bileşeni: Bir etkinlik oluşturma formudur.
// MUI bileşenleri, Formik + Yup validasyonu, Leaflet haritası ve bazı ikonlar içerir.

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

import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People';
import MapIcon from '@mui/icons-material/Map';

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { useFormik } from "formik";
import * as yup from "yup";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// ChangeView component: Harita üzerindeki görünümü güncellemek için kullanılır
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, 13);
  return null;
}

// Yup şeması: Formdaki alanlar için kurallar tanımlanır
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

// Form bileşeni:
const EventForm = ({ onClose, onSubmit }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [position, setPosition] = useState([36.8969, 30.7133]); // Başlangıç pozisyonu
  const [showMap, setShowMap] = useState(false);

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
      setSnackbarOpen(true); // Başarılı gönderim bildirimi
      onSubmit(values);      // Ana parent bileşene veri gönderimi
      formik.resetForm();    // Form sıfırlanır
      setShowMap(false);     // Harita gizlenir
      setTimeout(() => {
        onClose();           // Modal veya form kapanır
      }, 2000);
    },
  });

  const handleChange = (e) => {
    console.log(e);
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Database info bilgisini gönderme işlemi yapılacak
    postStockData("firms",info)

  };

  // Harita koordinatlarını adres üzerinden almak
  const handleShowMap = () => {
    if (!formik.values.address) {
      alert("Lütfen haritada görmek için bir adres girin.");
      return;
    }
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formik.values.address)}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          setPosition([lat, lon]);
          setShowMap(true);
        } else {
          alert("Adres bulunamadı. Lütfen adresi kontrol edin.");
        }
      })
      .catch(err => console.log('Geocoding error:', err));
  };

  // Leaflet için özel ikon
  const customMarkerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  // Topluluk dropdown listesi için veriler
  const communityOptions = [
    { value: 'technology', label: 'Teknoloji' },
    { value: 'art', label: 'Sanat' },
    { value: 'music', label: 'Müzik' },
    { value: 'sports', label: 'Spor' },
    { value: 'social', label: 'Sosyal Sorumluluk' },
  ];

  const commonTextFieldStyles = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(255,255,255,0.1)',
      '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
      '&.Mui-focused fieldset': { borderColor: 'white' },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.8)' },
    '& .MuiInputBase-input': { color: 'white' },
    '& .MuiFormHelperText-root': { color: 'rgba(255,255,255,0.9)' },
  };

  // Return JSX
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={8} sx={{ p: 4, maxWidth: 600, mx: "auto", borderRadius: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
            <EventIcon /> Modern Etkinlik Oluştur
          </Typography>
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Form başlangıcı */}
        <Box component="form" onSubmit={formik.handleSubmit}>
          {/* Title alanı */}
          <TextField fullWidth id="title" name="title" label="Etkinlik Başlığı" value={formik.values.title} onChange={formik.handleChange} error={formik.touched.title && Boolean(formik.errors.title)} helperText={formik.touched.title && formik.errors.title} margin="normal" sx={commonTextFieldStyles} />

          {/* Description alanı */}
          <TextField fullWidth id="description" name="description" label="Etkinlik Açıklaması" multiline rows={4} value={formik.values.description} onChange={formik.handleChange} error={formik.touched.description && Boolean(formik.errors.description)} helperText={formik.touched.description && formik.errors.description} margin="normal" InputProps={{ startAdornment: (<InputAdornment position="start"><DescriptionIcon sx={{ color: 'rgba(255,255,255,0.8)', mt: '-40px' }} /></InputAdornment>) }} sx={commonTextFieldStyles} />

          {/* Tarih alanı */}
          <DatePicker label="Etkinlik Tarihi" value={formik.values.date} onChange={(value) => formik.setFieldValue("date", value)} renderInput={(params) => (<TextField fullWidth {...params} margin="normal" error={formik.touched.date && Boolean(formik.errors.date)} helperText={formik.touched.date && formik.errors.date} sx={commonTextFieldStyles} />)} />

          {/* Topluluk dropdown */}
          <FormControl fullWidth margin="normal" error={formik.touched.community && Boolean(formik.errors.community)}>
            <InputLabel id="community-label" sx={{ color: 'rgba(255,255,255,0.8)' }}>Topluluk</InputLabel>
            <Select labelId="community-label" id="community" name="community" value={formik.values.community} label="Topluluk" onChange={formik.handleChange} sx={{ ...commonTextFieldStyles, '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.8)' } }} startAdornment={<InputAdornment position="start"><PeopleIcon sx={{ color: 'rgba(255,255,255,0.8)', ml: 1 }} /></InputAdornment>}>
              {communityOptions.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
            </Select>
          </FormControl>

          {/* Guest count alanı */}
          <TextField fullWidth id="guestCount" name="guestCount" label="Katılımcı Sayısı" type="number" value={formik.values.guestCount} onChange={formik.handleChange} error={formik.touched.guestCount && Boolean(formik.errors.guestCount)} helperText={formik.touched.guestCount && formik.errors.guestCount} margin="normal" InputProps={{ startAdornment: (<InputAdornment position="start"><PeopleIcon sx={{ color: 'rgba(255,255,255,0.8)' }} /></InputAdornment>) }} sx={commonTextFieldStyles} />

          {/* Adres alanı */}
          <TextField fullWidth id="address" name="address" label="Adres" value={formik.values.address} onChange={formik.handleChange} error={formik.touched.address && Boolean(formik.errors.address)} helperText={formik.touched.address && formik.errors.address} margin="normal" InputProps={{ startAdornment: (<InputAdornment position="start"><LocationOnIcon sx={{ color: 'rgba(255,255,255,0.8)' }} /></InputAdornment>) }} sx={commonTextFieldStyles} />

          {/* Harita gösterme butonu */}
          <Button variant="outlined" onClick={handleShowMap} startIcon={<MapIcon />} sx={{ mt: 1, mb: 2, color: 'white', borderColor: 'rgba(255,255,255,0.5)', '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' } }}>Haritayı Göster</Button>

          {/* Harita görünümü */}
          {showMap && (
            <Fade in={showMap}>
              <Box sx={{ height: 250, mt: 2, borderRadius: 2, overflow: 'hidden' }}>
                <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                  <ChangeView center={position} />
                  <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={position} icon={customMarkerIcon}>
                    <Popup>{formik.values.address}</Popup>
                  </Marker>
                </MapContainer>
              </Box>
            </Fade>
          )}

          {/* Submit butonu */}
          <Button color="primary" variant="contained" fullWidth type="submit" size="large" sx={{ mt: 3, py: 1.5, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)', '&:hover': { background: 'linear-gradient(45deg, #FE6B8B 60%, #FF8E53 100%)', transform: 'translateY(-2px)', }, transition: 'all 0.3s ease' }}>Etkinlik Oluştur</Button>
        </Box>

        {/* Snackbar bildirimi */}
        <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={() => setSnackbarOpen(false)} message="Etkinlik başarıyla oluşturuldu!" />
      </Paper>
    </LocalizationProvider>
  );
};

export default EventForm;
