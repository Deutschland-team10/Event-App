import React, { useEffect, useState } from "react";
import { Grid, Box, Paper } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import EventForm from "../components/EventForm";
import GroupForm from "../components/GroupForm";
import { useSelector } from "react-redux";
import EventCard from "../components/Table/EventCard";
import useEventCall from "../hook/useEventCall";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const { getEventData } = useEventCall();
  const { events, categories } = useSelector((state) => state.event);
  const [search, setSearch] = useState("");
  const [onClose, setonClose] = useState(false);

  const [formType, setFormType] = useState("event");
  const [open, setOpen] = useState(false);
  const [initialState, setInitialState] = useState({
    _id: null,
    title: "",
    description: "",
    date: null,
    categoryId: null,
    time: "12:30",
    image: "",
    location: "",
  });
  useEffect(() => {
    getEventData("events");
    getEventData("categories");
  }, []);
  const handleOpenForm = (type) => {
    setFormType(type);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setInitialState({
      _id: null,
      title: "",
      description: "",
      participants: [],
      date: null,
      categoryId: null,
      time: "",
      image: "",
      location: "",
    });
  };
  console.log("opne:", open);
  const normalize = (str) =>
    (str || "").toLocaleLowerCase("tr-TR").replace(/\s+/g, " ").trim();

  // 🔎 Genel arama: event içindeki tüm field'larda arama
  const filteredEvents =
    search.trim() === ""
      ? events
      : (events || []).filter((event) => {
          // kategori adını bul
          const categoryName =
            event?.categoryId?.name || // eğer obje ise
            categories.find((cat) => cat._id === event.categoryId)?.name || // eğer sadece id ise
            "";

          // aranabilir alanlar
          const searchableValues = [
            event.title || "",
            event.description || "",
            event.location || "",
            categoryName,
          ];

          // herhangi bir alan eşleşiyorsa true
          return searchableValues.some((value) =>
            normalize(String(value)).includes(normalize(search))
          );
        });
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {/* SearchBar sadece search state'ini yönetiyor */}
      {!onClose ? (
        <SearchBar search={search} setSearch={setSearch} />
      ) : (
        ""
      )}

      <Paper
        elevation={3}
        sx={{
          maxWidth: 650,
          mx: "auto",
        }}
      >
        {open && formType === "event" && (
          <EventForm
            open={open}
            setonClose={setonClose}
            handleClose={handleClose}
            initialState={initialState}
          />
        )}

        {open && formType === "group" && (
          <GroupForm
            open={open}
            handleClose={handleClose}
            initialState={initialState}
          />
        )}
      </Paper>

      {!onClose ? (
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {filteredEvents.length > 0
            ? filteredEvents.map((event, index) => (
                <Grid item xs={12} sm={6} md={4} key={event.id || index}>
                  <EventCard
                    event={event}
                    handleOpenForm={handleOpenForm}
                    setInitialState={setInitialState}
                    setonClose={setonClose}
                  />
                </Grid>
              ))
            : search && (
                <Box textAlign="center" mt={3} width="100%">
                  <p>"{search}" için sonuç bulunamadı.</p>
                </Box>
              )}
        </Grid>
      ) : (
        ""
      )}
    </LocalizationProvider>
  );
};

export default Home;
