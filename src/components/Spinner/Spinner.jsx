import React from 'react'
import { useSelector } from 'react-redux';
import HashLoader from "react-spinners/HashLoader";

export default function Spinner() {
  let { isLoading } = useSelector(state => state.spinnerSlice);
  
  return isLoading ? (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 3000,
      }}
    >
      <HashLoader size={150} color="#1d7a85" />
    </div>
  ) : (
    <></>
  )
}
