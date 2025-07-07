import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Card, CardHeader, CardMedia, CardContent, CardActions, Collapse,
  Avatar, AvatarGroup, IconButton, Typography, Chip, Box
} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import { useNavigate } from 'react-router-dom';

// Leaflet imports
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { Container } from '@mui/system';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
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

export default function EventCard({ event }) {
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
    coordinates = null
  } = event;

  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const [isFavorited, setIsFavorited] = React.useState(false);

  const handleExpandClick = (e) => {
    e.stopPropagation(); // Kart tıklama olayını engelle
    setExpanded(!expanded);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    // İstersen burada prop callback ile favori durumu bildirilebilir
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
  const defaultLocation = { lat: 39.9334, lng: 32.8597 };
  const mapCenter = coordinates || defaultLocation;
  const eventImage = image || `https://source.unsplash.com/400x200/?event,${community || 'conference'}`;

  const handleCardClick = () => {
    navigate(`/details`, { state: {event}});
  };

  return (
    
    <Card
  onClick={handleCardClick}
  sx={{
    maxWidth: 800,
    mx: "auto", // Ortalar
    my: { xs: 4, md: 6 }, // Üstten ve alttan boşluk (responsive)
    px: { xs: 2, md: 4 }, // İçeride yanlardan boşluk (isteğe bağlı)
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
        height="100"
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
      </CardContent>

      <CardActions disableSpacing>
        <IconButton onClick={handleFavoriteClick} sx={{ color: isFavorited ? 'red' : 'inherit' }}>
          <FavoriteIcon />
        </IconButton>
        <IconButton onClick={handleShareClick}>
          <ShareIcon />
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

          <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
            📍 Konum Haritası
          </Typography>

          <Box sx={{ height: 250, borderRadius: 2, overflow: 'hidden', border: '2px solid #e0e0e0' }}>
            <MapContainer
              center={[mapCenter.lat, mapCenter.lng]}
              zoom={coordinates ? 15 : 6}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[mapCenter.lat, mapCenter.lng]}>
                <Popup>
                  <strong>{title}</strong><br />
                  {address}<br />
                  <em>{formatDate(date)}</em>
                </Popup>
              </Marker>
            </MapContainer>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
    
  );
}
