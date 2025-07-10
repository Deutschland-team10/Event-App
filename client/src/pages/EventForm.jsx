import React, { useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import AktivitätForm from "../components/AktivitätForm";
import GroupForm from "../components/GroupForm";

const EventForm = ({ onClose, onSubmit }) => {
  const [formType, setFormType] = useState("event"); // default olarak 'event' formu açık

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper
        elevation={8}
        sx={{
          p: 4,
          maxWidth: 700,
          mx: "auto",
          borderRadius: 3,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        {/* Form tipi seçimi */}
        <Box display="flex" justifyContent="center" gap={2} mb={3}>
          <Button
            variant={formType === "event" ? "contained" : "outlined"}
            color="secondary"
            onClick={() => setFormType("event")}
          >
            Etkinlik Oluştur
          </Button>
          <Button
            variant={formType === "group" ? "contained" : "outlined"}
            color="secondary"
            onClick={() => setFormType("group")}
          >
            Grup Oluştur
          </Button>
        </Box>

        {/* Seçilen formu göster */}
        {formType === "event" && (
          <AktivitätForm onClose={onClose} onSubmit={onSubmit} />
        )}
        {formType === "group" && (
          <GroupForm onClose={onClose} onSubmit={onSubmit} />
        )}
      </Paper>
    </LocalizationProvider>
  );
};

export default EventForm;
