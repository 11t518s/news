import React, { forwardRef } from "react";
import styled from "styled-components";

interface Props {}

const Header = forwardRef<HTMLDivElement, Props>(({}, ref) => {
  return <Container ref={ref}>필터 필터 필터</Container>;
});

export default Header;

const Container = styled.div`
  position: fixed;
`;
