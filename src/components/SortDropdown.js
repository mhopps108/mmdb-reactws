import React, { useRef, createRef } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import styled from "styled-components/macro";
import { device } from "../devices";
import { DatePager } from "../components";
import {
  SelectPicker,
  Dropdown,
  Popover,
  Whisper,
  Button,
  IconButton,
  Icon,
} from "rsuite";

const MenuPopover = ({ onSelect, ...rest }) => (
  <Popover {...rest} full preventOverflow>
    {/*<Popover full>*/}
    <Dropdown.Menu onSelect={onSelect}>
      <Dropdown.Menu title="New File">
        <Dropdown.Item eventKey={1}>New File</Dropdown.Item>
        <Dropdown.Item eventKey={2}>
          New File with Current Profile
        </Dropdown.Item>
      </Dropdown.Menu>
      <Dropdown.Item eventKey={3}>Download As...</Dropdown.Item>
      <Dropdown.Item eventKey={4}>Export PDF</Dropdown.Item>
      <Dropdown.Item eventKey={5}>Export HTML</Dropdown.Item>
      <Dropdown.Item eventKey={6}>Settings</Dropdown.Item>
      <Dropdown.Item eventKey={7}>About</Dropdown.Item>
    </Dropdown.Menu>
  </Popover>
);

const SortDropDown = () => {
  const triggerRef = createRef();
  // const triggerRef = useRef(null);

  function handleSelectMenu(eventKey, event) {
    console.log("SortDropdown: eventKey:", eventKey);
    console.log("SortDropdown: event", event);
    triggerRef.current.hide();
  }
  return (
    <Whisper
      placement="auto"
      trigger="click"
      triggerRef={triggerRef}
      ref={triggerRef}
      speaker={<MenuPopover onSelect={handleSelectMenu} />}
    >
      {/*<Button>File</Button>*/}
      <IconButton icon={<Icon icon="sort-amount-desc" />} appearance="link" />
    </Whisper>
  );
};

export default SortDropDown;
