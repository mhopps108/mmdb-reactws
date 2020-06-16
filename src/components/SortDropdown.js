import React, { useRef, createRef, useState } from "react";
import styled from "styled-components/macro";
import { device } from "../devices";
import { Dropdown, Popover, Whisper, Button, IconButton, Icon } from "rsuite";

// TODO: break apart (used twice in this file)
const MenuWrap = styled.div`
  .rs-dropdown-menu > .rs-dropdown-item-active > .rs-dropdown-item-content,
  .rs-dropdown-menu
    > .rs-dropdown-item-active
    > .rs-dropdown-item-content:hover,
  .rs-dropdown-menu
    > .rs-dropdown-item-active
    > .rs-dropdown-item-content:focus {
    color: #1f4b99;
    background: whitesmoke;
  }

  & .rs-btn-link {
    color: #444;
    font-size: 1rem;
    text-decoration: none;
    line-height: 1rem;
  }

  .rs-dropdown-menu > .rs-dropdown-item > .rs-dropdown-item-content:hover {
    background-color: #1f4b99;
    color: whitesmoke;
  }
`;

const MenuPopover = ({ onSelect, sortValue, sortData, ...rest }) => (
  <Popover {...rest} full>
    <MenuWrap>
      <p style={{ width: "100%", textAlign: "center" }}>sort by</p>
      <Dropdown.Menu
        onSelect={onSelect}
        // style={{ width: "90px" }}
      >
        {sortData.map(({ value, label }) => (
          <Dropdown.Item
            eventKey={value}
            active={value === sortValue}
            style={{}}
            // icon={value === sortValue ? <Icon icon="long-arrow-down" /> : ""}
          >
            {label}
            {/*{label} {value === sortValue ? <Icon icon="long-arrow-down" /> : ""}*/}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </MenuWrap>
  </Popover>
);

const SortDropDown = ({ sortData, sortValue, onOrderChange }) => {
  // const triggerRef = createRef();
  const triggerRef = useRef(null);
  const [selected, setSelected] = useState(getSortLabel(sortValue) || "");

  function getSortLabel(eventKey) {
    const found = sortData.find((item) => item.value === eventKey);
    return found.label;
  }

  function handleSelectMenu(eventKey, event) {
    console.log("SortDropdown: eventKey:", eventKey);
    console.log("SortDropdown: event", event);
    onOrderChange(eventKey);
    setSelected(getSortLabel(eventKey));
    triggerRef.current.hide();
  }
  return (
    <MenuWrap>
      <Whisper
        preventOverflow
        placement="auto"
        trigger="click"
        // trigger={["click", "hover"]}
        triggerRef={triggerRef}
        speaker={
          <MenuPopover
            onSelect={handleSelectMenu}
            sortValue={sortValue}
            sortData={sortData}
          />
        }
      >
        <IconButton
          icon={<Icon icon="sort-amount-desc" />}
          size={"sm"}
          placement="right"
          appearance="link"
        >
          {/*{selected}*/}
        </IconButton>
      </Whisper>
    </MenuWrap>
  );
};

export default SortDropDown;
