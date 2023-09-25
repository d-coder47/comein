import NavBar from "../../components/NavBar";
import Categories from "../../components/Categories";
import Cards from "../../components/Cards";
import SearchBar from "../../components/SearchBar";
import { useState } from "react";
import MapButton from "../../components/Map/MapButton";
import Highlights from "../../components/highlights";
import { LinearProgress } from "@mui/material";

export default function Home() {
  const [category, setCategory] = useState("");
  const [displayHighlights, setDisplayHighlights] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [localDateValues, setLocalDateValues] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

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

  return (
    <>
      <div>{isLoading && <LinearProgress />}</div>
      <NavBar />
      <Categories onCategoryChange={onCategoryChange} />
      <SearchBar
        onSearch={onSearch}
        onLocalDateChange={handleLocalDateChange}
        onHighlightsClick={handleHighlightsClick}
      />
      {/* <Highlights /> */}

      <Cards
        searchQuery={searchTerm}
        culturalAreaId={category}
        localDateValues={localDateValues}
        displayHighlights={displayHighlights}
        setIsLoading={setIsLoading}
      />
      <MapButton />
    </>
  );
}
