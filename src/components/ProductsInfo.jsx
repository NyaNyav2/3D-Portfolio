import React from "react";
import { close  } from "../assets/images";
const InfoBox = ({ tile, text, link, onClose }) => (
  <div className="w-full flex flex-col gap-3  ">
    <div className="mt-5 flex flex-wrap relative  ">
      <h2 className="text-black text-xl font-mono font-semibold">{tile}</h2>
      <img src={close} alt="" onClick={onClose} className=" absolute top-0 right-0 w-[28px] h-[28px] object-contain"  />
    </div>
    <div className="flex gap-10 relative">
      <p className="">{text}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className=" absolute top-0 right-0 font-mono text-blue-400 cursor-pointer hover:text-black"
      >
        View Project Here !
      </a>
    </div>
  </div>
);

const renderContent = (onClose) => ({
  0: (
    <InfoBox
      tile="MineCraf Clone"
      text="Using React, ThreeJS and some chat gpt to make clone minecraf game"
      link="https://github.com/NyaNyav2/MinecrafClone"
      onClose={onClose}
    />
  ),
  1: (
    <InfoBox
      tile="3D profolio"
      text="Using React, ThreeJS and TailwindCSS to make a 3D profolio"
      link="https://www.youtube.com/watch?v=FkowOdMjvYo&t=9088s"
      onClose={onClose}
    />
  ),
  2: (
    <InfoBox
      tile="E-commerce Game selling website"
      text="A group project where I played the role of a frontend team member. I used HTML,CSS and Js to code."
      link="https://github.com/NyaNyav2/WeebGameStore"
      onClose={onClose}
    />
  ),
  3: (
    <InfoBox
      tile="3D Earth"
      text="Using Html, Css, JavaScript and ThreeJS to make a 3D Earth "
      link="https://github.com/NyaNyav2/3DEarth"
      onClose={onClose}
    />
  ),
  4: (
    <InfoBox
      tile="MineSweeper Game"
      text="Using Html, Css, JavaScript  to make a MineSweeper Game "
      link="https://github.com/NyaNyav2/minesweepr.github.io"
      onClose={onClose}
    />
  ),
  5: (
    <InfoBox
      tile="Tesla clone"
      text="Using React and TailwindCSS to make a Tesla clone web "
      link="https://github.com/NyaNyav2/TeslaClone"
      onClose={onClose}
    />
  ),
  6: (
    <InfoBox
      tile="Pokemon Dex"
      text="Using React,TailwindCss, Node JS, ExpressJS and MongoDB to make a FULLSTACK PokemonDex "
      link="https://github.com/NyaNyav2/PokemonDex"
      onClose={onClose}
    />
  ),
});

function ProductsInfo({ clicked, onClose }) {
  return renderContent(onClose)[clicked] || null;
}

export default ProductsInfo;
