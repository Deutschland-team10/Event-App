import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useSelector } from "react-redux";
import EventCard from "../components/Table/EventCard";
import useEventCall from "../hook/useEventCall";
import SearhBar from "../components/SearhBar";
import EventForm from "../components/EventForm";

const Home = () => {
 const { getEventData } = useEventCall();
    const { events} = useSelector((state) => state.event );
    const [formType, setFormType] = useState("event");
     const [open, setOpen] = React.useState(false);
    const [initialState, setInitialState] = useState({
            _id: null,
            title: "",
            description: "",
            date: null,
            categoryId: null,
            time: "12:30",
            image: "",
            location: ""
        });

    useEffect(() => {
        getEventData("events");
    }, []);
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
            date: null, 
            categoryId: null, 
            time: "", 
            image: "", 
            location: "" 
        });
    };

    return (
        
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SearhBar/>

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

            {/* Etkinlik Kartları */}
            <Grid container spacing={3} sx={{ mt: 3 }}>
                {events.map((event, index) => (
                    <Grid item xs={12} sm={6} md={4} key={event.id || index}>
                        <EventCard  
                            {...event} 
                            handleOpenForm={handleOpenForm}
                            setInitialState={setInitialState}
                        />
                    </Grid>
                ))}
            </Grid>
        </LocalizationProvider>
    );
};


export default Home