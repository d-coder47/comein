import urbanArtSVG from "../assets/svg/arte_urbana.svg";
import visualArtsSVG from "../assets/svg/artes_plastica.svg";
import craftsmanshipSVG from "../assets/svg/artesanato.svg";
import carnavalSVG from "../assets/svg/carnaval.svg";
import movieTheaterSVG from "../assets/svg/cinema.svg";
import danceSVG from "../assets/svg/danca.svg";
import designSVG from "../assets/svg/design.svg";
import sculptureSVG from "../assets/svg/escultura.svg";
import photographySVG from "../assets/svg/fotografia.svg";
import traditionalPartiesSVG from "../assets/svg/festas_tradicionais.svg";
import gastronomySVG from "../assets/svg/gastronomia.svg";
import literatureSVG from "../assets/svg/literatura.svg";
import fashionSVG from "../assets/svg/moda.svg";
import musicSVG from "../assets/svg/musica.svg";
import standUpSVG from "../assets/svg/stand_up.svg";
import theaterSVG from "../assets/svg/teatro.svg";

const categories = [
  { id: 1, icon: musicSVG },
  { id: 2, icon: theaterSVG },
  { id: 3, icon: danceSVG },
  { id: 4, icon: movieTheaterSVG },
  { id: 5, icon: standUpSVG },
  { id: 6, icon: visualArtsSVG },
  { id: 7, icon: sculptureSVG },
  { id: 8, icon: craftsmanshipSVG },
  { id: 9, icon: designSVG },
  { id: 10, icon: photographySVG },
  { id: 11, icon: urbanArtSVG },
  { id: 12, icon: literatureSVG },
  { id: 13, icon: gastronomySVG },
  { id: 14, icon: fashionSVG },
  {
    id: 15,
    icon: traditionalPartiesSVG,
  },
  { id: 16, icon: carnavalSVG },
];

export const getItemIconByCategory = (culturalArea) => {
  const category = categories.filter((item) => item.id === +culturalArea);

  if (category.length > 0) {
    return category[0].icon;
  }

  return musicSVG;
};
