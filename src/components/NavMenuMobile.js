import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { device } from "../devices";
// import { Portal } from "../components";
// import { FiMenu } from "react-icons/fi";
// import { GrClose } from "react-icons/gr";
import {
  tmdbLinks,
  discoveryLinks,
  releaseDateLinksByPeriod,
  releaseDateLinks,
} from "../constants/routes";
import { GrClose } from "react-icons/gr";
import { FiMenu } from "react-icons/fi";

export default function NavMenuMobile({ isOpen, toggleNav }) {
  return (
    <>
      <NavMenuWrap isOpen={isOpen}>
        <NavBrand style={{ marginLeft: "12px" }}>
          <Link to="/">MMDb</Link>
        </NavBrand>

        <SectionHeader>Lists</SectionHeader>
        <Section>
          {tmdbLinks.map(({ name, path, sort }, index) => {
            return (
              <div onClick={toggleNav} key={index}>
                <Link to={path}>{name}</Link>
              </div>
            );
          })}
        </Section>

        <SectionHeader>Release Dates</SectionHeader>
        <Section>
          <FlexContainer column>
            <h6>By Week</h6>
            {releaseDateLinksByPeriod.week.map(({ name, path }, index) => {
              return (
                <div onClick={toggleNav} key={index}>
                  <Link to={path}>{name}</Link>
                </div>
              );
            })}
          </FlexContainer>
          <FlexContainer column>
            <h6>By Month</h6>
            {releaseDateLinksByPeriod.month.map(({ name, path }, index) => {
              return (
                <div onClick={toggleNav} key={index}>
                  <Link to={path}>{name}</Link>
                </div>
              );
            })}
          </FlexContainer>
        </Section>

        <NavSection>
          <p>{"Discover"}</p>
          {discoveryLinks.map(({ name, path }, index) => {
            return (
              <div onClick={toggleNav} key={index}>
                <Link to={path}>{name}</Link>
              </div>
            );
          })}
        </NavSection>
      </NavMenuWrap>
      {/*<MenuButton onClick={toggleNav}>*/}
      {/*  {isOpen ? <GrClose /> : <FiMenu />}*/}
      {/*</MenuButton>*/}
    </>
  );
}

const SectionHeader = styled.h2`
  color: var(--color-grey);
  opacity: 0.5;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  h6 {
    color: var(--color-grey);
    padding: 0.25rem 0.5rem;
  }
  div {
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    //width: 50%;
    a {
      color: whitesmoke;
      font-size: 1.2rem;
    }
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${(p) => (p.column ? "column" : "row")};
  //max-width: ${(p) => (p.maxWidth ? p.width : "100%")};
`;

const NavMenuWrap = styled.div`
  display: flex;
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  flex-direction: column;
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  //bottom: 0;
  //left: 0;
  border: 2px solid lightgray;
  border-radius: 6px;
  background: var(--color-charcoal);
  transition: all 100ms ease-in-out;
  z-index: 1010;

  @media ${device.min.tablet} {
    display: none;
    //visibility: hidden;
    //opacity: 0;
  }
`;

const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  div {
    margin: 4px 0;
  }
  p {
    color: var(--color-grey);
    opacity: 0.5;
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  a {
    color: whitesmoke;
    font-size: 1.2rem;
  }
`;

const NavBrand = styled.h1`
  font-size: 1.4rem;
  //line-height: 1.5rem;
  a {
    color: #fff;
    text-decoration: none;
  }
`;

const MenuButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 1.5rem;
  font-size: 1.4rem;
  padding: 6px 12px;
  background: whitesmoke;
  border: 1px solid lightgray;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  z-index: 1011;

  :hover {
    box-shadow: 0 1px 6px rgba(255, 255, 255, 0.3);
  }

  @media ${device.min.tablet} {
    display: none;
    //visibility: hidden;
  }
`;
