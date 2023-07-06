import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  FormGroup,
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
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import useRegisterUser from "../hooks/useRegisterUser";

const SearchBar = ({ onSearch, onLocalDateChange, onHighlightsClick }) => {
  const [filterType, setFilterType] = useState(false);
  const [filterSelected, setFilterSelected] = useState("");
  const [showLocalDate, setShowLocalDate] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [formValues, setFormValues] = useState({
    startDate: "",
    endDate: "",
    address: "",
  });

  const { getAddresses } = useRegisterUser();

  const theme = useTheme();

  const handleChange = (event) => {
    const search = event.target.value;
    if (search.length > 2 || search.length === 0) {
      onSearch(search);
    }
  };

  const handleChangeFilterType = (newFilterType) => {
    if (filterType === newFilterType) return setFilterType("");
    setFilterType(newFilterType);
  };

  const handleChangeFilterSelected = (newSelected) => {
    if (filterSelected === newSelected) {
      if (newSelected === "highlights") onHighlightsClick(false);
      return setFilterSelected("");
    }
    setFilterSelected(newSelected);
    if (newSelected === "highlights") onHighlightsClick(true);
  };

  const handleDateLocalChange = (name, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const onSubmitLocalDateForm = () => {
    if (formValues.startDate !== "") onLocalDateChange(formValues);
    setShowLocalDate(false);
  };

  return (
    <>
      <Grid
        container
        spacing={1}
        alignItems="flex-start"
        direction="row"
        mt="1rem"
        mx="2rem"
        sx={{
          borderRadius: ".25rem",
          width: "auto",
          height: "2.5rem",
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
            onChange={handleChange}
            sx={{
              width: "100%",
              ".MuiInputBase-root": {
                height: "2.5rem",
                width: "100%",
                borderRadius: ".25rem",
                border: "1px solid rgb(229, 231, 235)",
                paddingLeft: ".25rem",
                paddingRight: ".25rem",
              },
              ".MuiOutlinedInput-input": {
                padding: 0,
                paddingLeft: ".125rem",
              },
              "& input::placeholder": {
                fontSize: "1rem",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ fontSize: "1.5rem" }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Grid container xs={12} mt="1rem" mx="2rem">
        <Grid md={1.25} lg={1.125} xl={0.75}>
          <Button
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              fontWeight: filterSelected ? "bold" : "normal",
              border: filterSelected ? "2px solid" : "1px solid",
              "&:hover": {
                opacity: "0.8",
                cursor: "pointer",
              },
            }}
            onClick={() => handleChangeFilterSelected("highlights")}
          >
            Destaques
          </Button>
        </Grid>
        <Grid md={1.25} lg={1.125} xl={0.75}>
          <Button
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              fontWeight: "normal",
              border: "1px solid",
              height: "100%",
              "&:hover": {
                opacity: "0.8",
              },
            }}
            onClick={() => setShowLocalDate(!showLocalDate)}
          >
            <Typography fontSize="0.875rem">Filtrar</Typography>
            {showLocalDate ? (
              <ArrowDropUp
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  fontSize: "1.25rem",
                }}
              />
            ) : (
              <ArrowDropDown
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  fontSize: "1.25rem",
                  marginLeft: "auto",
                }}
              />
            )}
          </Button>
          {showLocalDate ? (
            <Box value={"dateandtime"}>
              <form>
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{
                    width: "23rem",
                    padding: "1rem",
                    borderRadius: ".25rem",
                    boxShadow: "1px 1px 1px 1px #00000045",
                    marginTop: "4px",
                    backgroundColor: "white",
                    position: "absolute",
                    zIndex: 99,
                  }}
                >
                  <Box
                    id="filter-group"
                    display="flex"
                    flexDirection="column"
                    gap="1rem"
                    m=".5rem"
                  >
                    <Box
                      display="flex"
                      gap="1rem"
                      justifyContent="space-between"
                    >
                      <TextField
                        id="date-start"
                        name="startDate"
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
                        onChange={(e) =>
                          handleDateLocalChange(e.target.name, e.target.value)
                        }
                      />
                      <TextField
                        id="date-end"
                        name="endDate"
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
                        onChange={(e) =>
                          handleDateLocalChange(e.target.name, e.target.value)
                        }
                      />
                    </Box>
                    <Box>
                      <Autocomplete
                        id="address-select"
                        name="address"
                        options={addresses}
                        autoHighlight
                        sx={{
                          width: "100%",
                          ".MuiInputBase-root": { maxHeight: "2rem" },
                        }}
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
                        onChange={(e) =>
                          handleDateLocalChange("address", e.target.textContent)
                        }
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
                      onClick={() => setShowLocalDate(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ textTransform: "capitalize" }}
                      onClick={onSubmitLocalDateForm}
                    >
                      Aplicar
                    </Button>
                  </Box>
                </Box>
              </form>
            </Box>
          ) : (
            <div></div>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default SearchBar;
