import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Card, CardHeader, CardMedia, CardContent, CardActions, Collapse,
  Avatar, AvatarGroup, IconButton, Typography
} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';

import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

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

// 🔥 DINAMIK EventCard
export default function EventCard({
  title,
  description,
  date,
  community,
  guestCount,
  address,
  avatarGroup = [],
  image = "https://source.unsplash.com/featured/?event",
  organizer = "Organizatör"
}) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const location = {
    lat: 50.7374,
    lng: 7.0982,
    address: address || "Adres belirtilmedi"
  };

  return (
    <Card sx={{ maxWidth: 400, m: 2 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>{organizer[0]}</Avatar>}
        action={<IconButton><MoreVertIcon /></IconButton>}
        title={`Etkinlik Başlığı: ${title}`}
        subheader={`Organizatör: ${organizer}`}
      />
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt="Etkinlik görseli"
      />
      <CardContent>
        <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
          <EventIcon sx={{ mr: 1 }} />
          {new Date(date).toLocaleDateString('tr-TR')} - Katılımcı: {guestCount}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <LocationOnIcon sx={{ mr: 1 }} />
          {address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Açıklama: {description}
        </Typography>
        <Typography variant="subtitle2" sx={{ mt: 2 }}>
          Topluluk: {community}
        </Typography>

        {avatarGroup.length > 0 && (
          <>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Katılanlar:
            </Typography>
            <AvatarGroup max={5}>
              {avatarGroup.map((person, index) => (
                <Avatar key={index} alt={person.name} src={person.avatar} />
              ))}
            </AvatarGroup>
          </>
        )}
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="favori ekle"><FavoriteIcon /></IconButton>
        <IconButton aria-label="paylaş"><ShareIcon /></IconButton>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded}>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Harita:</Typography>
          <MapContainer center={[location.lat, location.lng]} zoom={13} style={{ height: '200px', width: '100%', borderRadius: '10px' }}>
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[location.lat, location.lng]}>
              <Popup>{location.address}</Popup>
            </Marker>
          </MapContainer>
        </CardContent>
      </Collapse>
    </Card>
  );
}
