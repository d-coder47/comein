import NavBar from "../../components/NavBar";
import Categories from "../../components/Categories";
import Cards from "../../components/Cards";
import SearchBar from "../../components/SearchBar";
import { useState } from "react";

export default function Home() {
  const [category, setCategory] = useState("");

  const onCategoryChange = (category) => {
    setCategory(category);
  };

  return (
    <>
      <NavBar />
      <Categories onCategoryChange={onCategoryChange} />
      <SearchBar />
      <Cards category={category} />
    </>
  );
}
