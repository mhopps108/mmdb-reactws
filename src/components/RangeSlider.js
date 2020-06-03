import React from "react";
import { Range, getTrackBackground } from "react-range";

export default function RangeSlider({
  value,
  min,
  max,
  step,
  onChange,
  onFinalChange,
}) {
  return (
    <Range
      min={min}
      max={max}
      step={step}
      values={value}
      onChange={onChange}
      onFinalChange={onFinalChange}
      renderTrack={({ props, children }) => (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          style={{
            ...props.style,
            height: "36px",
            display: "flex",
            width: "100%",
          }}
        >
          <div
            ref={props.ref}
            style={{
              height: "5px",
              width: "100%",
              borderRadius: "4px",
              background: getTrackBackground({
                values: value,
                colors: ["#ccc", "#2162a4", "#ccc"],
                min: min,
                max: max,
              }),
              alignSelf: "center",
            }}
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ index, props, isDragged }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "30px",
            width: "30px",
            borderRadius: "4px",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 2px 6px #aaa",
          }}
        >
          {/* VALUE LABELS */}
          {/*<div*/}
          {/*  style={{*/}
          {/*    position: "absolute",*/}
          {/*    // top: "-28px",*/}
          {/*    top: "-22px",*/}
          {/*    color: "#fff",*/}
          {/*    fontWeight: "bold",*/}
          {/*    fontSize: "12px",*/}
          {/*    fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",*/}
          {/*    padding: "2px",*/}
          {/*    borderRadius: "4px",*/}
          {/*    backgroundColor: "#548BF4",*/}
          {/*  }}*/}
          {/*>*/}
          {/*  {value[index].toFixed(1)}*/}
          {/*</div>*/}
          <div
            style={{
              height: "16px",
              width: "5px",
              backgroundColor: isDragged ? "#2162a4" : "#ccc",
            }}
          />
        </div>
      )}
    />
  );
}
