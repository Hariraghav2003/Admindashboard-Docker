import React from "react";
import { PiWarningCircleFill } from "react-icons/pi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Accessdenied() {
  toast.error("AccessDenied!!");
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "250px",
        marginLeft: "100px",
      }}
    >
      <h3>
        Access Denied
        <span style={{ color: "red" }}>
          <PiWarningCircleFill />
        </span>
      </h3>
    </div>
  );
}

export default Accessdenied;
