
import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useSelector } from "react-redux";
import EventCard from "../components/Table/EventCard";
import useEventCall from "../hook/useEventCall";

const MyEvents = () => {
 const { getEventData } = useEventCall();
 const { currentUser } = useSelector((state) => state.auth);
 const { events} = useSelector((state) => state.event );

    useEffect(() => {
        getEventData("events", currentUser._id);
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            

            {/* Etkinlik Kartları */}
            <Grid container spacing={3} sx={{ mt: 3 }}>
                {events.length>0 ? events.map((event, index) => (
                    <Grid item xs={12} sm={6} md={4} key={event.id || index}>
                        <EventCard  
                            {...event} 
                            
                        />
                    </Grid>
                )): <p>Herhangi bir event olusturmadınız</p>}
            </Grid>
        </LocalizationProvider>
    );
};


export default MyEvents