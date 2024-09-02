import { FaRegBookmark } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoClose, IoHeartOutline } from "react-icons/io5";
import ReactPlayer from "react-player";
import { Image } from "../service/image.service";

interface TileDetailProps {
  selectedTile: Image;
  isTileOpen: boolean;
  setIsTileOpen: (isOpen: boolean) => void;
}

const TileDetail: React.FC<TileDetailProps> = ({
  selectedTile,
  isTileOpen,
  setIsTileOpen,
}) => {
  console.log(selectedTile);
  return (
    <>
      <div
        className="absolute right-3 top-3 text-2xl text-gray-100 cursor-pointer transition-150"
        onClick={() => {
          setIsTileOpen(false);
        }}
      >
        <IoClose />
      </div>
      <div className="tile-modal fixed w-[100%] h-[94%] left-0 bottom-[0px] bg-white rounded-t-lg p-3 overflow-scroll">
        {/* Detail Header */}
        <div className="px-[120px] py-[64px] flex flex-col">
          <h1 className="text-3xl font-bold pb-5 mx-[54px]">
            {selectedTile.alt_description}
          </h1>
          <div className="mx-[54px] flex w-full justify-between">
            <div className="flex items-center gap-5">
              <img
                src={selectedTile.user.profile_image.medium}
                width={60}
                height={60}
                className="rounded-[40px]"
              />
              <div className="flex flex-col">
                <span className="font-semibold">
                  {selectedTile.user.first_name +
                    " " +
                    selectedTile.user.last_name}
                </span>
                <span className="flex items-center text-green-600">
                  <GoDotFill /> Available for work
                </span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span
                style={{ border: "2px solid #a0aec0" }}
                className="rounded-3xl"
              >
                <button
                  className={`p-2 bg-white rounded-2xl text-md transition duration-300`}
                >
                  <IoHeartOutline />
                </button>
              </span>
              <span
                style={{ border: "2px solid #a0aec0" }}
                className="rounded-3xl"
              >
                <button className={`p-2 rounded-3xl transition duration-300`}>
                  <FaRegBookmark />
                </button>
              </span>

              <span>
                <button className="btn bg-black text-white py-3 px-5 rounded-3xl">
                  Get in touch
                </button>
              </span>
            </div>
          </div>
        </div>
        {/* Video Player */}
        <div className="flex justify-center">
          <ReactPlayer
            url={"https://www.youtube.com/watch?v=C3UXj2k7jHE"}
            controls
            height={500}
            width={850}
          />
        </div>
      </div>
    </>
  );
};

export default TileDetail;
