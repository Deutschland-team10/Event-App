import React, { useEffect, useState } from 'react'
import useEventCall from "../hook/useEventCall";
import EventCard from './Table/EventCard';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, TextField } from '@mui/material';

const SearhBar = () => {
    const { getEventData, events } = useEventCall(); // events state'ini de alın
    const [arama, setArama] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        getEventData("events");
    }, []);

    // Filtrelenmiş eventları hesapla
    const filteredEvents = events?.filter((event) => 
        event.location.toLowerCase().includes(arama.toLowerCase())
    ) || [];

    return (
        <div>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={2}
            >
                <TextField
                    variant="outlined"
                    placeholder="Şehir adı ile arama yapın..."
                    className="w-50 m-auto"
                    value={arama}
                    onChange={(e) => setArama(e.target.value)}
                />
            </Box>
            
            <Grid container spacing={3} sx={{ mt: 3 }}>
                {filteredEvents.map((event) => (
                    <Grid item xs={12} sm={6} md={4} key={event.id || event.name}>
                        <EventCard {...event} />
                    </Grid>
                ))}
            </Grid>
            
            {/* Eğer arama yapıldıysa ve sonuç yoksa */}
            {arama && filteredEvents.length === 0 && (
                <Box textAlign="center" mt={3}>
                    <p>"{arama}" şehri için etkinlik bulunamadı.</p>
                </Box>
            )}
        </div>
    )
}

export default SearhBar