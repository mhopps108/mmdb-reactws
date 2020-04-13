import React from "react";
import styled from "styled-components/macro";

const StyledToolbar = styled.div`
  grid-area: toolbar;
  background-color: white;
  position: sticky;
  top: 55px;
  display: flex;
  flex-direction: column;
`;

export default function Toolbar({ listData, dateData = null }) {
  const { name, source, movie_count } = listData;
  // const { prevWeek, nextWeek, thisWeek, dateString } = dateData;
  // console.log("dateString", dateString);
  return (
    <StyledToolbar>
      <div>
        {name} - #{movie_count}
      </div>
      {dateData && (
        <div>
          <button onClick={dateData.prevWeek}>{"<"}</button>
          <button onClick={dateData.thisWeek}>{dateData.dateString}</button>
          <button onClick={dateData.nextWeek}>{">"}</button>
        </div>
      )}
    </StyledToolbar>
  );
}

// <div className="row sticky-top">
//   <div
//       className="col-12 d-flex justify-content-between align-items-center py-1 px-2 mb-2"
//       style={{
//         fontSize: "1.25rem",
//         fontWeight: 600,
//         backgroundColor: "#efefef",
//         color: "#14181c",
//         boxShadow:
//             "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
//       }}
//   >
//     <div>Release Dates</div>
//     <div>
//       <div className="btn" style={{ border: "none" }} onClick={prevWeek}>
//         {"<"}
//       </div>
//       <div
//           className="btn"
//           style={{ border: "none", fontSize: "1.1rem", fontWeight: 500 }}
//           onClick={() => pushWeek(startOfWeek())}
//       >
//         {twixDateString(startOfWeek(startDate), endOfWeek(startDate))}
//       </div>
//       <div className="btn" style={{ border: "none" }} onClick={nextWeek}>
//         {">"}
//       </div>
//     </div>
//     <div>#{count}</div>
//   </div>
// </div>
