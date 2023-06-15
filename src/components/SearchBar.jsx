import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
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

  const theme = useTheme();

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
    <Grid
      container
      spacing={1}
      alignItems="flex-start"
      direction="row"
      sx={{
        ml: "2rem",
        mr: "2rem",
        border: "1px solid rgba(0, 0, 0, 0.23)",
        borderRadius: ".5rem",
        marginTop: "1rem",
        width: "auto",
        height: "3rem",
      }}
    >
      <Grid
        xs={12}
        item
        id="searchbar"
        spacing={1}
        sx={{
          maxHeight: "3rem",
          width: "100%",
          paddingLeft: "0 !important",
          paddingTop: "0 !important",
        }}
      >
        <TextField
          id="search"
          type="search"
          placeholder="Pesquise publicações"
          value={searchTerm}
          onChange={handleChange}
          sx={{
            width: "100%",
            "&:focus": {
              borderColor: "red",
              opacity: 1,
            },
            ".MuiFormControl-root-MuiTextField-root-focused": {
              borderColor: "red",
              opacity: 1,
            },
            ".MuiInputBase-root": {
              height: "3rem",
              width: "100%",
              padding: "1.5rem",
              borderRadius: ".5rem",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      {/* <Grid item direction="row" xs={12} display="flex">
        <Grid xs={2} m={"0 .5rem"}>
          <Typography
            sx={{
              fontWeight: filterSelected === "highlights" ? "bold" : "normal",
              cursor: "pointer",
              backgroundColor:
                filterSelected === "highlights" ? "black" : "transparent",
              border:
                filterSelected === "highlights" ? "1px solid black" : "none",
              borderRadius: filterSelected === "highlights" ? "10rem" : "none",
              padding: filterSelected === "highlights" ? "0.25rem" : "0",
              color: filterSelected === "highlights" ? "white" : "black",
              textAlign: "center",
            }}
            onClick={() => handleChangeFilterSelected("highlights")}
          >
            Destaques
          </Typography>
        </Grid>
        <Grid xs={2}>
          <TextField
            id="date-start"
            type="date"
            sx={{
              height: "2rem",
              ".MuiInputBase-root": { height: "2rem", borderRadius: "10rem" },
            }}
          />
        </Grid>
        <Grid xs={2}>
          <TextField
            id="date-end"
            type="date"
            sx={{
              height: "2rem",
              ".MuiInputBase-root": { height: "2rem", borderRadius: "10rem" },
            }}
          />
        </Grid>
        <Grid xs={2}>
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
        </Grid>
      </Grid> */}
    </Grid>
  );
};

export default SearchBar;
