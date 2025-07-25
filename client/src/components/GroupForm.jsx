import React, { useEffect, useState } from "react";
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

import { useFormik } from "formik";
import * as yup from "yup";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import useEventCall from "../hook/useEventCall";
import { useSelector } from "react-redux";

const EventForm = ({ open, handleClose, initialState }) => {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { postEventData, getEventData, updateEventData } = useEventCall();
  const { categories } = useSelector((state) => state.event);
  const [info, setInfo] = useState(initialState)
  console.log(categories);

   useEffect(() => {
    getEventData("categories");
  }, [])

  const handleChange = (e) => {
    
    setInfo({ ...info, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    
    // Database info bilgisini gönderme işlemi 
    if (info._id) {
      updateEventData("events", info);
    } else {
      console.log("EventForm - Gönderilen veri:", info);
       postEventData("events", info);
    }
    getEventData("events");
    // setSnackbarOpen(true);
    // setShouldRefetch(prev => !prev); // 📢 Sinyal gönder
     handleClose()
    
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
    marginBottom: 2
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
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}
      >
             {/* Image Upload */}
        <Button variant="outlined" component="label" sx={{ mt: 2 }}>
          Görsel Yükle
          <input
            type="file"
            accept="image/*"
            hidden
            //onChange={handleImageChange}
          />
        </Button>

        {/* //{previewUrl &&  (*/}
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <img
              //src={previewUrl}
              alt="Etkinlik görseli"
              style={{
                maxWidth: "100%",
                maxHeight: 200,
                borderRadius: 8,
                objectFit: "cover",
              }}
            />
          </Box>
        

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="title"
            name="title"
            label="Etkinlik Başlığı"
            value={info.title}
            onChange={handleChange}

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

          <DatePicker name="date"
            label="Etkinlik Tarihi"
            value={info.date}
            onChange={(value) => setInfo({ ...info, "date": value })}
            renderInput={(params) => (
              <TextField
                fullWidth
                {...params}
                margin="normal"

                sx={commonTextFieldStyles}
              />
            )}
          />


          <FormControl
            fullWidth
            margin="normal"

          >
            <InputLabel
              id="categoryId-label"
              sx={{ color: "#555" }}
            >
              Topluluk
            </InputLabel>
            <Select
              labelId="categoryId-label"
              id="categoryId"
              name="categoryId"
              value={info.categoryId}
              label="Topluluk"
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
              {categories.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            id="address"
            name="location"
            label="location"
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
           {info._id && "Submit"}
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

export default EventForm;