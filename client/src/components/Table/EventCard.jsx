import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
    Card, CardHeader, CardMedia, CardContent, CardActions, Collapse,
    Avatar, AvatarGroup, IconButton, Typography, Chip, Box
} from '@mui/material';
import { red } from '@mui/material/colors';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import { useNavigate } from "react-router-dom";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import useEventCall from '../../hook/useEventCall';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const communityLabels = {
    technology: 'Teknoloji',
    art: 'Sanat',
    music: 'Müzik',
    sports: 'Spor',
    social: 'Sosyal Sorumluluk',
};

const communityColors = {
    technology: '#2196f3',
    art: '#e91e63',
    music: '#9c27b0',
    sports: '#ff9800',
    social: '#4caf50',
};

export default function EventCard({ _id, title, description, date, image, community, guestCount, address, coordinates, organizer, handleOpen, setInitialState, avatarGroup }) {

    const navigate = useNavigate();
    const [expanded, setExpanded] = React.useState(false);
    const [isFavorited, setIsFavorited] = useState(false);

    const handleExpandClick = (e) => {
        e.stopPropagation();
        setExpanded(!expanded);
    };

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        setIsFavorited(!isFavorited);
    };

    const handleShareClick = (e) => {
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title,
                text: description,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(`${title} - ${window.location.href}`);
        }
    };

    const formatDate = (dateValue) => {
        if (!dateValue) return "Tarih belirtilmedi";
        const dateObj = new Date(dateValue);
        if (isNaN(dateObj.getTime())) return "Geçersiz tarih";
        return dateObj.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getCommunityInfo = (val) => ({
        label: communityLabels[val] || val || "Belirtilmedi",
        color: communityColors[val] || '#757575'
    });

    const communityInfo = getCommunityInfo(community);

    // Koordinat kontrolü - daha basit ve etkili
    const hasValidCoordinates = coordinates &&
        coordinates.lat &&
        coordinates.lng &&
        !isNaN(Number(coordinates.lat)) &&
        !isNaN(Number(coordinates.lng));

    const mapCenter = hasValidCoordinates ?
        [Number(coordinates.lat), Number(coordinates.lng)] :
        [51.1657, 10.4515];

    // Debug için console log
    console.log('EventCard Debug:', {
        eventId: _id,
        title: title,
        coordinates: coordinates,
        hasValidCoordinates: hasValidCoordinates,
        mapCenter: mapCenter,
        coordType: typeof coordinates
    });

    const eventImage = image || `https://source.unsplash.com/400x200/?event,${community || 'conference'}`;

    const handleCardClick = () => {
        navigate(`/details`, { state: { event } });
    };
    const { getDeleteData } = useEventCall()

    return (
        <Card
            onClick={handleCardClick}
            sx={{
                maxWidth: 800,
                mx: "auto",
                my: { xs: 4, md: 6 },
                px: { xs: 2, md: 4 },
                borderRadius: 3,
                cursor: "pointer",
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
                }
            }}
        >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500], fontWeight: 'bold' }}>
                        {organizer ? organizer[0].toUpperCase() : 'O'}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="ayarlar" onClick={e => e.stopPropagation()}>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={<Typography variant="h6" fontWeight="bold">{title}</Typography>}
                subheader={`Organizatör: ${organizer}`}
            />

            <CardMedia
                component="img"
                height="200"
                image={eventImage}
                alt={`${title} görseli`}
                sx={{
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'scale(1.02)' }
                }}
            />

            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <EventIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2" color="text.secondary">{formatDate(date)}</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <LocationOnIcon sx={{ mr: 1, mt: 0.2, color: 'primary.main' }} />
                    <Typography variant="body2" color="text.secondary">{address}</Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.5 }}>
                    {description.length > 100 ? `${description.substring(0, 100)}...` : description}
                </Typography>

                <Chip
                    label={communityInfo.label}
                    size="small"
                    sx={{
                        backgroundColor: communityInfo.color,
                        color: 'white',
                        fontWeight: 'bold',
                        mb: 2
                    }}
                />

                {avatarGroup.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                            Katılanlar ({avatarGroup.length}):
                        </Typography>
                        <AvatarGroup max={6}>
                            {avatarGroup.map((p, i) => (
                                <Avatar key={i} alt={p.name || `Katılımcı ${i + 1}`} src={p.avatar}>
                                    {p.name ? p.name[0].toUpperCase() : i + 1}
                                </Avatar>
                            ))}
                        </AvatarGroup>
                    </Box>
                )}

                {/* Koordinat bilgisi gösterimi */}
                {hasValidCoordinates && (
                    <Box sx={{ mt: 2, p: 1, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                            📍 Koordinatlar: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                        </Typography>
                    </Box>
                )}
            </CardContent>

            <CardActions disableSpacing>
                <IconButton aria-label='add to favorites'
                    onClick={() => getDeleteData("event", _id)}>
                    <DeleteOutlineIcon
                        sx={{
                            "&:hover": { color: "red" }
                        }}
                    />
                </IconButton>
                <IconButton aria-label="share" onClick={() => { handleOpen(); setInitialState({ _id, title, description, date, community, guestCount, address }) }} >
                    <EditIcon
                        sx={{ "&:hover": { color: "red" } }} />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {description.length > 100 && (
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                                Detaylı Açıklama:
                            </Typography>
                            <Typography variant="body2" color="text.secondary">{description}</Typography>
                        </Box>
                    )}

                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                        📍 Konum Haritası
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                        {/* Debug bilgileri */}
                        <Box sx={{ mb: 1, p: 1, bgcolor: 'blue.50', borderRadius: 1 }}>
                            <Typography variant="caption">
                                Debug - Koordinatlar: {JSON.stringify(coordinates)} |
                                Geçerli: {hasValidCoordinates ? 'EVET' : 'HAYIR'} |
                                Merkez: [{mapCenter[0]}, {mapCenter[1]}]
                            </Typography>
                        </Box>

                        {hasValidCoordinates ? (
                            <Box sx={{
                                height: 350,
                                borderRadius: 2,
                                overflow: 'hidden',
                                border: '2px solid #e0e0e0',
                                position: 'relative',
                                bgcolor: 'grey.100'
                            }}>
                                {/* Koordinat bilgisi overlay */}
                                <Box sx={{
                                    position: 'absolute',
                                    top: 8,
                                    left: 8,
                                    backgroundColor: 'white',
                                    padding: '4px 8px',
                                    borderRadius: 1,
                                    zIndex: 1000,
                                    fontSize: '0.75rem',
                                    boxShadow: 1
                                }}>
                                    📍 {Number(coordinates.lat).toFixed(4)}, {Number(coordinates.lng).toFixed(4)}
                                </Box>

                                <MapContainer
                                    center={mapCenter}
                                    zoom={14}
                                    scrollWheelZoom={false}
                                    style={{ height: '100%', width: '100%' }}
                                    key={`eventmap-${id}-${Date.now()}`}
                                >
                                    <TileLayer
                                        attribution='&copy; OpenStreetMap contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={mapCenter}>
                                        <Popup>
                                            <div style={{ minWidth: '200px' }}>
                                                <strong>{title}</strong><br />
                                                <small>{address}</small><br />
                                                <em>{formatDate(date)}</em><br />
                                                <small>Lat: {Number(coordinates.lat).toFixed(6)}, Lng: {Number(coordinates.lng).toFixed(6)}</small>
                                            </div>
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </Box>
                        ) : (
                            <Box sx={{
                                height: 250,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(255,0,0,0.1)',
                                borderRadius: 2,
                                border: '2px dashed red'
                            }}>
                                <LocationOnIcon sx={{ fontSize: 48, color: 'red', mb: 1 }} />
                                <Typography variant="body2" color="error" sx={{ fontWeight: 'bold' }}>
                                    ❌ Harita Gösterilemiyor
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
                                    Koordinat bilgisi eksik veya geçersiz<br />
                                    Raw data: {JSON.stringify(coordinates)}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </CardContent>
            </Collapse>
        </Card>
    );
}