import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Typography, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import EventForm from "../components/EventForm";
import GroupForm from "../components/GroupForm";
import { useSelector } from "react-redux";
import EventCard from "../components/Table/EventCard";
import useEventCall from "../hook/useEventCall";

const CreateEvent = () => {
    const { getEventData } = useEventCall();
    const { events} = useSelector((state) => state.event );
    const [open, setOpen] = useState(false);
    
    const [formType, setFormType] = useState("event");
    
    const [initialState, setInitialState] = useState({
        _id: null,
        title: "",
        description: "",
        participants: [],
        date: null,
        categoryId: "",
        time: "12:30",
        image: "",
        location: ""
    });

    // Form tipini değiştiren ve modal'ı açan fonksiyon
    const handleOpenForm = (type) => {
        setFormType(type);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setInitialState({ 
            _id: null,
            title: "", 
            description: "", 
            participants: [],
            date: null, 
            categoryId: "", 
            time: "", 
            image: "", 
            location: "" 
        });
    };

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
                {/* Başlık ve Butonlar */}
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
                        onClick={() => handleOpenForm("event")}
                        sx={{ mr: 2 }}
                    >
                        Etkinlik Oluştur
                    </Button>
                    <Button
                        variant={formType === "group" ? "contained" : "outlined"}
                        color="secondary"
                        onClick={() => handleOpenForm("group")}
                        sx={{ mr: 2 }}
                    >
                        Grup Oluştur
                    </Button>
                </Typography>

                {/* Sadece TEK form render et */}
                {open && formType === "event" && (
                    <EventForm 
                        open={open} handleClose={handleClose} 
                        initialState={initialState}
                        

                    />
                )}
                
                {open && formType === "group" && (
                    <GroupForm  
                        open={open} 
                        handleClose={handleClose}
                        initialState={initialState}
                    />
                )}
            </Paper>

           
        </LocalizationProvider>
    );
};

export default CreateEvent;