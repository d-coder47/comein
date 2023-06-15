import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
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
        margin: "1rem 2rem",
        border: "1px solid rgba(0, 0, 0, 0.23)",
        borderRadius: ".5rem",
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
      <Grid item direction="row" xs={12} display="flex">
        <Grid xs={2} m={"0 .5rem"}>
          <Box
            sx={{
              cursor: "pointer",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                textTransform: "capitalize",
                fontWeight: filterSelected ? "bold" : "normal",
                border: filterSelected ? "2px solid" : "1px solid",
                "&:hover": {
                  opacity: "0.8",
                },
              }}
              onClick={() => handleChangeFilterSelected("highlights")}
            >
              Destaques
            </Button>
          </Box>
        </Grid>
        <Grid xs={2}>
          <TextField
            id="outlined-select-currency"
            select
            size="small"
            value="location"
          >
            <MenuItem
              style={{ display: "none" }}
              value={"location"}
              sx={{
                ".Mui-selected": {
                  display: "none",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <LocationOnIcon
                  sx={{
                    // color: (theme) => theme.palette.primary.main,
                    color: "black",
                    fontSize: "1.25rem",
                  }}
                />
                Location
              </Box>
            </MenuItem>
            <MenuItem value={"test"}>
              <Box display="flex" flexDirection="column">
                <Box
                  id="filter-group"
                  display="flex"
                  flexDirection="column"
                  gap="1rem"
                  m=".5rem"
                >
                  <Box display="flex" gap="1rem">
                    <TextField
                      id="date-start"
                      type="date"
                      label="Data Início"
                      sx={{
                        height: "2rem",
                        ".MuiInputBase-root": {
                          height: "2rem",
                          borderRadius: ".25rem",
                        },
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      id="date-end"
                      type="date"
                      label="Data Fim"
                      sx={{
                        height: "2rem",
                        ".MuiInputBase-root": {
                          height: "2rem",
                          borderRadius: ".25rem",
                        },
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>
                  <Box>
                    <Autocomplete
                      id="address-select"
                      options={addresses}
                      autoHighlight
                      sx={{ width: "100%" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          size="small"
                          placeholder="Local"
                          name="residence"
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            ...params.inputProps,
                          }}
                        />
                      )}
                      onInputChange={async (event, value) => {
                        if (value.length >= 2 && value.length <= 4) {
                          const res = await getAddresses(value);
                          const newAddresses = [];
                          for (let key in res.dados) {
                            if (res.dados.hasOwnProperty(key)) {
                              const value = res.dados[key];
                              newAddresses.push(value.nome);
                            }
                          }
                          setAddresses(newAddresses);
                        }
                      }}
                      onChange={(event, value) => {
                        console.log(value);
                      }}
                    />
                  </Box>
                </Box>
                <Box id="button-group" display="flex" gap="1rem" mt="1rem">
                  <Button
                    size="small"
                    sx={{
                      textTransform: "capitalize",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ textTransform: "capitalize" }}
                  >
                    Aplicar
                  </Button>
                </Box>
              </Box>
            </MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
