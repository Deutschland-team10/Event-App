import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Chip,
    Avatar,
    AvatarGroup,
    Button,
    Divider,
    CircularProgress
} from '@mui/material';
import {
    LocationOn,
    People,
    Share,
    CalendarToday,
    Person,
    PersonAdd,
    PersonRemove
} from '@mui/icons-material';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import useEventCall from '../hook/useEventCall';
import { useDispatch, useSelector } from 'react-redux';

// Leaflet icon düzeltmesi
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

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

export default function CardDetails() {
    //const {id:eventId}= useParams();
    const { _id } = useParams();
    const dispatch = useDispatch();
    const { getEventData, joinEvent } = useEventCall();
    const { events, event } = useSelector((state) => state.event);
    const { currentUser, token } = useSelector((state) => state.auth);
    const [isJoining, setIsJoining] = useState(false);

    const currentUserId = currentUser?._id

    const isUserParticipant = event?.participants?.some(participant => { return participant._id === currentUserId; })

    // join handler
    const handleJoin = () => {
        setIsJoining(true);
        joinEvent(_id)
        setIsJoining(false);
    };

    const handleShareClick = async () => {
        const shareData = {
            title: event?.title || 'Etkinlik',
            text: `${event?.title} - ${event?.description?.substring(0, 100)}...`,
            url: window.location.href,
        };

        try {
            // Modern tarayıcılarda Web Share API
            if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                await navigator.share(shareData);
            }
            // Clipboard API (ikinci seçenek)
            else if (navigator.clipboard) {
                const shareText = `${event?.title}\n\n${event?.description}\n\nKonum: ${event?.location}\nTarih: ${event?.date ? new Date(event.date).toLocaleDateString('tr-TR') : '—'}\n\nDetaylar: ${window.location.href}`;

                await navigator.clipboard.writeText(shareText);
                alert('Event wurden auf die Pinnwand kopiert!');
            }
            // Fallback - eski tarayıcılar için
            else {
                const shareText = `${event?.title}\n\n${event?.description}\n\nKonum: ${event?.location}\nTarih: ${event?.date ? new Date(event.date).toLocaleDateString('tr-TR') : '—'}\n\nDetaylar: ${window.location.href}`;

                try {
                    document.execCommand('copy');
                    alert('Event wurden auf die Pinnwand kopiert!');
                } catch (err) {
                    console.error('Kopyalama başarısız:', err);
                    alert('Das Teilen ist fehlgeschlagen.');
                }

                document.body.removeChild(textArea);
            }
        } catch (error) {
            console.error('Fehler beim Teilen:', error);

            // Hata durumunda manual paylaşım seçenekleri göster
            const shareUrl = window.location.href;
            const shareText = encodeURIComponent(`${event?.title} - ${event?.description}`);

            const shareOptions = [
                `WhatsApp: https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`,
                `Telegram: https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${shareText}`,
                `Twitter: https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`,
                `Facebook: https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
            ];

        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
                {/* Event Image */}
                <CardMedia
                    component="img"
                    height="300"
                    image={event?.image || "https://via.placeholder.com/400x200"}
                //alt={event?.title}
                />
                {/* Event Content */}
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography gutterBottom variant="h5" component="div">
                            {event?.title}
                        </Typography>

                        {/* Join Button */}
                        {/* Dinamik Join/Leave Button */}
                        <Button
                            variant={isUserParticipant ? "outlined" : "contained"}
                            color={isUserParticipant ? "error" : "primary"}
                            size="large"
                            onClick={() => handleJoin(event._id)}
                            disabled={isJoining}
                            startIcon={
                                isJoining ? (
                                    <CircularProgress size={20} color="inherit" />
                                ) : isUserParticipant ? (
                                    <PersonRemove />
                                ) : (
                                    <PersonAdd />
                                )
                            }
                            sx={{
                                py: 1.5,
                                px: 3,
                                fontWeight: 'bold',
                                minWidth: 200,
                                cursor: 'pointer',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                },
                                '&:disabled': {
                                    opacity: 0.7,
                                }
                            }}
                        >
                            {isJoining
                                ? 'Die Bearbeitung wird durchgeführt...'
                                : isUserParticipant
                                    ? 'Aktivität Verlassen'
                                    : 'Aktivität Teilnehmen'
                            }
                        </Button>

                        {/* Share Button */}
                        <Button
                            variant="outlined"
                            onClick={handleShareClick}
                            startIcon={<Share />}
                            sx={{
                                py: 1.5,
                                px: 2,
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    transform: 'scale(1.02)',
                                },
                                transition: 'all 0.2s ease-in-out'
                            }}
                        >
                            Teilen
                        </Button>
                    </Box>


                    <Chip
                        label={event?.categoryId.name}
                        sx={{
                            backgroundColor: communityColors[event?.community] || '#2196f3',
                            color: 'white',
                            mb: 2
                        }}
                    />

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Person sx={{ color: 'primary.main' }} />
                        <Typography variant="subtitle1" color="text.secondary">
                            Organizator: <strong>
                                {typeof event?.creater === 'object'
                                    ? (event?.creater?.username || event?.creater?.email || 'Not specified')
                                    : (event?.creater || 'Not specified')}
                            </strong>
                        </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary" mb={2}>
                        {event?.description}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}>
                        <LocationOn sx={{ color: 'primary.main', mt: 0.5 }} />
                        <Typography variant="body1">{event?.location}</Typography>
                    </Box>

                    {/* Date and Info */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <CalendarToday sx={{ color: 'primary.main' }} />
                        <Typography variant="body1" color="text.secondary">
                            Datum: {event?.date ? new Date(event.date).toLocaleDateString('tr-TR') : '—'}
                            {event?.time && ` - ${event.time}`}
                        </Typography>
                    </Box>

                    {/* Participants */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
                        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <People sx={{ color: 'primary.main' }} />
                            Teilnehmer ({event?.participants.length})
                        </Typography>

                        <AvatarGroup max={4}>
                            {event?.participants?.map((user) => (
                                <Avatar key={user._id} alt={user.username} src={user.image} />
                            ))}
                        </AvatarGroup>
                    </Box>
                </CardContent>

                <Divider />
            </Card>
        </Container>
    );
};
