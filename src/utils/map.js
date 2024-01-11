import urbanArtSVG from "../assets/svg/mapa/arte_urbana.svg";
import visualArtsSVG from "../assets/svg/mapa/artes_plastica.svg";
import craftsmanshipSVG from "../assets/svg/mapa/artesanato.svg";
import carnavalSVG from "../assets/svg/mapa/carnaval.svg";
import movieTheaterSVG from "../assets/svg/mapa/cinema.svg";
import danceSVG from "../assets/svg/mapa/danca.svg";
import designSVG from "../assets/svg/mapa/design.svg";
import sculptureSVG from "../assets/svg/mapa/escultura.svg";
import photographySVG from "../assets/svg/mapa/fotografia.svg";
import traditionalPartiesSVG from "../assets/svg/mapa/festas_tradicionais.svg";
import gastronomySVG from "../assets/svg/mapa/gastronomia.svg";
import literatureSVG from "../assets/svg/mapa/literatura.svg";
import fashionSVG from "../assets/svg/mapa/moda.svg";
import musicSVG from "../assets/svg/mapa/musica.svg";
import standUpSVG from "../assets/svg/mapa/stand_up.svg";
import theaterSVG from "../assets/svg/mapa/teatro.svg";

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
