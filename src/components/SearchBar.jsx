import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import useRegisterUser from "../hooks/useRegisterUser";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState(false);
  const [filterSelected, setFilterSelected] = useState("");

  const [addresses, setAddresses] = useState([]);

  const { getAddresses } = useRegisterUser();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangeFilterType = (newFilterType) => {
    if (filterType === newFilterType) return setFilterType("");
    setFilterType(newFilterType);
  };

  const handleChangeFilterSelected = (newSelected) => {
    if (filterSelected === newSelected) return setFilterSelected("");
    setFilterSelected(newSelected);
  };

  return (
    <Box
      display="flex"
      gap=".5rem"
      flexDirection="column"
      alignItems="flex-end"
      maxWidth="md"
      sx={{ ml: "auto", mr: "2rem" }}
    >
      <Box
        id="searchbar"
        display="flex"
        gap=".5rem"
        alignItems="center"
        maxWidth="md"
        sx={{ maxHeight: "2rem" }}
      >
        <TextField
          id="search"
          type="search"
          placeholder="Pesquise publicações"
          value={searchTerm}
          onChange={handleChange}
          sx={{
            width: 300,
            ".MuiInputBase-root": { height: "2rem", width: "300px" },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FilterListIcon
          sx={{ cursor: "pointer" }}
          onClick={() => handleChangeFilterType("basic")}
        />
        <CalendarMonthIcon
          sx={{ cursor: "pointer" }}
          onClick={() => handleChangeFilterType("date")}
        />
      </Box>
      {filterType === "basic" ? (
        <Box
          id="filterbar"
          sx={{ color: (theme) => theme.palette.primary.main }}
        >
          <Button
            sx={
              filterSelected === "highlights"
                ? {
                    border: "1px solid",
                    fontWeight: "bold",
                  }
                : {}
            }
            onClick={() => handleChangeFilterSelected("highlights")}
          >
            Destaques
          </Button>
          <Button
            sx={
              filterSelected === "bestOfTheWeek"
                ? {
                    border: "1px solid",
                    fontWeight: "bold",
                  }
                : {}
            }
            onClick={() => handleChangeFilterSelected("bestOfTheWeek")}
          >
            Melhores da semana
          </Button>
          <Button
            sx={
              filterSelected === "closeOnes"
                ? {
                    border: "1px solid",
                    fontWeight: "bold",
                  }
                : {}
            }
            onClick={() => handleChangeFilterSelected("closeOnes")}
          >
            Perto de si
          </Button>
        </Box>
      ) : null}
      {filterType === "date" ? (
        <Box
          id="date-filterbar"
          display="flex"
          gap=".5rem"
          sx={{ color: (theme) => theme.palette.primary.main }}
        >
          <TextField
            id="date-start"
            type="date"
            sx={{ height: "2rem", ".MuiInputBase-root": { height: "2rem" } }}
          />
          <TextField
            id="date-end"
            type="date"
            sx={{ height: "2rem", ".MuiInputBase-root": { height: "2rem" } }}
          />
          <Autocomplete
            id="address-select"
            options={addresses}
            autoHighlight
            sx={{ width: "10rem" }}
            renderInput={(params) => (
              <TextField
                {...params}
                // label={"Local"}
                variant="standard"
                placeholder="Local"
                name="residence"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
            onInputChange={async (event, value) => {
              // formData.residence = value;
              if (value.length >= 2 && value.length <= 4) {
                const res = await getAddresses(value);
                const newAddresses = [];
                // const newGeoIds = [];
                for (let key in res.dados) {
                  if (res.dados.hasOwnProperty(key)) {
                    const value = res.dados[key];
                    newAddresses.push(value.nome);
                    // newGeoIds.push({
                    // 	id: value.id,
                    // 	nome: value.nome,
                    // });
                  }
                }
                setAddresses(newAddresses);
                // setGeoIds(newGeoIds);
              }
            }}
            onChange={(event, value) => {
              console.log(value);
            }}
          />
        </Box>
      ) : null}
    </Box>
  );
};

export default SearchBar;
