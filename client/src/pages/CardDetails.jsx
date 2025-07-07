import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box, Typography, Avatar, Chip, Divider, Paper
} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const communityLabels = {
  technology: "Teknoloji",
  art: "Sanat",
  music: "Müzik",
  sports: "Spor",
  social: "Sosyal Sorumluluk"
};

const communityColors = {
  technology: "#2196f3",
  art: "#e91e63",
  music: "#9c27b0",
  sports: "#ff9800",
  social: "#4caf50"
};

const formatDate = (dateValue) => {
  if (!dateValue) return "Tarih belirtilmedi";
  const d = new Date(dateValue);
  if (isNaN(d)) return "Geçersiz tarih";
  return d.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

const CardDetails = () => {
  
  const {state:{event}} = useLocation()

  if (!event) {
    return (
      <Typography variant="h5" color="error" sx={{ p: 4 }}>
        Etkinlik bilgisi mevcut değil. Lütfen etkinlik kartından erişiniz.
      </Typography>
    );
  }

  const lat = event.coordinates?.lat || 39.9334;  // Ankara merkez varsayılan
  const lng = event.coordinates?.lng || 32.8597;

  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          {event.title || "Başlık yok"}
        </Typography>

        <Box
          component="img"
          src={event.image || "https://source.unsplash.com/800x300/?event"}
          alt={event.title || "Etkinlik Görseli"}
          sx={{
            width: "100%",
            height: 300,
            objectFit: "cover",
            borderRadius: 2,
            mb: 3
          }}
        />

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
            {event.organizer?.[0]?.toUpperCase() || "O"}
          </Avatar>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Organizatör: {event.organizer || "Belirtilmedi"}
          </Typography>
        </Box>

        <Chip
          label={communityLabels[event.community] || event.community || "Belirtilmedi"}
          sx={{
            backgroundColor: communityColors[event.community] || "#757575",
            color: "white",
            fontWeight: "bold",
            mb: 2
          }}
        />

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          📅 Tarih:
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {formatDate(event.date)}
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          📍 Adres:
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {event.address || "Adres belirtilmedi"}
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          📝 Açıklama:
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {event.description || "Açıklama yok"}
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          🗺️ Harita:
        </Typography>
        <Box sx={{ height: 300, borderRadius: 2, overflow: 'hidden' }}>
          <MapContainer
            center={[lat, lng]}
            zoom={14}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            <Marker position={[lat, lng]}>
              <Popup>
                {event.title} <br />
                {event.address}
              </Popup>
            </Marker>
          </MapContainer>
        </Box>
      </Paper>
    </Box>
  );
};

export default CardDetails;
