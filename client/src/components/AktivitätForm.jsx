import React, { useState, useEffect } from "react";
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

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { useFormik } from "formik";
import * as yup from "yup";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import useEventCall from "../hook/useEventCall";

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

const AktivitätForm = ({ open, handleClose, initialState, onSubmit }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [position, setPosition] = useState([51.1657, 10.4515]); // Başlangıç pozisyonu
    const [showMap, setShowMap] = useState(false);
    const [coordinates, setCoordinates] = useState(null);
    const { postEventData, updateEventData } = useEventCall();

    const formik = useFormik({
        initialValues: {
            title: initialState?.title || "",
            description: initialState?.description || "",
            date: initialState?.date ? new Date(initialState.date) : null,
            community: initialState?.community || "",
            guestCount: initialState?.guestCount || "",
            address: initialState?.address || "",
        },
        enableReinitialize: true, // Bu çok önemli - initialState değiştiğinde formu yeniden initialize eder
        validationSchema,
        onSubmit: (values) => {
            setSnackbarOpen(true);

            // Koordinatları düzgün formatta gönder
            const eventData = {
                ...values,
                coordinates: coordinates ? {
                    lat: parseFloat(coordinates.lat),
                    lng: parseFloat(coordinates.lng)
                } : null,
                organizer: "Kullanıcı",
                avatarGroup: [],
                image: null,
                id: initialState?._id || initialState?.id || Date.now()
            };

            console.log('🚀 AktivitätForm - Form gönderilen veri:', eventData);

            // Eğer initialState varsa düzenleme, yoksa yeni kayıt
            if (initialState?._id || initialState?.id) {
                updateEventData("events", eventData);
            } else {
                postEventData("events", eventData);
            }

            // Dashboard'a da bilgi gönder
            if (onSubmit) {
                onSubmit(eventData);
            }

            // Form temizle ve kapat
            formik.resetForm();
            setShowMap(false);
            setCoordinates(null);

            setTimeout(() => {
                handleClose();
            }, 2000);
        },
    });

    // initialState değiştiğinde koordinatları güncelle
    useEffect(() => {
        if (initialState?.coordinates) {
            setCoordinates({
                lat: initialState.coordinates.lat,
                lng: initialState.coordinates.lng
            });
            setPosition([initialState.coordinates.lat, initialState.coordinates.lng]);
            setShowMap(true);
        }
    }, [initialState]);

    const handleShowMap = async () => {
        if (!formik.values.address.trim()) {
            alert("Lütfen haritada görmek için bir adres girin.");
            return;
        }

        try {
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                formik.values.address
            )}&limit=1`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);

                if (!isNaN(lat) && !isNaN(lon)) {
                    setPosition([lat, lon]);
                    setCoordinates({ lat: lat, lng: lon });
                    setShowMap(true);
                    console.log('Koordinatlar kaydedildi:', { lat, lng: lon });
                } else {
                    alert("Koordinatlar geçersiz. Lütfen adresi kontrol edin.");
                }
            } else {
                alert("Adres bulunamadı. Lütfen adresi kontrol edin.");
            }
        } catch (error) {
            console.error("Geocoding error:", error);
            alert("Adres arama sırasında bir hata oluştu.");
        }
    };

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
                {/* Kapat butonu */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <IconButton onClick={handleClose} sx={{ color: '#666' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: "#2c3e50", textAlign: "center" }}>
                    <EventIcon sx={{ mr: 1, color: "#1976d2" }} />
                    {initialState?._id || initialState?.id ? "Etkinlik Düzenle" : "Yeni Etkinlik"}
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
                        <InputLabel id="community-label" sx={{ color: "#555" }}>
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
                        variant="outlined"
                        onClick={handleShowMap}
                        startIcon={<MapIcon />}
                        sx={{
                            mt: 2,
                            mb: 2,
                            color: "#1976d2",
                            borderColor: "#1976d2",
                            backgroundColor: "#f5f5f5",
                            "&:hover": {
                                borderColor: "#1565c0",
                                backgroundColor: "#e3f2fd",
                            },
                        }}
                    >
                        Haritayı Göster
                    </Button>

                    {showMap && coordinates && (
                        <Fade in={showMap}>
                            <Box>
                                <Box
                                    sx={{
                                        height: 250,
                                        mt: 2,
                                        borderRadius: 2,
                                        overflow: "hidden",
                                        border: '2px solid #e0e0e0'
                                    }}
                                >
                                    <MapContainer
                                        center={position}
                                        zoom={13}
                                        scrollWheelZoom={false}
                                        style={{ height: "100%", width: "100%" }}
                                        key={`${position[0]}-${position[1]}`}
                                    >
                                        <ChangeView center={position} />
                                        <TileLayer
                                            attribution="&copy; OpenStreetMap contributors"
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={position}>
                                            <Popup>
                                                <strong>{formik.values.title || "Etkinlik"}</strong><br />
                                                {formik.values.address}<br />
                                                <small>Lat: {coordinates.lat.toFixed(6)}, Lng: {coordinates.lng.toFixed(6)}</small>
                                            </Popup>
                                        </Marker>
                                    </MapContainer>
                                </Box>
                                <Box sx={{ mt: 2, p: 2, bgcolor: "#f0f7ff", borderRadius: 1, border: "1px solid #e3f2fd" }}>
                                    <Typography variant="body2" sx={{ color: "#1976d2" }}>
                                        📍 Koordinatlar kaydedildi: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Fade>
                    )}

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
                        {initialState?._id || initialState?.id ? "Güncelle" : "Oluştur"}
                    </Button>
                </Box>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={() => setSnackbarOpen(false)}
                    message={
                        initialState?._id || initialState?.id
                            ? "Etkinlik başarıyla güncellendi!"
                            : "Etkinlik başarıyla oluşturuldu!"
                    }
                />
            </Paper>
        </LocalizationProvider>
    );
};

export default AktivitätForm;