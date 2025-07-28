import React, { useEffect, useState } from 'react'
import useEventCall from "../hook/useEventCall";
import EventCard from './Table/EventCard';
import { Form, useNavigate } from 'react-router-dom';
import { Box, Grid, TextField } from '@mui/material';


const SearhBar = () => {

    const { getEventData } = useEventCall();

    const [arama, setArama] = useState("")
    const navigate = useNavigate()
    const [data, setData] = useState([]);

    useEffect(() => {
        getEventData("events");
    }, []);

    return (
        <div>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={2} // yukarıdan boşluk
            >
                <TextField
                    variant="outlined"
                    placeholder="Search..."
                    className="w-50 m-auto"
                    onChange={(e) => setArama(e.target.value)}

                />
                </Box>
                <Grid container spacing={3} sx={{ mt: 3 }}>
                    {data.filter((e) => e.location.toLowerCase()
                        .includes(arama.toLowerCase())).map((events) => (
                            <Grid item xs={12} sm={6} md={4} key={location.name}>
                                <EventCard  {...events} />
                            </Grid>
                        ))}
                </Grid>
            
        </div>
    )
}

export default SearhBar