import React from "react";
import { Status } from "../../constant";
import { useAppContext } from "../../contexts/Context";
import { closePopup } from "../../reducer/actions/popup";
import "./Popup.css";

export default function Popup({ children }) {
  const { appState, dispatch } = useAppContext();
  if (appState.status === Status.ongoing) return null;

  const onClosePopup = () => {
    dispatch(closePopup());
  };

  return (
    <div className="popup">
      {React.Children.toArray(children).map((child) =>
        React.cloneElement(child, { onClosePopup })
      )}
    </div>
  );
}
