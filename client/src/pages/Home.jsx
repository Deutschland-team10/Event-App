import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useSelector } from "react-redux";
import EventCard from "../components/Table/EventCard";
import useEventCall from "../hook/useEventCall";
import SearhBar from "../components/SearhBar";

const Home = () => {
 const { getEventData } = useEventCall();
    const { events} = useSelector((state) => state.event );

    useEffect(() => {
        getEventData("events");
    }, []);

    return (
        
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SearhBar/>

            {/* Etkinlik Kartları */}
            <Grid container spacing={3} sx={{ mt: 3 }}>
                {events.map((event, index) => (
                    <Grid item xs={12} sm={6} md={4} key={event.id || index}>
                        <EventCard  
                            {...event} 
                            
                        />
                    </Grid>
                ))}
            </Grid>
        </LocalizationProvider>
    );
};


export default Home