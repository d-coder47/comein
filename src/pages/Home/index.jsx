import NavBar from "../../components/NavBar";
import Categories from "../../components/Categories";
import Cards from "../../components/Cards";
import SearchBar from "../../components/SearchBar";
import { useState } from "react";

export default function Home() {
  const [category, setCategory] = useState("");
  const [displayHighlights, setDisplayHighlights] = useState(false);

  const onCategoryChange = (category) => {
    setCategory(category);
  };

  const handleHighlightsClick = (shouldDisplayHighlights) => {
    setCategory("");
    setDisplayHighlights(shouldDisplayHighlights);
  };

  return (
    <>
      <NavBar />
      <Categories onCategoryChange={onCategoryChange} />
      <SearchBar onHighlightsClick={handleHighlightsClick} />
      <Cards culturalAreaId={category} displayHighlights={displayHighlights} />
    </>
  );
}
