import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useSelector } from "react-redux";
import EventCard from "../components/Table/EventCard";
import useEventCall from "../hook/useEventCall";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const { getEventData } = useEventCall();
  const { events, categories } = useSelector((state) => state.event);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getEventData("events");
    getEventData("categories");
  }, []);

  const normalize = (str) =>
    (str || "").toLocaleLowerCase("tr-TR").replace(/\s+/g, " ").trim();

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
      {/* Arama barı */}
      <SearchBar search={search} setSearch={setSearch} />

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={event._id || index}>
              <EventCard {...event} />
            </Grid>
          ))
        ) : (
          search && (
            <Box textAlign="center" mt={3} width="100%">
              <p>"{search}" için sonuç bulunamadı.</p>
            </Box>
          )
        )}
      </Grid>
    </LocalizationProvider>
  );
};

export default Home;

