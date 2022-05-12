import React from "react";
import AlertDialogSlide from "../alerts/AlertDialogSlide";

const StartGameComponent = ({ startGame }) => {
  return (
    <div className="buttons-div">
      <button className="start-button" onClick={startGame}>
        PLAY NOW
      </button>
      <AlertDialogSlide />
    </div>
  );
};

export default StartGameComponent;
