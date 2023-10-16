import { useEffect, useRef, useState } from "react";
import NavBar from "../../components/NavBar";
import Categories from "../../components/Categories";
import Cards from "../../components/Cards";
import SearchBar from "../../components/SearchBar";
import MapButton from "../../components/Map/MapButton";
import { Box, LinearProgress } from "@mui/material";
import AddLocationModal from "../../components/AddLocationModal";

export default function Home() {
  const [category, setCategory] = useState("");
  const [displayHighlights, setDisplayHighlights] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [localDateValues, setLocalDateValues] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated");
    const isFirstLogin = JSON.parse(localStorage.getItem("userInfo"));

    if (isAuthenticated) {
      // if (isFirstLogin?.vx_login == 0) {
      if (isFirstLogin?.vx_login == 1) {
        setShowLocationModal(true);
      }
    }
  });

  const layoutRef = useRef(null);

  const onCategoryChange = (category) => {
    setCategory(category);
    setSearchTerm(null);
    setLocalDateValues(null);
    setDisplayHighlights(false);
  };

  const handleHighlightsClick = (shouldDisplayHighlights) => {
    setCategory("");
    setSearchTerm(null);
    setLocalDateValues(null);
    setDisplayHighlights(shouldDisplayHighlights);
  };

  const onSearch = (search) => {
    setCategory("");
    setSearchTerm(search);
    setLocalDateValues(null);
    setDisplayHighlights(false);
  };

  const handleLocalDateChange = (values) => {
    const filteredValues = `${values.startDate},${
      values.endDate !== "" ? values.endDate : ""
    },${values.address}`.replace(" ", "");

    setCategory("");
    setSearchTerm(null);
    setLocalDateValues(filteredValues);
    setDisplayHighlights(false);
  };

  useEffect(() => {
    if (!layoutRef.current) return;
    layoutRef?.current?.scrollTo(0, 1225);
  }, [layoutRef]);

  return (
    <Box ref={layoutRef}>
      <div>{isLoading && <LinearProgress />}</div>
      <NavBar />
      <Categories onCategoryChange={onCategoryChange} />
      <SearchBar
        onSearch={onSearch}
        onLocalDateChange={handleLocalDateChange}
        onHighlightsClick={handleHighlightsClick}
      />

      <Cards
        searchQuery={searchTerm}
        culturalAreaId={category}
        localDateValues={localDateValues}
        displayHighlights={displayHighlights}
        setIsLoading={setIsLoading}
      />
      <MapButton />
      {showLocationModal ? (
        <AddLocationModal
          show={true}
          handleClose={() => setShowLocationModal(false)}
        />
      ) : null}
    </Box>
  );
}
