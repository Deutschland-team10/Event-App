// components/EventList.jsx
import React from "react";
import {
  Grid,
  Alert,
  Typography,
  Container,
} from "@mui/material";
import EventCard from "../components/Table/EventCard";

const EventList = ({ events, showEventForm, setShowEventForm, onEventSubmit }) => {

  return (
    <Container maxWidth="xl">
      {/* Başlık */}
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom
        sx={{ 
          mb: 4, 
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#1976d2'
        }}
      >
        Etkinlikler
      </Typography>

      {/* Etkinlik Kartları */}
      {events.length === 0 ? (
        <Alert severity="info" sx={{ mb: 4, fontSize: "1.1rem" }}>
          Henüz etkinlik bulunmuyor. İlk etkinliğinizi oluşturun!
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <EventCard
                event={event}
                onFavorite={(fav) =>
                  console.log(`Favori durum değişti - Etkinlik ID: ${event.id}, Durum: ${fav}`)
                }
                onShare={() => console.log(`Paylaşım isteği - Etkinlik ID: ${event.id}`)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default EventList;