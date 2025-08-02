import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Snackbar,
  InputAdornment,
  Paper,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import useEventCall from "../hook/useEventCall";
import { useSelector } from "react-redux";

const EventForm = ({ open, handleClose, initialState, setonClose }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { postEventFormData, updateEventFormData } = useEventCall();
  const { categories } = useSelector((state) => state.event);
  const [info, setInfo] = useState({
    ...initialState,
    date: initialState?.date ? new Date(initialState.date) : null,
  });
  const [selectedImage, setSelectedImage] = useState(null); // File veya string
  const [imagePreview, setImagePreview] = useState(initialState.image || "");
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (initialState) {
      setInfo({
        ...initialState,
        categoryId:
          typeof initialState.categoryId === "object"
            ? initialState.categoryId._id
            : initialState.categoryId || "",
        date: initialState?.date ? new Date(initialState.date) : null,
      });
      setImagePreview(initialState.image || "");
    }
  }, [initialState]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImageUrl("");
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUrlImage = () => {
    if (imageUrl.trim() !== "") {
      setSelectedImage(imageUrl); // URL string olarak setleniyor
      setImagePreview(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      if (info._id) formData.append("_id", info._id);
      formData.append("title", info.title || "");
      formData.append("description", info.description || "");
      formData.append("date", info.date || "");
      formData.append("time", info.time || "");
      formData.append("location", info.location || "");
      formData.append("categoryId", info.categoryId || "");

      // ✅ image alanı
      if (selectedImage instanceof File) {
        formData.append("image", selectedImage);
      } else if (
        typeof selectedImage === "string" &&
        selectedImage.trim() !== ""
      ) {
        formData.append("image", selectedImage);
      }

      // 🔑 Create / Update ayrımı
      if (info._id) {
        await updateEventFormData("events", formData); // update
      } else {
        await postEventFormData("events", formData); // create
      }

      // Temizle & kapat
      handleClose?.(); // handleClose varsa çağır
      setonClose?.(false); // setGoster varsa çağır
      setSelectedImage(null);
      setImagePreview(null);
      setImageUrl("");
    } catch (error) {
      console.error("Form submit error:", error);
      setSnackbarOpen(true);
    }
  };

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
    marginBottom: 2,
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper
        open={open}
        onClose={handleClose}
        elevation={2}
        sx={{
          p: 4,
          borderRadius: 2,
          background: "#ffffff",
          border: "1px solid #e8e8e8",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          {/* Hidden id */}
          <input type="hidden" name="_id" value={info._id || ""} />

          {/* Image Upload */}
          {!imagePreview && (
            <>
              <Button variant="outlined" component="label" sx={{ mt: 2 }}>
                Bild hochladen
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
              <TextField
                label="Oder Bild-URL"
                variant="outlined"
                fullWidth
                value={imageUrl}
                sx={{ mt: 2 }}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleUrlImage}
              >
                Bild aus URL hinzufügen
              </Button>
            </>
          )}

          {imagePreview && (
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <img
                src={imagePreview}
                alt="Event Bild Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: 200,
                  borderRadius: 8,
                  objectFit: "cover",
                }}
              />
              <Button
                onClick={() => {
                  setImagePreview(null);
                  setSelectedImage(null);
                  setImageUrl("");
                }}
                sx={{ mt: 1 }}
              >
                Bild entfernen
              </Button>
            </Box>
          )}

          {/* Title */}
          <TextField
            fullWidth
            id="title"
            name="title"
            label="Event Title"
            value={info.title}
            onChange={handleChange}
            margin="normal"
            sx={commonTextFieldStyles}
          />

          {/* Description */}
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Event Beschreibung"
            multiline
            rows={4}
            value={info.description}
            onChange={handleChange}
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

          {/* Date */}
          <DatePicker
            name="date"
            label="Event Datum"
            value={info.date}
            onChange={(value) => setInfo({ ...info, date: value })}
            slotProps={{
              textField: {
                fullWidth: true,
                sx: commonTextFieldStyles,
                margin: "normal",
              },
            }}
          />

          {/* Time */}
          <TextField
            fullWidth
            id="time"
            name="time"
            label="Event Zeit"
            type="time"
            value={info.time}
            onChange={handleChange}
            margin="normal"
            sx={commonTextFieldStyles}
            InputLabelProps={{ shrink: true }}
          />

          {/* Category */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="categoryId-label" sx={{ color: "#555" }}>
              Kategorie
            </InputLabel>
            <Select
              labelId="categoryId-label"
              id="categoryId"
              name="categoryId"
              value={info.categoryId}
              onChange={handleChange}
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
              {categories?.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Location */}
          <TextField
            fullWidth
            id="address"
            name="location"
            label="Location"
            value={info.location}
            onChange={handleChange}
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

          {/* Submit */}
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
            {info._id ? "Aktivität aktualisieren" : "Aktivität erstellen"}
          </Button>
        </Box>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message="Event wurde erfolgreich erstellt!"
        />
      </Paper>
    </LocalizationProvider>
  );
};

export default EventForm;
