import React, { useRef } from "react";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined";

import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { detectOutsideClick } from "../utils/detectOutsideClick";

const SearchBar = ({ onSearch, onLocalDateChange, onHighlightsClick }) => {
  const [filterSelected, setFilterSelected] = useState("");
  const [showLocalDate, setShowLocalDate] = useState(false);
  const [formValues, setFormValues] = useState({
    startDate: "",
    endDate: "",
    address: "",
  });

  const { t } = useTranslation();

  const filterRef = useRef();
  detectOutsideClick(filterRef, () => setShowLocalDate(false));

  const handleChange = (event) => {
    const search = event.target.value;
    if (search.length > 2 || search.length === 0) {
      onSearch(search);
    }
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
    if (formValues.startDate === "") {
      return toast.error("Data de início é obrigatória!");
    }
    onLocalDateChange(formValues);
    setShowLocalDate(false);
  };

  const theme = useTheme();

  const extraSmallToSmall = useMediaQuery(
    theme.breakpoints.between("xs", "sm")
  );
  const smallToMid = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const MidToLarge = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const LargeToExtraLarge = useMediaQuery(
    theme.breakpoints.between("lg", "xl")
  );

  const filtersGap = extraSmallToSmall
    ? "1rem"
    : smallToMid
    ? "1rem"
    : MidToLarge
    ? "1rem"
    : LargeToExtraLarge
    ? ".5rem"
    : ".5rem";

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
            placeholder={t("homepage.searchPosts")}
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
      <Grid
        container
        xs={12}
        mt="1rem"
        sx={{
          paddingLeft: "2rem",
          marginBottom: "2rem",
        }}
        gap={filtersGap}
      >
        {/* <Grid md={1.25} lg={1.125} xl={0.75}>
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
            {t("homepage.highlights")}
          </Button>
        </Grid> */}
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
            <Typography fontSize="0.875rem">{t("homepage.filter")}</Typography>
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
            <Box ref={filterRef}>
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
                        label={t("homepage.filterCard.startDate")}
                        value={formValues?.startDate}
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
                        label={t("homepage.filterCard.endDate")}
                        value={formValues?.endDate}
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
                      <TextField
                        id="address-select"
                        name="address"
                        variant="outlined"
                        size="small"
                        placeholder={t("homepage.filterCard.location")}
                        fullWidth
                        onChange={(e) =>
                          handleDateLocalChange("address", e.target.value)
                        }
                        value={formValues?.address}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOnIcon />
                            </InputAdornment>
                          ),
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
                      onClick={() => setShowLocalDate(false)}
                    >
                      {t("homepage.filterCard.cancel")}
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ textTransform: "capitalize" }}
                      onClick={onSubmitLocalDateForm}
                    >
                      {t("homepage.filterCard.apply")}
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
