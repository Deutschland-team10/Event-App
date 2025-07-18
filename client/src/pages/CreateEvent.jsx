import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Typography, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import AktivitätForm from "../components/AktivitätForm";
import GroupForm from "../components/GroupForm";
import { useSelector } from "react-redux";
import EventCard from "../components/Table/EventCard";
import useEventCall from "../hook/useEventCall";

const CreateEvent = () => {
    const { getEventData } = useEventCall();
    // Lifting state up işlemi yapıldı.Modaldaki stateler firms sayfasına alındı
    const { events = [] } = useSelector((state) => state.event || {});
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setInitialState({ title: "", description: "", date: null, community: "", guestCount: "", address: "" });
    };
    const [initialState, setInitialState] = useState({
        title: "",
        description: "",
        date: null,
        community: "",
        guestCount: "",
        address: ""
    });
   const [formType, setFormType] = useState("event"); // default olarak 'event' formu açık

    useEffect(() => {
        getEventData("events");
    }, []);

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
                    <Button
                        variant={formType === "event" ? "contained" : "outlined"}
                        color="secondary"
                        onClick={handleOpen}
                    >
                        Etkinlik Oluştur
                    </Button>
                    <Button
                        variant={formType === "group" ? "contained" : "outlined"}
                        color="secondary"
                        onClick={handleOpen}
                    >
                        Grup Oluştur
                    </Button>
                </Typography>

                {/* Ana Form */}
                {formType === "event" && (
                    <AktivitätForm open={open} handleClose={handleClose} />
                )}
                {formType === "group" && (
                    <GroupForm open={open} handleClose={handleClose} />
                )}

                {open && (<AktivitätForm open={open}
                    handleClose={handleClose}
                    initialState={initialState}
                />
                )}
                {open && (<GroupForm open={open}
                    handleClose={handleClose}
                    initialState={initialState}
                />
                )}
            </Paper>
            {/* Etkinlik Kartları */}

            {/* <Grid container spacing={3}>
                {events.map((event,index) => (
                    <Grid item xs={12} sm={6} md={4} key={event.id}>

                        <EventCard  {...event}
                            handleOpen={handleOpen}
                            setInitialState={setInitialState} />
                    </Grid>
                ))}
            </Grid> */}
        </LocalizationProvider>
    );
};

export default CreateEvent;