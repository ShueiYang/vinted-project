import { Range, getTrackBackground } from "react-range";
import { useState } from "react";

const STEP = 1;
const MIN = 0;
const MAX = 500;

const LabeledTwoThumbs = ({ rtl, setPriceRange }) => {
  const [values, setValues] = useState([10, 100]);

  // trigger UseEffect only when we unhold the dragging on the mouse
  function handleMouseUp () {
    setPriceRange(prevState => {
      return {
        ...prevState,
        priceMin: values[0],
        priceMax: values[1]
      }
    })
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        width: "45%",
        maxWidth: "450px",
        marginLeft: "2rem"
      }}
    >
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        rtl={rtl}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            onMouseUp={handleMouseUp}   // MouseEvent
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%"
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "#017b86", "#ccc"],
                  min: MIN,
                  max: MAX,
                  rtl
                }),
                alignSelf: "center"
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
              height: "17px",
              width: "17px",
              borderRadius: "100%",
              backgroundColor: isDragged ? "#14b8a6" : "#017b86",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA"
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-22px",
                color: "#fff",
                fontSize: "12px",
                fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
                padding: "1px 4px 1px 4px",
                borderRadius: "4px",
                backgroundColor: "#017b86"
              }}
            >
              {values[index].toFixed(0)} €
            </div>
            <div
              style={{
                height: "16px",
                width: "5px",      
                backgroundColor: isDragged ? "#14b8a6" : "#017b86"
              }}
            />
          </div>
        )}
      />
    </div>
  );
};

export default LabeledTwoThumbs;