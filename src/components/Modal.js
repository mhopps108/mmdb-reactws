import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { Portal } from "../components";
import { device } from "../devices";
import { RiCloseLine } from "react-icons/ri";

export default function Modal({
  title,
  isOpen,
  onClose,
  renderBottom,
  children,
}) {
  return (
    <Portal>
      <ModalBackdrop isOpen={isOpen}>
        <ModalWrap isOpen={isOpen}>
          <TopBar>
            <h4>{title}</h4>
            <button onClick={onClose}>
              <RiCloseLine />
            </button>
          </TopBar>
          <Body>{children}</Body>
          <BottomBar>{renderBottom}</BottomBar>
        </ModalWrap>
      </ModalBackdrop>
    </Portal>
  );
}

const ModalBackdrop = styled.div`
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  //height: 100vh;
  max-width: 600px;
  //max-height: calc(100vh - 100px);
  //overflow-y: scroll;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${(props) =>
    props.isOpen ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.0)"};

  opacity: ${(props) => (props.isOpen ? "1" : "0")};

  transition: background 300ms cubic-bezier(0, 1, 0.5, 1),
    opacity 300ms cubic-bezier(0, 1, 0.5, 1),
    visibility 300ms cubic-bezier(0, 1, 0.5, 1);

  @media ${device.min.tablet} {
    display: none;
  }
`;

const ModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  //height: 100%;
  width: 100%;
  margin: 5px;
  background: white;
  border-radius: 6px;
  overflow-y: hidden;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid lightgray;

  h4 {
    font-size: 1.3rem;
  }
  button {
    font-size: 1.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background: none;
    //border: 1px solid lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Body = styled.div`
  overflow: scroll;
`;

const BottomBar = styled.div``;
