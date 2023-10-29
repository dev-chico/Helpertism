import bg1 from "../../../assets/imgs/cards/bg-1.png";
import bg2 from "../../../assets/imgs/cards/bg-2.png";
import bg3 from "../../../assets/imgs/cards/bg-3.png";
import bg4 from "../../../assets/imgs/cards/bg-4.png";
import bg5 from "../../../assets/imgs/cards/bg-5.png";
import { ICard } from "../../../components/Card";

export const lastPlayedGamesMock: ICard[] = [
  {
    uid: "1",
    title: "Animais",
    date: "14/09/2023",
    description:
      "lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor",
    img: bg1,
    text: "aaa",
    userId: "testete",
  },
  {
    uid: "2",
    title: "Brinquedos",
    date: "27/08/2023",
    description:
      "lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor",
    img: bg2,
    text: "aaa",
    userId: "testete",
  },
];

export const gamesMock: ICard[] = [
  {
    uid: "1",
    title: "Carros",
    date: "14/09/2023",
    description:
      "lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor",
    img: bg5,
  },
  {
    uid: "2",
    title: "Roupas",
    date: "27/08/2023",
    description:
      "lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor",
    img: bg4,
  },
  {
    uid: "3",
    title: "Números",
    date: "27/08/2023",
    description:
      "lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor",
    img: bg3,
  },
  {
    uid: "4",
    title: "Brinquedos",
    date: "27/08/2023",
    description:
      "lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor",
    img: bg2,
  },
  {
    uid: "5",
    title: "Animais",
    date: "27/08/2023",
    description:
      "lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor",
    img: bg1,
  },
];
