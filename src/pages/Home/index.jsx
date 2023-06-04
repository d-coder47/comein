import NavBar from "../../components/NavBar";
import Categories from "../../components/Categories";
import Cards from "../../components/Cards";
import SearchBar from "../../components/SearchBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <Categories />
      <SearchBar />
      <Cards />
    </>
  );
}
