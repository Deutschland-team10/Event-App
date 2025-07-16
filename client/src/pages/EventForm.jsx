import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Typography, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useSelector } from "react-redux";
import EventCard from "../components/Table/EventCard";
import useEventCall from "../hook/useEventCall";

const EventForm = ({ events: dashboardEvents, setEvents, setOpen, setInitialState }) => {
    const { getEventData } = useEventCall();
    
    // Redux'tan gelen events varsa kullan, yoksa Dashboard'dan gelen events'i kullan
    const { events: reduxEvents = [] } = useSelector((state) => state.event || {});
    const events = reduxEvents.length > 0 ? reduxEvents : (dashboardEvents || []);
    
    const [formType, setFormType] = useState("event"); // default olarak 'event' formu açık

    useEffect(() => {
        getEventData("events");
    }, []);

    const handleEventCreate = () => {
        setFormType("event");
        setOpen(true);
    };

    const handleGroupCreate = () => {
        setFormType("group");
        setOpen(true);
    };

    const handleEditEvent = (eventData) => {
        setInitialState(eventData);
        setOpen(true);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    maxWidth: 650,
                    mx: "auto",
                    borderRadius: 2,
                    background: "#ffffff",
                    border: "1px solid #e0e0e0",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}
            >
                {/* Başlık */}
                <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                        mb: 3,
                        fontWeight: 600,
                        color: "#2c3e50",
                        textAlign: "center"
                    }}
                >
                    Etkinlik Yönetimi
                </Typography>

                {/* Butonlar */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleEventCreate}
                    >
                        Etkinlik Oluştur
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleGroupCreate}
                    >
                        Grup Oluştur
                    </Button>
                </Box>
            </Paper>

            {/* Etkinlik Kartları */}
            <Grid container spacing={3} sx={{ mt: 2 }}>
                {events.map((event, index) => (
                    <Grid item xs={12} sm={6} md={4} key={event.id || index}>
                        <EventCard 
                            {...event}
                            handleOpen={() => setOpen(true)} 
                            setInitialState={setInitialState} 
                        />
                    </Grid>
                ))}
            </Grid>
        </LocalizationProvider>
    );
};

export default EventForm;