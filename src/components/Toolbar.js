import React from "react";
import styled from "styled-components/macro";
import { device } from "../devices";
import { Link } from "react-router-dom";

const StyledToolbar = styled.div`
  grid-area: toolbar;
  background-color: white;
  color: #333;
  position: sticky;
  top: 55px;
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
  box-shadow: 0px 5px 25px 6px rgba(0, 0, 0, 0.3);

  @media ${device.min.tablet} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const ToolbarItem = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100%;
  justify-content: space-between;
  p,
  button {
    font-size: 1.2rem;
  }
`;

const ToolbarButton = styled.button`
  border: none;
  background: none;
  color: #333;
  & a {
    color: #333;
    text-decoration: none;
  }
`;

export default function Toolbar({ listData, dateData = null }) {
  const { name, source, movie_count } = listData;
  // const { prevWeek, nextWeek, thisWeek, dateString } = dateData;
  // console.log("dateString", dateString);
  return (
    <StyledToolbar>
      <ToolbarItem>
        <p>{name}</p>
        <p>#{movie_count}</p>
      </ToolbarItem>
      {dateData && (
        <ToolbarItem>
          <ToolbarButton onClick={dateData.prevWeek}>{"<"}</ToolbarButton>
          <ToolbarButton onClick={dateData.thisWeek}>
            <Link to="/release-dates">{dateData.dateString}</Link>
          </ToolbarButton>
          <ToolbarButton onClick={dateData.nextWeek}>{">"}</ToolbarButton>
        </ToolbarItem>
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
