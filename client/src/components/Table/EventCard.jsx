import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  AvatarGroup,
  IconButton,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import { red } from "@mui/material/colors";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useEventCall from "../../hook/useEventCall";
import { useSelector } from "react-redux";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const communityLabels = {
  technology: "Teknoloji",
  art: "Sanat",
  music: "Müzik",
  sports: "Spor",
  social: "Sosyal Sorumluluk",
};

const communityColors = {
  technology: "#2196f3",
  art: "#e91e63",
  music: "#9c27b0",
  sports: "#ff9800",
  social: "#4caf50",
};

export default function EventCard({
  _id,
  title,
  description,
  participants,
  date,
  location,
  creater,
  categoryId,
  image,
  handleOpenForm,
  avatarGroup,
  setInitialState,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.auth);
  const { getDeleteData } = useEventCall();

  const handleExpandClick = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const handleCardClick = () => {
    navigate("/home/details/" + _id);
    console.log("Card clicked:", event);
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "Tarih belirtilmedi";
    const dateObj = new Date(dateValue);
    if (isNaN(dateObj.getTime())) return "Geçersiz tarih";
    return dateObj.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCommunityInfo = (val) => ({
    label: communityLabels[val] || val || "Belirtilmedi",
    color: communityColors[val] || "#757575",
  });

  const communityInfo = getCommunityInfo(categoryId);
  // const eventImage = `https://source.unsplash.com/400x200/?event,${categoryId || 'conference'}`;

  return (
    <Card
      onDoubleClick={handleCardClick}
      sx={{
        maxwidth: 345,
        height: 600,
        mx: "auto",
        my: { xs: 4, md: 4 },
        px: { xs: 2, md: 4 },
        borderRadius: 3,
        position: "relative",
        cursor: "pointer",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={creater.image || ""}
            alt={`${creater.firstName} ${creater.lastName}`}
            sx={{ bgcolor: red[500], fontWeight: "bold" }}
          />
        }
        action={
          <IconButton aria-label="ayarlar" onClick={(e) => e.stopPropagation()}>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
        }
        subheader={`Organizatör: ${creater.firstName}`}
      />

      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={`${title} görseli`}
        sx={{
          objectFit: "cover",
          transition: "transform 0.3s ease",
          "&:hover": { transform: "scale(1.02)" },
        }}
      />

      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
          <EventIcon sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="body2" color="text.secondary">
            {formatDate(date)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
          <LocationOnIcon sx={{ mr: 1, mt: 0.2, color: "primary.main" }} />
          <Typography variant="body2" color="text.secondary">
            {location}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, lineHeight: 1.5 }}
        >
          {description.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
        </Typography>

        {categoryId}

        {Array.isArray(avatarGroup) && avatarGroup.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{ mb: 1, color: "text.secondary" }}
            >
              Katılanlar ({avatarGroup.length}):
            </Typography>
            <AvatarGroup max={6}>
              {avatarGroup.map((p, i) => (
                <Avatar
                  key={i}
                  alt={p.name || `Katılımcı ${i + 1}`}
                  src={p.avatar}
                >
                  {p.name ? p.name[0].toUpperCase() : i + 1}
                </Avatar>
              ))}
            </AvatarGroup>
          </Box>
        )}

        {/* Koordinat bilgisi gösterimi */}
        {/* {hasValidCoordinates && (
          <Box sx={{ mt: 2, p: 1, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary">
              📍 Koordinatlar: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
            </Typography>
          </Box> 
        )}*/}
      </CardContent>

      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 1,
          position: "absolute",
          bottom: 0,
        }}
      >
        <IconButton
          aria-label="add to favorites"
          
        >
          <DeleteOutlineIcon
            sx={{
              "&:hover": { color: "red" },
            }}
            onClick={() => {  
              
            getDeleteData("events",_id);}}
          />
        </IconButton>
        <IconButton
          aria-label="edit"
          onClick={(e) => {
            e.stopPropagation();
            if (handleOpenForm && setInitialState) {
              console.log("merhaba")
              handleOpenForm("event");
              setInitialState({
                _id,
                title,
                description,
                date,
                location,
                image,
                categoryId,
              });
            }
          }}
        >
          <EditIcon sx={{ "&:hover": { color: "red" } }} />
        </IconButton>
        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {description.length > 100 && (
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{ mb: 1, fontWeight: "bold" }}
              >
                Detaylı Açıklama:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}
