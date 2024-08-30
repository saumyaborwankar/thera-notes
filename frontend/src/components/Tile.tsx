import { useState } from "react";
import { BsFillEyeFill, BsFillHeartFill } from "react-icons/bs";
import { FaPlay, FaRegBookmark } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";
import { Image } from "../service/image.service";

interface TileProps {
  image: Image;
  setSelectedTile: (tile: Image) => void;
  isTileOpen: boolean;
  setIsTileOpen: (isOpen: boolean) => void;
}

const Tile: React.FC<TileProps> = ({
  image,
  setSelectedTile,
  isTileOpen,
  setIsTileOpen,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  // console.log(image.id);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handlePlayButton = () => {
    setIsTileOpen(!isTileOpen);
    setSelectedTile(image);
  };

  return (
    <>
      <div
        key={image.id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative tile w-[316px] h-[270px] rounded-xl flex flex-col justify-around"
      >
        <div
          onClick={handlePlayButton}
          className="absolute left-[43%] top-[36%]"
        >
          <FaPlay
            className={`text-white text-5xl transition duration-300 ${
              isHovered ? "" : "opacity-0"
            }`}
          />
        </div>
        <div className="absolute flex justify-between px-4 py-4 w-full bottom-10">
          <button
            className={`p-2 bg-white rounded-3xl transition duration-300 ${
              isHovered ? "" : "opacity-0"
            }`}
          >
            <FaRegBookmark />
          </button>
          <button
            className={`p-2 bg-white rounded-2xl text-lg transition duration-300 ${
              isHovered ? "" : "opacity-0"
            }`}
          >
            <IoHeartOutline />
          </button>
        </div>
        <img
          className="w-[320px] h-[230px] rounded-xl object-cover hover: bg-gradient-to-t from-[rgba(0,0,0,1)] to-[rgba(0,0,0,0)]"
          src={image.urls.regular}
        />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <img
              className="rounded-3xl"
              width={20}
              height={20}
              src={image.user.profile_image.small}
            />
            <p className="text-sm">
              {image.user.first_name + " " + image.user.last_name}
            </p>
          </div>
          <div className="flex items-center gap-3 text-gray-500">
            <span className="flex items-center gap-1 text-sm">
              <BsFillHeartFill />
              {image.likes}
            </span>
            <span className="flex items-center gap-1 text-sm">
              <BsFillEyeFill />
              41.7k
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tile;
