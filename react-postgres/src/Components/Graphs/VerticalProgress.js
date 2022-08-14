import React, {useState, useEffect, useRef} from 'react';
export default function VerticalProgress({bgcolor, progress, width, label, numLabel}){
  const Parentdiv = {
    height:'85%',
    width: width,
    backgroundColor: 'white',
    border: "1px solid black",
    display: "flex",
    alignItems: "flex-end",
    marginRight: "20px"
  }
  const Childdiv = {
    height:`${progress}%`,
    width: '95%',
    backgroundColor: bgcolor,
    border: "1px solid black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }
  const progresstext = {
    padding: 0,
    color: 'white',
    fontSize: ".7vw",
    width: "100%",
    textAlign: "center",

  }
  return(
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{label}</span>
        <span style={progresstext}>{`${numLabel}`}</span>
      </div>
    </div>
  );
};
