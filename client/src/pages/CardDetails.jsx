import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
  IconButton,
  Divider,
  Paper,
  Grid,
  Fade,
  Breadcrumbs,
  Link
} from '@mui/material';
import {
  ArrowBack,
  LocationOn,
  Event,
  People,
  Share,
  Favorite,
  FavoriteBorder,
  CalendarToday,
  AccessTime,
  Person
} from '@mui/icons-material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import useEventCall from '../hook/useEventCall';

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
  const location = useLocation();
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // EventCard'dan gelen event verisi

  //const event = location.state?.event;

  const { getEventDetails } = useEventCall();
   console.log(_id);
   console.log(event);
  useEffect(() => {
    // Sayfa yüklendiğinde loading'i kapat
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

    useEffect(() => {
          getEventDetails(_id);
      }, []);
 
  // Eğer event verisi yoksa ana sayfaya yönlendir
  if (!event) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="error" gutterBottom>
            Etkinlik bulunamadı
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Ana Sayfaya Dön
          </Button>
        </Paper>
      </Container>
    );
  }

  const {
    id,
    title = "Etkinlik Başlığı",
    description = "Etkinlik açıklaması mevcut değil",
    date,
    community,
    address = "Adres belirtilmedi",
    avatarGroup = [],
    image,
    organizer = "Organizatör",
    coordinates,
    guestCount = 0
  } = event;

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

  // Koordinat kontrolü
  const hasValidCoordinates = coordinates &&
    coordinates.lat &&
    coordinates.lng &&
    !isNaN(Number(coordinates.lat)) &&
    !isNaN(Number(coordinates.lng));

  const mapCenter = hasValidCoordinates ?
    [Number(coordinates.lat), Number(coordinates.lng)] :
    [51.1657, 10.4515];

  //const eventImage = image || `https://source.unsplash.com/800x400/?event,${community || 'conference'}`;

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${title} - ${window.location.href}`);
      // Burada bir toast bildirimi gösterebiliriz
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <Typography variant="h6" color="text.secondary">
            Yükleniyor...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in={!isLoading}>
        <Box>
          {/* Header Navigation */}
          <Box sx={{ mb: 3 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={handleBackClick}
              sx={{ mb: 2 }}
            >
              Geri Dön
            </Button>
          </Box>

          {/* Main Content */}
          <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 3 }}>
            {/* Hero Image */}
            <CardMedia
              component="img"
              height="400"
              image={image}
              alt={`${title} görseli`}
              sx={{ objectFit: 'cover' }}
            />

            <CardContent sx={{ p: 2 }}>
              {/* Title and Actions */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {title}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Person sx={{ color: 'primary.main' }} />
                    <Typography variant="subtitle1" color="text.secondary">
                      Organizatör: <strong>{organizer}</strong>
                    </Typography>
                  </Box>

                  <Chip
                    label={communityInfo.label}
                    sx={{
                      backgroundColor: communityInfo.color,
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.875rem'
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ py: 1.5, fontWeight: 'bold' }}
                  >
                    Etkinliğe Katıl
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleShareClick}
                    startIcon={<Share />}
                  >
                    Paylaş
                  </Button>
                </Box>
              </Box>


              <Divider sx={{ my: 3 }} />

              {/* Event Details Grid */}
              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  {/* Description */}
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    📝 Etkinlik Açıklaması
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, mb: 4 }}>
                    {description}
                  </Typography>

                  {/* Date and Time */}
                  <Paper sx={{ p: 1.5, mb: 1, bgcolor: 'grey.50' }}>
                    <Typography variant="h7" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                      🗓️ Tarih ve Saat
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarToday sx={{ color: 'primary.main' }} />
                      <Typography variant="body1">{formatDate(date)}</Typography>
                    </Box>
                  </Paper>

                  {/* Location */}
                  <Paper sx={{ p: 1.5, mb: 1, bgcolor: 'grey.50' }}>
                    <Typography variant="h7" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                      📍 Konum
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}>
                      <LocationOn sx={{ color: 'primary.main', mt: 0.5 }} />
                      <Typography variant="body1">{address}</Typography>
                    </Box>

                    {hasValidCoordinates && (
                      <Box sx={{ mt: 2, p: 2, bgcolor: 'blue.50', borderRadius: 1 }}>
                        <Typography variant="body2" color="primary">
                          📍 Koordinatlar: {Number(coordinates.lat).toFixed(6)}, {Number(coordinates.lng).toFixed(6)}
                        </Typography>
                      </Box>
                    )}
                  </Paper>

                  {/* Participants */}
                  <Paper sx={{ p: 1.5, mb: 1, bgcolor: 'grey.50' }}>
                    <Typography variant="h7" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                      👥 Katılımcılar
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <People sx={{ color: 'primary.main' }} />
                      <Typography variant="body1">
                        Toplam Katılımcı: <strong>{guestCount}</strong>
                      </Typography>
                    </Box>

                    {avatarGroup.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          Katılan Kişiler ({avatarGroup.length}):
                        </Typography>
                        <AvatarGroup max={8}>
                          {avatarGroup.map((participant, index) => (
                            <Avatar
                              key={index}
                              alt={participant.name || `Katılımcı ${index + 1}`}
                              src={participant.avatar}
                              sx={{ width: 40, height: 40 }}
                            >
                              {participant.name ? participant.name[0].toUpperCase() : index + 1}
                            </Avatar>
                          ))}
                        </AvatarGroup>
                      </Box>
                    )}
                  </Paper>
                </Grid>
              </Grid>

              {/* Map Section */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                  🗺️ Harita Görünümü
                </Typography>

                {hasValidCoordinates ? (
                  <Paper sx={{ p: 2, borderRadius: 2 }}>
                    <Box sx={{
                      height: 400,
                      borderRadius: 2,
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <MapContainer
                        center={mapCenter}
                        zoom={15}
                        scrollWheelZoom={true}
                        style={{ height: '100%', width: '100%' }}
                        key={`detailmap-${id}`}
                      >
                        <TileLayer
                          attribution='&copy; OpenStreetMap contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={mapCenter}>
                          <Popup maxWidth={300}>
                            <div style={{ minWidth: '250px' }}>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {title}
                              </Typography>
                              <Typography variant="body2" sx={{ mt: 1 }}>
                                {address}
                              </Typography>
                              <Typography variant="body2" sx={{ mt: 1 }}>
                                {formatDate(date)}
                              </Typography>
                              <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                                Koordinatlar: {Number(coordinates.lat).toFixed(6)}, {Number(coordinates.lng).toFixed(6)}
                              </Typography>
                            </div>
                          </Popup>
                        </Marker>
                      </MapContainer>
                    </Box>
                  </Paper>
                ) : (
                  <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'error.50' }}>
                    <LocationOn sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
                    <Typography variant="h6" color="error" gutterBottom>
                      Harita Gösterilemiyor
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Bu etkinlik için geçerli koordinat bilgisi bulunmuyor.
                    </Typography>
                  </Paper>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Fade>
    </Container>
  );
}