import { FileTextOutlined } from "@ant-design/icons";
import { useState } from "react";

export const NoteCard = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseDown = () => {
    setIsClicked(true);
  };
  const handleMouseUp = () => {
    setIsClicked(false);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <>
      <div style={{ width: 80, height: 80 }}>
        <div
          className="flex-column text-center"
          style={{
            background: isHovered
              ? isClicked
                ? "#d9d9d9"
                : "#f0f0f0"
              : "white",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <FileTextOutlined
            style={{
              fontSize: 50,
              marginTop: 10,
              marginBottom: 5,
            }}
          />

          <div className="text-center pb-2">21st sept</div>
        </div>
      </div>
    </>
  );
};
