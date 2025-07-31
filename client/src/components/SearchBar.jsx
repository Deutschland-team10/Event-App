import React from "react";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBar = ({ search, setSearch }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
      <TextField
        variant="outlined"
        placeholder="Suchen (Stadt, Titel, Category, Jahr, Beschreibung vb.)"
        sx={{ width: "100%", maxWidth: 600 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          endAdornment: search && (
            <InputAdornment position="end">
              <IconButton onClick={() => setSearch("")} edge="end">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;










